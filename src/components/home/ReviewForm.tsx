"use client";

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Star } from 'lucide-react';

export function ReviewForm() {
    const { user, isAuthenticated } = useAuth();
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(5);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated || !user) {
            setMessage({ type: 'error', text: 'Please sign in to leave a review.' });
            return;
        }

        if (content.trim().length < 10) {
            setMessage({ type: 'error', text: 'Review must be at least 10 characters long.' });
            return;
        }

        setIsSubmitting(true);
        setMessage(null);

        const { error } = await supabase
            .from('website_reviews')
            .insert([
                {
                    user_id: user.id,
                    content: content.trim(),
                    rating: rating
                }
            ]);

        setIsSubmitting(false);

        if (error) {
            console.error('Error submitting review:', error);
            setMessage({ type: 'error', text: 'Failed to submit review. Please try again.' });
        } else {
            setMessage({ type: 'success', text: 'Thank you for your review! It will appear in our testimonials soon.' });
            setContent('');
            setRating(5);
            // Optional: Trigger a refresh of the testimonials
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('review-submitted'));
            }
        }
    };

    return (
        <section className="w-[96vw] max-w-[1400px] mx-auto py-20 px-4 md:px-12 relative z-20 bg-background/40 backdrop-blur-md rounded-[3rem] border border-white/5 shadow-2xl mb-12 mt-12">
            <div className="max-w-[800px] mx-auto">
                <div className="p-8 md:p-12 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                    <h3 className="text-3xl font-heading font-bold text-white mb-2">Share Your Experience</h3>
                    <p className="text-text-muted mb-8 italic">We value your feedback. Let us know how SwapSkill has helped you!</p>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setRating(s)}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star
                                            className={`w-8 h-8 ${s <= rating ? 'fill-primary text-primary' : 'text-white/20'}`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-white/70 mb-2">Your Review</label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Tell us what you think..."
                                className="w-full h-32 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                            />
                        </div>

                        {message && (
                            <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                {message.text}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 rounded-xl font-bold text-black transition-all transform active:scale-[0.98] ${isSubmitting ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(245,178,26,0.4)]'}`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Post Review'}
                        </button>

                        {!isAuthenticated && (
                            <p className="text-xs text-center text-text-muted mt-4">
                                You must be <span className="text-primary font-bold">logged in</span> to post a review.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
