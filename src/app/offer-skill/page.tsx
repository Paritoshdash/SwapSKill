"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';

export default function OfferSkillPage() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redirect to login if not authenticated (simple protection for this route)
    React.useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, isLoading, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        if (user) {
            const newSkill = {
                title: formData.get('title') as string,
                providerId: user.id, // provider mapped to user.name internally
                rating: 0,
                category: formData.get('category') as string,
                type: formData.get('format') as 'Online' | 'Offline',
                duration_hours: 1, // Defaulting for MVP
                sc_cost: 10,      // Defaulting for MVP
            };

            await storage.addSkill(newSkill);
        }

        setIsSubmitting(false);
        router.push('/skills');
    };

    if (isLoading || !isAuthenticated) return null; // Avoid flashing content while redirecting

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
            {/* Background luxury gradient blurs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3 z-0"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

            <div className="w-full max-w-2xl z-10 animate-fade-in-up mt-8">
                <div className="bg-card/60 backdrop-blur-xl border border-divider rounded-[2rem] p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-3">Offer Your Skill</h1>
                        <p className="text-muted text-lg">Share your expertise and find the perfect swap partner.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div className="space-y-2 group">
                            <label className="text-xs font-semibold text-muted uppercase tracking-wider ml-1 group-focus-within:text-primary transition-colors">
                                Skill Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                required
                                className="w-full bg-section border border-divider rounded-xl py-4 flex-1 px-4 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                placeholder="e.g. Advanced Vue.js Architecture Mentorship"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category dropdown */}
                            <div className="space-y-2 group">
                                <label className="text-xs font-semibold text-muted uppercase tracking-wider ml-1 group-focus-within:text-primary transition-colors">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    required
                                    defaultValue=""
                                    className="w-full bg-section border border-divider rounded-xl py-4 px-4 text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all cursor-pointer"
                                >
                                    <option value="" disabled className="bg-card">Select a category</option>
                                    <option value="Coding" className="bg-card">Coding & Tech</option>
                                    <option value="Art" className="bg-card">Art & Design</option>
                                    <option value="Music" className="bg-card">Music & Audio</option>
                                    <option value="Language" className="bg-card">Languages</option>
                                    <option value="Fitness" className="bg-card">Health & Fitness</option>
                                    <option value="Cooking" className="bg-card">Culinary & Cooking</option>
                                </select>
                            </div>

                            {/* Format dropdown */}
                            <div className="space-y-2 group">
                                <label className="text-xs font-semibold text-muted uppercase tracking-wider ml-1 group-focus-within:text-primary transition-colors">
                                    Format
                                </label>
                                <select
                                    name="format"
                                    required
                                    defaultValue="Online"
                                    className="w-full bg-section border border-divider rounded-xl py-4 px-4 text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all cursor-pointer"
                                >
                                    <option value="Online" className="bg-card">Online (Video Call)</option>
                                    <option value="Offline" className="bg-card">Offline (In-Person)</option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2 group">
                            <label className="text-xs font-semibold text-muted uppercase tracking-wider ml-1 group-focus-within:text-primary transition-colors">
                                Overview / Description
                            </label>
                            <textarea
                                name="description"
                                required
                                rows={4}
                                className="w-full bg-section border border-divider rounded-xl py-4 px-4 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                                placeholder="Describe what you can teach and what the other person can expect to learn."
                            />
                        </div>

                        {/* Swap terms */}
                        <div className="space-y-2 group">
                            <label className="text-xs font-semibold text-muted uppercase tracking-wider ml-1 group-focus-within:text-primary transition-colors">
                                What do you want in return?
                            </label>
                            <input
                                type="text"
                                name="swapTerms"
                                required
                                className="w-full bg-section border border-divider rounded-xl py-4 px-4 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                placeholder="e.g. Seeking UX Design tips or Conversational Spanish"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-8 bg-primary hover:bg-secondary text-background font-medium py-4 rounded-xl transition-all shadow-lg hover:shadow-primary/25 flex justify-center items-center gap-2 group relative overflow-hidden disabled:opacity-70 text-lg"
                        >
                            {isSubmitting ? (
                                <div className="w-6 h-6 border-2 border-background/30 border-t-background rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Publish Skill</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
