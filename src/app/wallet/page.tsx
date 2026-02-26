"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Script from 'next/script';

const SC_PACKS = [
    { title: 'Starter Pack', sc: 50, price: 500, label: 'Standard top-up' },
    { title: 'Growth Pack', sc: 150, price: 1200, label: 'Most Popular', highlight: true },
    { title: 'Pro Booster', sc: 400, price: 3000, label: 'Best Value' },
];

export default function WalletPage() {
    const { user, isAuthenticated, isLoading, refreshUser } = useAuth();
    const router = useRouter();
    const supabase = createClient();

    const [transactions, setTransactions] = useState<any[]>([]);
    const [isRecharging, setIsRecharging] = useState<number | null>(null); // Index of pack

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
            return;
        }

        const fetchTransactions = async () => {
            if (!user) return;
            const { data } = await supabase
                .from('transactions')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (data) setTransactions(data);
        };

        if (isAuthenticated) fetchTransactions();
    }, [isAuthenticated, isLoading, router, user, refreshUser]);

    const handleBuyPack = async (packIndex: number) => {
        if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
            alert("Razorpay is not configured yet. This is a mockup of the flow.");
            return;
        }

        try {
            setIsRecharging(packIndex);
            const pack = SC_PACKS[packIndex];

            // 1. Create order on backend
            const response = await fetch('/api/razorpay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: pack.price })
            });
            const data = await response.json();

            // 2. Open Razorpay Checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: pack.price * 100,
                currency: "INR",
                name: "SwapSkill",
                description: `Purchase ${pack.sc} Skill Credits`,
                order_id: data.order.id,
                handler: async function (response: any) {
                    // Payment successful

                    // In a real app, verify signature on backend:
                    // response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature

                    // Credit SC to user
                    const updatedBalance = (user?.sc_balance || 0) + pack.sc;

                    await supabase
                        .from('users')
                        .update({ sc_balance: updatedBalance })
                        .eq('id', user?.id);

                    await supabase
                        .from('transactions')
                        .insert([{
                            user_id: user?.id,
                            amount: pack.sc,
                            tx_type: 'purchase',
                            description: `Purchased ${pack.title}`
                        }]);

                    refreshUser(); // Update balance in UI
                    alert(`Successfully purchased ${pack.sc} SC!`);
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                },
                theme: {
                    color: "#3B82F6"
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', function (response: any) {
                alert(response.error.description);
            });
            rzp.open();

        } catch (error) {
            console.error("Payment failed", error);
            alert("Something went wrong with the payment gateway.");
        } finally {
            setIsRecharging(null);
        }
    };

    if (isLoading || !isAuthenticated || !user) return null;

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            {/* Background elements to maintain luxury aesthetic */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none translate-y-1/3"></div>

            <div className="max-w-7xl mx-auto relative z-10 animate-fade-in-up">
                {/* Header */}
                <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                            Wallet & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">Credits</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl">
                            Manage your Skill Credits (SC) to book top mentors and premium sessions.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Balance & Transactions */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Balance Card */}
                        <div className="bg-[#1a1a1a]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 blur-[80px] rounded-full pointer-events-none -mr-32 -mt-32"></div>

                            <div>
                                <p className="text-gray-400 font-medium mb-2 uppercase tracking-wide text-sm">Available Balance</p>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-6xl font-extrabold text-white tracking-tighter">{user.sc_balance || 0}</span>
                                    <span className="text-2xl font-bold font-mono text-emerald-400">SC</span>
                                </div>
                            </div>

                            <button
                                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] shrink-0 w-full md:w-auto"
                            >
                                Top Up Balance
                            </button>
                        </div>

                        {/* Transactions List */}
                        <div className="bg-[#1a1a1a]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]">
                            <h2 className="text-xl font-bold text-white mb-6">Recent Transactions</h2>

                            <div className="space-y-4">
                                {transactions.length === 0 ? (
                                    <p className="text-gray-500">No transactions yet.</p>
                                ) : (
                                    transactions.map(tx => (
                                        <div key={tx.id} className="flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-xl">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${tx.tx_type === 'purchase' || tx.tx_type === 'earned' || tx.tx_type === 'escrow_release' ? 'bg-green-500/20 text-green-400'
                                                        : 'bg-red-500/20 text-red-400'
                                                    }`}>
                                                    {tx.tx_type === 'purchase' || tx.tx_type === 'earned' || tx.tx_type === 'escrow_release' ? (
                                                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
                                                    ) : (
                                                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path></svg>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{tx.description}</p>
                                                    <p className="text-xs text-gray-500">{new Date(tx.created_at).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className={`font-bold ${tx.tx_type === 'purchase' || tx.tx_type === 'earned' || tx.tx_type === 'escrow_release' ? 'text-green-400' : 'text-red-400'}`}>
                                                {tx.tx_type === 'purchase' || tx.tx_type === 'earned' || tx.tx_type === 'escrow_release' ? '+' : '-'}{tx.amount} SC
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Top Up Packs */}
                    <div>
                        <div className="sticky top-32">
                            <h2 className="text-xl font-bold text-white mb-6">Top Up SC</h2>
                            <div className="space-y-4">
                                {SC_PACKS.map((pack, idx) => (
                                    <div key={idx} className={`relative p-6 rounded-2xl border ${pack.highlight ? 'bg-gradient-to-br from-[#1a1a1a] to-emerald-900/20 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]' : 'bg-[#1a1a1a]/60 border-white/10'}`}>
                                        {pack.highlight && (
                                            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-bl-lg rounded-tr-xl">
                                                Most Popular
                                            </div>
                                        )}
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-white mb-1">{pack.title}</h3>
                                                <p className="text-sm text-gray-400">{pack.label}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-baseline gap-2 mb-6">
                                            <span className="text-3xl font-extrabold text-white">{pack.sc}</span>
                                            <span className="text-emerald-400 font-bold font-mono">SC</span>
                                        </div>
                                        <button
                                            onClick={() => handleBuyPack(idx)}
                                            disabled={isRecharging === idx}
                                            className={`w-full py-3 rounded-xl font-medium transition-all ${pack.highlight
                                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                                                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                                                }`}
                                        >
                                            {isRecharging === idx ? 'Processing...' : `Buy for ₹${pack.price}`}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
