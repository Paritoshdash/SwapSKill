"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { SkillCard } from '@/components/skills/SkillCard';
import { storage } from '@/lib/storage';
import { Skill } from '@/components/skills/SkillsGrid';

export default function ProfilePage() {
    const { user, isAuthenticated, isLoading, updateProfile } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'offered' | 'learning' | 'reviews' | 'settings'>('offered');
    const [userSkills, setUserSkills] = useState<Skill[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                updateProfile({ profilePic: base64String });
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const fetchSkills = async () => {
            if (user) {
                const skills = await storage.getUserSkills(user.id);
                setUserSkills(skills);
            }
        };

        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        } else if (user) {
            fetchSkills();
        }
    }, [isAuthenticated, isLoading, router, user]);

    if (isLoading || !isAuthenticated || !user) return null;

    return (
        <div className="min-h-screen bg-[var(--bg-base)] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3 z-0"></div>
            <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4 z-0"></div>

            <div className="max-w-6xl mx-auto relative z-10 animate-fade-in-up">
                {/* User Info Card */}
                <div className="bg-[var(--bg-card)]/80 backdrop-blur-xl border border-[var(--divider)] rounded-[2rem] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.5)] mb-8 flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10 w-full">
                        {/* Profile Avatar Image with Upload Action */}
                        <div className="flex flex-col items-center">
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden border-4 border-[var(--bg-card)] shadow-[0_0_20px_rgba(245,178,26,0.15)] group cursor-pointer bg-[var(--bg-section)]"
                            >
                                <Image
                                    src={user.profilePic || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
                                    alt={user.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg className="w-8 h-8 text-white mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-xs font-semibold text-white uppercase tracking-wider">Change</span>
                                </div>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Profile Details Header */}
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-4">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-text-main tracking-tight mb-2">{user.name}</h1>
                            <p className="text-primary font-medium text-lg mb-4">{user.tagline}</p>
                            <p className="text-text-muted text-base max-w-2xl leading-relaxed">{user.bio}</p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                            <span className="flex items-center gap-1.5 text-sm font-medium text-text-main bg-[var(--bg-section)] border border-[var(--divider)] px-3 py-1.5 rounded-full">
                                <svg className="text-primary" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                Joined Feb 2026
                            </span>
                            <span className="flex items-center gap-1.5 text-sm font-medium text-text-main bg-[var(--bg-section)] border border-[var(--divider)] px-3 py-1.5 rounded-full">
                                <svg className="text-primary" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                Verified Email
                            </span>
                        </div>
                    </div>

                    <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
                        <button className="px-6 py-3 w-full md:w-auto bg-transparent hover:bg-primary/10 text-primary font-medium rounded-xl border border-primary transition-colors flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(245,178,26,0.1)] hover:shadow-[0_0_15px_rgba(245,178,26,0.3)]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Interactive Tabs Header */}
                <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 bg-[var(--bg-section)] p-2 rounded-2xl border border-[var(--divider)] backdrop-blur-md">
                    {(['offered', 'learning', 'reviews', 'settings'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${activeTab === tab
                                ? 'bg-primary text-[#121212] shadow-sm'
                                : 'text-text-muted hover:text-primary hover:bg-primary/5 border border-transparent'
                                }`}
                        >
                            {tab === 'offered' && 'My Skills Offered'}
                            {tab === 'learning' && 'My Learning History'}
                            {tab === 'reviews' && 'Reviews & Ratings'}
                            {tab === 'settings' && 'Settings'}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[400px]">
                    {activeTab === 'offered' && (
                        <div className="animate-fade-in-up">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-heading font-bold text-text-main">Skills You Offer</h2>
                                <button onClick={() => router.push('/offer-skill')} className="text-sm font-medium text-primary hover:text-secondary transition-colors flex items-center gap-1">
                                    + Add New
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {userSkills.map((skill) => (
                                    <SkillCard
                                        key={skill.id}
                                        {...skill}
                                    />
                                ))}

                                <div className="border border-dashed border-[var(--divider)] rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-[var(--bg-card)] hover:border-primary/50 transition-colors cursor-pointer group" onClick={() => router.push('/offer-skill')}>
                                    <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    </div>
                                    <h3 className="text-text-main font-semibold mb-1">Offer another skill</h3>
                                    <p className="text-sm text-text-muted">Share more of your expertise.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'learning' && (
                        <div className="animate-fade-in-up bg-[var(--bg-card)] border border-[var(--divider)] rounded-[2rem] p-8 text-center flex flex-col items-center justify-center h-[400px]">
                            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6 text-secondary text-3xl">📚</div>
                            <h3 className="text-2xl font-heading font-bold text-text-main mb-2">No learning history yet</h3>
                            <p className="text-text-muted max-w-md mx-auto mb-8">You haven&apos;t initiated any skill swaps to learn something new yet. Browse the marketplace to find your first mentor!</p>
                            <button onClick={() => router.push('/skills')} className="px-8 py-3 bg-secondary hover:bg-[#ff9d1a] border border-secondary text-[#121212] font-semibold rounded-full transition-all shadow-[0_0_20px_rgba(229,142,0,0.3)] hover:shadow-[0_0_30px_rgba(229,142,0,0.5)]">
                                Browse Skills
                            </button>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="animate-fade-in-up bg-[var(--bg-card)] border border-[var(--divider)] rounded-[2rem] p-8">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="text-5xl font-heading font-extrabold text-text-main">4.9</div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex text-primary text-lg">★★★★★</div>
                                    <div className="text-sm text-text-muted">Based on 12 reviews</div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Dummy Review */}
                                <div className="border border-[var(--divider)] bg-[var(--bg-section)] p-6 rounded-2xl hover:border-primary/30 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-[#121212] font-bold">A</div>
                                            <div>
                                                <div className="text-text-main font-semibold">Alex Johnson</div>
                                                <div className="text-xs text-text-muted">2 weeks ago</div>
                                            </div>
                                        </div>
                                        <div className="text-primary text-sm">★★★★★</div>
                                    </div>
                                    <p className="text-text-main text-sm leading-relaxed">
                                        &quot;{user.name} is an incredible mentor! The session was structural, clear, and perfectly tailored to my questions. Highly recommend swapping with them.&quot;
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="animate-fade-in-up bg-[var(--bg-card)] border border-[var(--divider)] rounded-[2rem] p-8">
                            <h2 className="text-2xl font-heading font-bold text-text-main mb-6">Account Settings</h2>
                            <div className="space-y-6 max-w-2xl">
                                <div className="flex items-center justify-between p-4 bg-[var(--bg-section)] border border-[var(--divider)] rounded-xl">
                                    <div>
                                        <h4 className="text-text-main font-semibold">Email Notifications</h4>
                                        <p className="text-sm text-text-muted">Receive alerts when someone requests a swap.</p>
                                    </div>
                                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-[0_0_10px_rgba(245,178,26,0.3)]">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-[#121212] rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-[var(--bg-section)] border border-[var(--divider)] rounded-xl">
                                    <div>
                                        <h4 className="text-text-main font-semibold">Public Profile</h4>
                                        <p className="text-sm text-text-muted">Make your profile visible in search engines.</p>
                                    </div>
                                    <div className="w-12 h-6 bg-[var(--divider)] rounded-full relative cursor-pointer hover:bg-primary/20 transition-colors">
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-text-muted rounded-full"></div>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-[var(--divider)]">
                                    <button className="text-red-500 hover:text-red-400 font-medium text-sm transition-colors flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg">
                                        Deactivate Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
