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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        if (user) {
            const newSkill = {
                title: formData.get('title') as string,
                provider: user.name,
                providerId: user.id,
                rating: 0, // start with 0 rating
                price: formData.get('swapTerms') as string,
                category: formData.get('category') as string,
                type: formData.get('format') as 'Online' | 'Offline',
                duration: 'Negotiable', // Placeholder default
                createdAt: new Date().toISOString(),
                // Also could store 'description' if we add it to the Skill interface later or expand it
            };

            // Save to mock backend
            storage.addSkill(newSkill);
        }

        setTimeout(() => {
            setIsSubmitting(false);
            router.push('/skills');
        }, 1500);
    };

    if (isLoading || !isAuthenticated) return null; // Avoid flashing content while redirecting

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background luxury gradient blurs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3 z-0"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[150px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

            <div className="w-full max-w-2xl z-10 animate-fade-in-up mt-8">
                <div className="bg-[#1a1a1a]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">Offer Your Skill</h1>
                        <p className="text-gray-400 text-lg">Share your expertise and find the perfect swap partner.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div className="space-y-2 group">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1 group-focus-within:text-teal-400 transition-colors">
                                Skill Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                required
                                className="w-full bg-[#111] border border-white/10 rounded-xl py-4 flex-1 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                                placeholder="e.g. Advanced Vue.js Architecture Mentorship"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category dropdown */}
                            <div className="space-y-2 group">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1 group-focus-within:text-teal-400 transition-colors">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    required
                                    defaultValue=""
                                    className="w-full bg-[#111] border border-white/10 rounded-xl py-4 px-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all cursor-pointer"
                                >
                                    <option value="" disabled>Select a category</option>
                                    <option value="Coding">Coding & Tech</option>
                                    <option value="Art">Art & Design</option>
                                    <option value="Music">Music & Audio</option>
                                    <option value="Language">Languages</option>
                                    <option value="Fitness">Health & Fitness</option>
                                    <option value="Cooking">Culinary & Cooking</option>
                                </select>
                            </div>

                            {/* Format dropdown */}
                            <div className="space-y-2 group">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1 group-focus-within:text-teal-400 transition-colors">
                                    Format
                                </label>
                                <select
                                    name="format"
                                    required
                                    defaultValue="Online"
                                    className="w-full bg-[#111] border border-white/10 rounded-xl py-4 px-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all cursor-pointer"
                                >
                                    <option value="Online">Online (Video Call)</option>
                                    <option value="Offline">Offline (In-Person)</option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2 group">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1 group-focus-within:text-teal-400 transition-colors">
                                Overview / Description
                            </label>
                            <textarea
                                name="description"
                                required
                                rows={4}
                                className="w-full bg-[#111] border border-white/10 rounded-xl py-4 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all resize-none"
                                placeholder="Describe what you can teach and what the other person can expect to learn."
                            />
                        </div>

                        {/* Swap terms */}
                        <div className="space-y-2 group">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1 group-focus-within:text-teal-400 transition-colors">
                                What do you want in return?
                            </label>
                            <input
                                type="text"
                                name="swapTerms"
                                required
                                className="w-full bg-[#111] border border-white/10 rounded-xl py-4 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                                placeholder="e.g. Seeking UX Design tips or Conversational Spanish"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-8 bg-teal-600 hover:bg-teal-500 text-white font-medium py-4 rounded-xl transition-all shadow-lg hover:shadow-teal-500/25 flex justify-center items-center gap-2 group relative overflow-hidden disabled:opacity-70 text-lg"
                        >
                            {isSubmitting ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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
