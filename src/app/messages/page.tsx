"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';

export default function MessagesPage() {
    const { user, isAuthenticated, isLoading, refreshUser } = useAuth();
    const router = useRouter();
    const supabase = createClient();

    const [sessions, setSessions] = useState<any[]>([]);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const [isMobileChatView, setIsMobileChatView] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Rating Modal State
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [reviewComment, setReviewComment] = useState('');

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
            return;
        }

        const fetchSessions = async () => {
            if (!user) return;
            const { data, error } = await supabase
                .from('sessions')
                .select(`
                    id,
                    status,
                    sc_held_in_escrow,
                    seeker_id,
                    provider_id,
                    skills!inner(title),
                    seeker:users!seeker_id(name, profile_pic),
                    provider:users!provider_id(name, profile_pic)
                `)
                .or(`seeker_id.eq.${user.id},provider_id.eq.${user.id}`)
                .order('created_at', { ascending: false });

            if (data) setSessions(data);
        };

        if (isAuthenticated) fetchSessions();
    }, [isAuthenticated, isLoading, router, user]);

    if (isLoading || !isAuthenticated || !user) return null;

    const activeSession = sessions.find(s => s.id === activeSessionId);

    const handleReleaseEscrowAndRate = async () => {
        if (!activeSession) return;
        setIsProcessing(true);

        const { error: escrowError } = await supabase.rpc('release_escrow', {
            p_session_id: activeSession.id
        });

        if (escrowError) {
            console.error("Escrow release failed:", escrowError);
            alert("Failed to release escrow: " + escrowError.message);
            setIsProcessing(false);
            return;
        }

        // Insert Review
        const { error: reviewError } = await supabase.from('reviews').insert([{
            session_id: activeSession.id,
            reviewer_id: user.id,
            reviewee_id: activeSession.provider_id,
            rating: rating,
            comment: reviewComment
        }]);

        if (reviewError) {
            console.error("Review failed but escrow released:", reviewError);
        }

        // Update local state
        setSessions(sessions.map(s => s.id === activeSession.id ? { ...s, status: 'completed' } : s));
        setIsProcessing(false);
        setShowRatingModal(false);
        refreshUser();
    };

    return (
        <div className="min-h-screen bg-[#050505] pt-24 pb-0 md:pb-8 px-0 sm:px-4 lg:px-8 relative flex flex-col h-screen">
            <div className="flex-1 max-w-7xl mx-auto w-full relative z-10 flex flex-col md:bg-[#1a1a1a]/40 md:backdrop-blur-xl md:border md:border-white/10 md:rounded-[2rem] overflow-hidden">
                <div className="flex flex-1 overflow-hidden h-full">
                    {/* Sidebar: Session List */}
                    <div className={`w-full md:w-80 lg:w-96 flex-shrink-0 flex flex-col border-r border-white/10 bg-[#0f0f0f]/80 md:bg-transparent ${isMobileChatView ? 'hidden md:flex' : 'flex'}`}>
                        <div className="p-6 border-b border-white/10">
                            <h2 className="text-2xl font-bold text-white tracking-tight">Active Sessions</h2>
                        </div>
                        <div className="flex-1 overflow-y-auto p-3 space-y-2">
                            {sessions.length === 0 ? (
                                <p className="text-gray-500 text-center mt-4">No active sessions.</p>
                            ) : sessions.map((session) => {
                                const isProvider = session.provider_id === user.id;
                                const otherUser = isProvider ? session.seeker : session.provider;

                                return (
                                    <button
                                        key={session.id}
                                        onClick={() => { setActiveSessionId(session.id); setIsMobileChatView(true); }}
                                        className={`w-full text-left flex flex-col gap-2 p-4 rounded-xl transition-all ${activeSessionId === session.id ? 'bg-white/10 border-white/20' : 'bg-white/5 hover:bg-white/10 border-transparent'} border`}
                                    >
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="w-10 h-10 relative rounded-full overflow-hidden bg-gray-800 shrink-0">
                                                <Image src={otherUser?.profile_pic || `https://ui-avatars.com/api/?name=${otherUser?.name}&background=random`} alt={otherUser?.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-white font-semibold truncate">{otherUser?.name}</h3>
                                                <p className="text-xs text-gray-400 truncate">{session.skills.title}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mt-2 w-full text-xs">
                                            <span className={`px-2 py-1 rounded-md font-medium ${session.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                                {session.status.toUpperCase()}
                                            </span>
                                            <span className="text-purple-400 font-bold">{session.sc_held_in_escrow} SC Escrow</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Main Area: Session Details / Chat Placeholder */}
                    <div className={`flex-1 flex flex-col bg-[#050505] md:bg-transparent ${!isMobileChatView ? 'hidden md:flex' : 'flex'}`}>
                        {activeSession ? (
                            <div className="flex flex-col h-full">
                                <div className="p-6 border-b border-white/10 flex items-center gap-4">
                                    <button onClick={() => setIsMobileChatView(false)} className="md:hidden text-gray-400 hover:text-white">
                                        &larr; Back
                                    </button>
                                    <h2 className="text-xl font-bold text-white tracking-tight">{activeSession.skills.title}</h2>
                                </div>
                                <div className="flex-1 p-6 flex flex-col items-center pt-12 space-y-6">
                                    <div className="text-center max-w-md bg-white/5 border border-white/10 rounded-2xl p-8">
                                        <h3 className="text-2xl font-bold text-white mb-4">Escrow Status</h3>
                                        <p className="text-gray-400 mb-6">
                                            {activeSession.sc_held_in_escrow} SC is currently held in Escrow for this session.
                                        </p>

                                        {activeSession.status === 'completed' ? (
                                            <div className="text-green-400 bg-green-500/10 px-4 py-3 rounded-xl border border-green-500/20">
                                                ✅ Session Completed & Escrow Released
                                            </div>
                                        ) : activeSession.seeker_id === user.id ? (
                                            <button
                                                onClick={() => setShowRatingModal(true)}
                                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg"
                                            >
                                                Mark Complete & Rate Session
                                            </button>
                                        ) : (
                                            <div className="text-blue-400 bg-blue-500/10 px-4 py-3 rounded-xl border border-blue-500/20">
                                                Waiting for Seeker to release Escrow.
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col items-center justify-center text-gray-500 mt-12 bg-[#1a1a1a]/40 p-6 rounded-2xl w-full max-w-md border border-white/5">
                                        <svg className="w-12 h-12 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                        <p className="text-center text-sm">Chat functionality goes here for the session.</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center p-8 text-center">
                                <p className="text-gray-500 text-lg">Select a session to view details.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Rating Modal */}
            {showRatingModal && activeSession && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 max-w-md w-full animate-fade-in-up">
                        <h3 className="text-2xl font-bold text-white mb-2">Rate your Session</h3>
                        <p className="text-gray-400 mb-6">How was your experience learning {activeSession.skills.title}?</p>

                        <div className="flex justify-center gap-2 mb-6">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`text-4xl transition-transform hover:scale-110 ${rating >= star ? 'text-yellow-400' : 'text-gray-600'}`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>

                        <textarea
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            placeholder="Leave an optional review..."
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 mb-6 focus:outline-none focus:border-blue-500"
                            rows={3}
                        />

                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowRatingModal(false)}
                                className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReleaseEscrowAndRate}
                                disabled={isProcessing}
                                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all shadow-lg text-sm"
                            >
                                {isProcessing ? 'Processing...' : 'Submit & Release'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
