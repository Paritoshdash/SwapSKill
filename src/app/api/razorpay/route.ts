import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { checkRateLimit } from '@/utils/rateLimit';

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'dummy_key',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});

// Create Order
export async function POST(req: Request) {
    try {
        const ip = req.headers.get('x-forwarded-for') || 'anon';
        const rateLimit = checkRateLimit(`rzp_order_${ip}`, 5, 60000); // 5 orders per minute per IP

        if (!rateLimit.success) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429, headers: { 'X-RateLimit-Reset': rateLimit.reset.toString() } }
            );
        }

        const body = await req.json();
        const { amount, user_id, sc_amount } = body; // amount in INR (rupees)

        const options = {
            amount: amount * 100, // amount in paisa
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
            notes: {
                user_id: user_id || '',
                sc_amount: sc_amount || 0
            }
        };

        const order = await razorpay.orders.create(options);
        return NextResponse.json({ order }, { status: 200 });
    } catch (error) {
        console.error("Razorpay Error:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
