"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';
import { bookSession } from '@/actions/sessions';

export default function BookSessionPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    const { user, isAuthenticated, isLoading, refreshUser } = useAuth();
    const router = useRouter();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [skill, setSkill] = useState<any>(null);
    const [isBooking, setIsBooking] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
            return;
        }

        const fetchSkillDetails = async () => {
            const { data } = await supabase
                .from('skills')
                .select('*, provider:users!provider_id(name, completed_swaps)')
                .eq('id', resolvedParams.id)
                .single();

            if (data) {
                setSkill(data);
            }
        };

        if (isAuthenticated) fetchSkillDetails();
    }, [isAuthenticated, isLoading, router, resolvedParams.id, supabase]);

    const handleBooking = async () => {
        if (!user || !skill) return;
        setIsBooking(true);

        const result = await bookSession(skill.id, skill.provider_id);

        if (result.error) {
            console.error("Booking failed:", result.error);
            toast.error("Booking failed: " + result.error);
            setIsBooking(false);
            return;
        }

        await refreshUser();
        setIsBooking(false);
        toast.success("Collaboration request sent!");
        router.push('/messages');
    };

    if (isLoading || !skill) {
        return <div className="min-h-screen bg-[#050505] pt-32 text-center text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-4 relative flex items-center justify-center">
            {/* Background elements to maintain luxury aesthetic */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

            <div className="bg-[#1a1a1a]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 max-w-lg w-full z-10 animate-fade-in-up">
                <h1 className="text-3xl font-bold text-white mb-2">Initialize Collaboration</h1>
                <p className="text-gray-400 mb-6">You are starting a learning session for <span className="text-blue-400 font-medium">{skill.title}</span> with {skill.provider?.name}.</p>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Format</span>
                        <span className="font-semibold text-white">{skill.type}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Target Duration</span>
                        <span className="font-semibold text-white">{skill.duration_hours} Hour{skill.duration_hours !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                        <span className="text-gray-300">Provider Trust Score</span>
                        <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            {skill.provider?.completed_swaps || 0} Swaps
                        </span>
                    </div>
                </div>

                <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="text-xs text-blue-300 leading-relaxed italic">
                        SwapSkill is currently free for our community. Connect, learn, and grow together without any credit deductions.
                    </p>
                </div>

                <button
                    onClick={handleBooking}
                    disabled={isBooking}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center group overflow-hidden relative"
                >
                    <span className="relative z-10">
                        {isBooking ? 'Finalizing Setup...' : 'Confirm Collaboration Request'}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
            </div>
        </div>
    );
}
