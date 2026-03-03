import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { checkRateLimit } from '@/utils/rateLimit';
import { z } from 'zod';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const orderSchema = z.object({
    sc_amount: z.number().int().positive().max(100000), // Max topup 100k
});

// SC to INR conversion rate (e.g., 1 SC = 1 INR)
const SC_TO_INR_RATE = 1;

export async function POST(req: Request) {
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        return NextResponse.json({ error: "Payment gateway is not configured." }, { status: 500 });
    }

    // Auth Check
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
                    } catch {
                        // ignored
                    }
                },
            },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    try {
        const ip = req.headers.get('x-forwarded-for') || 'anon';
        const rateLimit = checkRateLimit(`rzp_order_${ip}`, 5, 60000);

        if (!rateLimit.success) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429, headers: { 'X-RateLimit-Reset': rateLimit.reset.toString() } }
            );
        }

        const body = await req.json();

        // Input Validation
        const parsed = orderSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid input", details: parsed.error.issues }, { status: 400 });
        }

        const { sc_amount } = parsed.data;
        // Strictly calculate amount on server-side
        const amount_in_inr = sc_amount * SC_TO_INR_RATE;

        const options = {
            amount: amount_in_inr * 100, // amount in paisa
            currency: "INR",
            receipt: `rcpt_${Date.now()}_${user.id.substring(0, 8)}`,
            notes: {
                user_id: user.id,
                sc_amount: sc_amount.toString()
            }
        };

        const order = await razorpay.orders.create(options);
        return NextResponse.json({ order }, { status: 200 });
    } catch (error) {
        console.error("Razorpay Error:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
