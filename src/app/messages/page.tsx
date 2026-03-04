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
            const { data } = await supabase
                .from('sessions')
                .select(`
                    id,
                    status,
                    seeker_id,
                    provider_id,
                    skills!inner(title),
                    seeker:users!seeker_id(name, profile_pic, completed_swaps),
                    provider:users!provider_id(name, profile_pic, completed_swaps)
                `)
                .or(`seeker_id.eq.${user.id},provider_id.eq.${user.id}`)
                .order('created_at', { ascending: false });

            if (data) setSessions(data);
        };

        if (isAuthenticated) fetchSessions();
    }, [isAuthenticated, isLoading, router, user, supabase]);

    if (isLoading || !isAuthenticated || !user) return null;

    const activeSession = sessions.find(s => s.id === activeSessionId);

    const handleCompleteSession = async () => {
        if (!activeSession) return;
        setIsProcessing(true);

        const { error: completeError } = await supabase.rpc('complete_session', {
            p_session_id: activeSession.id
        });

        if (completeError) {
            console.error("Session completion failed:", completeError);
            alert("Failed to complete session: " + completeError.message);
            setIsProcessing(false);
            return;
        }

        // Insert Review
        const { error: reviewError } = await supabase.from('reviews').insert([{
            session_id: activeSession.id,
            reviewer_id: user.id,
            reviewee_id: activeSession.provider_id === user.id ? activeSession.seeker_id : activeSession.provider_id,
            rating: rating,
            comment: reviewComment
        }]);

        if (reviewError) {
            console.error("Review failed but session completed:", reviewError);
        }

        // Update local state
        setSessions(sessions.map(s => s.id === activeSession.id ? { ...s, status: 'completed' } : s));
        setIsProcessing(false);
        setShowRatingModal(false);
        refreshUser();
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-0 md:pb-8 px-0 sm:px-4 lg:px-8 relative flex flex-col h-screen overflow-hidden transition-colors duration-300">
            <div className="flex-1 max-w-7xl mx-auto w-full relative z-10 flex flex-col md:bg-card/40 md:backdrop-blur-xl md:border md:border-divider md:rounded-[2rem] overflow-hidden shadow-2xl">
                <div className="flex-1 flex overflow-hidden h-full">
                    {/* Sidebar: Session List */}
                    <div className={`w-full md:w-80 lg:w-96 flex-shrink-0 flex flex-col border-r border-divider bg-section/80 md:bg-transparent ${isMobileChatView ? 'hidden md:flex' : 'flex'}`}>
                        <div className="p-6 border-b border-divider">
                            <h2 className="text-2xl font-bold text-foreground tracking-tight">Collaborations</h2>
                        </div>
                        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                            {sessions.length === 0 ? (
                                <div className="flex flex-col items-center justify-center mt-12 text-muted gap-4">
                                    <p>No active collaborations.</p>
                                    <button onClick={() => router.push('/skills')} className="text-primary hover:text-secondary text-sm font-medium underline underline-offset-4">Explore Skills</button>
                                </div>
                            ) : sessions.map((session) => {
                                const isProvider = session.provider_id === user?.id;
                                const otherUser = isProvider ? session.seeker : session.provider;

                                return (
                                    <button
                                        key={session.id}
                                        onClick={() => { setActiveSessionId(session.id); setIsMobileChatView(true); }}
                                        className={`w-full text-left flex flex-col gap-2 p-4 rounded-xl transition-all ${activeSessionId === session.id ? 'bg-foreground/10 border-divider' : 'bg-foreground/5 hover:bg-foreground/10 border-transparent'} border group`}
                                    >
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="w-10 h-10 relative rounded-full overflow-hidden bg-muted/20 shrink-0 border border-divider group-hover:border-primary/50 transition-colors">
                                                <Image src={otherUser?.profile_pic || `https://ui-avatars.com/api/?name=${otherUser?.name}&background=random`} alt={otherUser?.name || 'User'} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-foreground font-semibold truncate group-hover:text-primary transition-colors">{otherUser?.name}</h3>
                                                <p className="text-xs text-muted truncate">{session.skills.title}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mt-2 w-full text-xs">
                                            <span className={`px-2 py-1 rounded-md font-medium ${session.status === 'completed' ? 'bg-green-500/20 text-green-500' : 'bg-primary/20 text-primary'}`}>
                                                {session.status.toUpperCase()}
                                            </span>
                                            <span className="text-muted italic">Trust Member</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Main Area: Session Details */}
                    <div className={`flex-1 flex flex-col bg-background md:bg-transparent ${!isMobileChatView ? 'hidden md:flex' : 'flex'}`}>
                        {activeSession ? (
                            <div className="flex flex-col h-full">
                                <div className="p-6 border-b border-divider flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => setIsMobileChatView(false)} className="md:hidden text-muted hover:text-foreground">
                                            &larr; Back
                                        </button>
                                        <h2 className="text-xl font-bold text-foreground tracking-tight">{activeSession.skills.title}</h2>
                                    </div>
                                    <div className="flex gap-2">
                                        {activeSession.status !== 'completed' && activeSession.seeker_id === user?.id && (
                                            <button
                                                onClick={() => setShowRatingModal(true)}
                                                className="bg-primary hover:bg-secondary text-background text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-lg"
                                            >
                                                Complete & Rate
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="flex-1 p-6 flex flex-col items-center pt-12 space-y-6">
                                    <div className="text-center max-w-md bg-foreground/5 border border-divider rounded-2xl p-8 shadow-xl">
                                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/30">
                                            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-foreground mb-4">Collaboration Status</h3>
                                        <p className="text-muted mb-6 leading-relaxed">
                                            {activeSession.status === 'completed'
                                                ? "This session has been marked as complete. Thank you for participating in the SwapSkill community!"
                                                : "You are currently collaborating on this skill. Enjoy the knowledge exchange!"}
                                        </p>

                                        {activeSession.status === 'completed' && (
                                            <div className="text-green-500 font-bold py-2">
                                                ✅ Knowledge Exchange Success
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col items-center justify-center text-muted mt-12 bg-surface/40 p-12 rounded-2xl w-full max-w-md border border-divider border-dashed">
                                        <svg className="w-12 h-12 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                        <p className="text-center text-sm font-medium text-muted/60">Secure collaboration chat channel initialization...</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center p-8 text-center bg-transparent">
                                <div className="max-w-xs">
                                    <div className="w-20 h-20 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-10 h-10 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                                    </div>
                                    <p className="text-muted text-lg font-medium">Select a collaboration to view details and rate your experience.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Rating Modal */}
            {showRatingModal && activeSession && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md transition-all duration-300">
                    <div className="bg-card border border-divider rounded-[2.5rem] p-10 max-w-md w-full animate-fade-in-up shadow-[0_0_50px_rgba(0,0,0,0.3)]">
                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-foreground mb-2">Complete Session</h3>
                            <p className="text-muted">Mark this collaboration as successful and share your feedback.</p>
                        </div>

                        <div className="flex justify-center gap-3 mb-8">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`text-4xl transition-all duration-300 hover:scale-125 focus:outline-none ${rating >= star ? 'text-primary drop-shadow-[0_0_8px_rgba(245,178,26,0.5)]' : 'text-muted/40'}`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>

                        <textarea
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            placeholder="How was your learning experience? (Optional)"
                            className="w-full bg-background/40 border border-divider rounded-2xl p-4 text-foreground placeholder-muted mb-8 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                            rows={4}
                        />

                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowRatingModal(false)}
                                className="flex-1 py-4 px-4 bg-foreground/5 hover:bg-foreground/10 text-foreground font-bold rounded-2xl transition-all border border-divider"
                            >
                                Not Yet
                            </button>
                            <button
                                onClick={handleCompleteSession}
                                disabled={isProcessing}
                                className="flex-2 py-4 px-8 bg-primary hover:bg-secondary text-background font-bold rounded-2xl transition-all shadow-xl disabled:opacity-50"
                            >
                                {isProcessing ? 'Saving...' : 'Complete & Review'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
