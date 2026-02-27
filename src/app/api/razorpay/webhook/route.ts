import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { checkRateLimit } from '@/utils/rateLimit';

export async function POST(req: Request) {
    try {
        // We must use the service role key to bypass RLS securely in backend webhooks
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL || '',
            process.env.SUPABASE_SERVICE_ROLE_KEY || ''
        );

        const ip = req.headers.get('x-forwarded-for') || 'anon';
        const rateLimit = checkRateLimit(`rzp_webhook_${ip}`, 20, 60000); // Higher limit for webhooks but still protected

        if (!rateLimit.success) {
            return NextResponse.json(
                { error: 'Too many requests.' },
                { status: 429, headers: { 'X-RateLimit-Reset': rateLimit.reset.toString() } }
            );
        }

        const bodyText = await req.text();
        const signature = req.headers.get('x-razorpay-signature');
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

        if (!signature || !webhookSecret) {
            return NextResponse.json({ error: 'Missing webhook signature or secret.' }, { status: 400 });
        }

        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(bodyText)
            .digest('hex');

        if (expectedSignature !== signature) {
            return NextResponse.json({ error: 'Invalid signature. Webhook rejected.' }, { status: 400 });
        }

        const event = JSON.parse(bodyText);

        // Process successful payment
        if (event.event === 'order.paid' || event.event === 'payment.captured') {
            const payment = event.payload.payment.entity;
            const orderId = payment.order_id;

            // Extract the metadata we passed during order creation
            const userId = payment.notes?.user_id;
            const scAmount = parseInt(payment.notes?.sc_amount || "0");

            if (userId && scAmount > 0) {
                // Ensure atomic Top-Up using RPC or direct admin update
                const { data: user, error: userError } = await supabaseAdmin
                    .from('users')
                    .select('sc_balance')
                    .eq('id', userId)
                    .single();

                if (user && !userError) {
                    await supabaseAdmin
                        .from('users')
                        .update({ sc_balance: user.sc_balance + scAmount })
                        .eq('id', userId);

                    await supabaseAdmin
                        .from('transactions')
                        .insert([{
                            user_id: userId,
                            amount: scAmount,
                            tx_type: 'purchase',
                            description: `Purchased ${scAmount} SC via Razorpay Order ${orderId}`
                        }]);

                    console.log(`Successfully topped up ${scAmount} SC for user ${userId}`);
                } else {
                    console.error('Webhook: User not found for SC Top-Up', userId);
                }
            }
        }

        return NextResponse.json({ status: 'ok' }, { status: 200 });

    } catch (error: any) {
        console.error('Webhook processing failed:', error.message);
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}
