"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function BookSessionPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    const { user, isAuthenticated, isLoading, refreshUser } = useAuth();
    const router = useRouter();
    const [skill, setSkill] = useState<any>(null);
    const [isBooking, setIsBooking] = useState(false);
    const [scRequired, setScRequired] = useState(0);

    const supabase = createClient();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
            return;
        }

        const fetchSkillDetails = async () => {
            const { data } = await supabase
                .from('skills')
                .select('*, provider:users!provider_id(name)')
                .eq('id', resolvedParams.id)
                .single();

            if (data) {
                setSkill(data);
                setScRequired(data.sc_cost);
            }
        };

        if (isAuthenticated) fetchSkillDetails();
    }, [isAuthenticated, isLoading, router, resolvedParams.id]);

    const handleBooking = async () => {
        if (!user || !skill) return;
        setIsBooking(true);

        const { error } = await supabase.rpc('book_session', {
            p_seeker_id: user.id,
            p_provider_id: skill.provider_id,
            p_skill_id: skill.id,
            p_sc_cost: scRequired
        });

        if (error) {
            console.error("Booking failed:", error);
            alert("Booking failed: " + error.message);
            setIsBooking(false);
            return;
        }

        await refreshUser(); // Update context balance
        setIsBooking(false);
        router.push('/messages'); // Redirect to sessions/messages
    };

    if (isLoading || !skill) {
        return <div className="min-h-screen bg-[#050505] pt-32 text-center text-white">Loading...</div>;
    }

    const hasEnoughBalance = (user?.sc_balance || 0) >= scRequired;

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-4 relative flex items-center justify-center">
            <div className="bg-[#1a1a1a]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 max-w-lg w-full z-10 animate-fade-in-up">
                <h1 className="text-3xl font-bold text-white mb-2">Book Session</h1>
                <p className="text-gray-400 mb-6">You are booking <span className="text-teal-400 font-medium">{skill.title}</span> with {skill.provider?.name}.</p>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Format</span>
                        <span className="font-semibold text-white">{skill.type}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Duration</span>
                        <span className="font-semibold text-white">{skill.duration_hours} Hour{skill.duration_hours > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                        <span className="text-gray-300">Total Escrow Required</span>
                        <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{scRequired} SC</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-8 px-4">
                    <span className="text-sm text-gray-500">Your Current Balance:</span>
                    <span className={`font-bold ${hasEnoughBalance ? 'text-green-400' : 'text-red-400'}`}>{user?.sc_balance || 0} SC</span>
                </div>

                {hasEnoughBalance ? (
                    <button
                        onClick={handleBooking}
                        disabled={isBooking}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-4 rounded-xl transition-all shadow-lg flex justify-center items-center"
                    >
                        {isBooking ? 'Processing Escrow...' : 'Confirm Booking & Lock Escrow'}
                    </button>
                ) : (
                    <button
                        onClick={() => router.push('/wallet')}
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-4 rounded-xl transition-all shadow-lg text-center"
                    >
                        Insufficient SC - Buy More
                    </button>
                )}
            </div>
        </div>
    );
}
