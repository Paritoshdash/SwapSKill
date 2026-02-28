import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[var(--bg-base)] text-text-main pt-24 font-inter">

            {/* ==== HERO SECTION (MISSION & VISION) ==== */}
            <section className="relative px-6 py-20 md:py-32 max-w-7xl mx-auto flex flex-col items-center justify-center text-center overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 space-y-8 max-w-4xl animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-text-main via-text-main to-text-muted pb-2">
                        Knowledge is meant to be <span className="text-primary bg-none bg-clip-border">shared.</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-text-muted leading-relaxed max-w-3xl mx-auto">
                        Our mission is to democratize education by creating a global marketplace where anyone can trade what they know for what they want to learn. No money, just pure skill-for-skill exchange.
                    </p>
                    <div className="pt-8">
                        <Link href="/signup" className="inline-flex items-center gap-2 bg-primary text-[#121212] px-8 py-4 rounded-full font-semibold hover:bg-secondary transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(245,178,26,0.3)] hover:shadow-[0_0_30px_rgba(245,178,26,0.5)]">
                            Join the Movement
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ==== HOW IT WORKS SECTION (3 STEPS) ==== */}
            <section className="relative border-t border-[var(--divider)] bg-[var(--bg-section)] px-6 py-32">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <h2 className="text-secondary font-semibold tracking-wider uppercase text-sm mb-3">The Process</h2>
                        <h3 className="text-4xl md:text-5xl font-heading font-bold text-text-main">How SwapSkill Works</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop Only) */}
                        <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 -translate-y-1/2 z-0" />

                        {/* Step 1 */}
                        <div className="relative z-10 flex flex-col items-center text-center group bg-[var(--bg-card)] p-10 rounded-[2rem] border border-[var(--divider)] hover:border-primary/50 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(245,178,26,0.1)]">
                            <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(245,178,26,0.2)] group-hover:scale-110 transition-transform">
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </div>
                            <h4 className="text-2xl font-heading font-bold text-text-main mb-4 group-hover:text-primary transition-colors">1. Offer a Skill</h4>
                            <p className="text-text-muted leading-relaxed">List what you know. It could be coding, guitar, conversational Spanish, or marketing. Everyone is an expert at something.</p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative z-10 flex flex-col items-center text-center group bg-[var(--bg-card)] p-10 rounded-[2rem] border border-[var(--divider)] hover:border-primary/50 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(245,178,26,0.1)]">
                            <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(245,178,26,0.2)] group-hover:scale-110 transition-transform">
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            </div>
                            <h4 className="text-2xl font-heading font-bold text-text-main mb-4 group-hover:text-primary transition-colors">2. Find a Match</h4>
                            <p className="text-text-muted leading-relaxed">Browse the marketplace to find someone who offers what you want to learn, and is looking for what you teach.</p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative z-10 flex flex-col items-center text-center group bg-[var(--bg-card)] p-10 rounded-[2rem] border border-[var(--divider)] hover:border-primary/50 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(245,178,26,0.1)]">
                            <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(245,178,26,0.2)] group-hover:scale-110 transition-transform">
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                            </div>
                            <h4 className="text-2xl font-heading font-bold text-text-main mb-4 group-hover:text-primary transition-colors">3. Meet & Learn</h4>
                            <p className="text-text-muted leading-relaxed">Connect via our messaging system to coordinate a video call or in-person meetup. Swap hours, learn, and review!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==== VIDEO DEMO PLACEHOLDER ==== */}
            <section className="relative px-6 py-32 bg-[var(--bg-base)]">
                <div className="max-w-5xl mx-auto text-center space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-text-main">See It In Action</h2>
                        <p className="text-text-muted max-w-2xl mx-auto">Watch a 2-minute demonstration of how easily communities are growing through transparent skill exchanges.</p>
                    </div>

                    <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-[var(--divider)] group cursor-pointer shadow-[0_0_50px_rgba(245,178,26,0.05)] bg-[var(--bg-card)]">
                        {/* Placeholder gradient mimicking a blurry video thumbnail */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-[var(--bg-base)] blur-xl opacity-60 transition-opacity group-hover:opacity-100" />

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110">
                            <div className="w-24 h-24 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center border border-primary/50 shadow-[0_0_30px_rgba(245,178,26,0.5)]">
                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                                    <svg className="w-8 h-8 text-[#121212] ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==== COMMUNITY & FOUNDERS SECTION ==== */}
            <section className="relative px-6 py-32 bg-[var(--bg-section)] border-t border-[var(--divider)]">
                <div className="max-w-7xl mx-auto text-center space-y-16">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-text-main">Meet The Community</h2>
                        <p className="text-text-muted max-w-2xl mx-auto">The pioneers building the internet&apos;s largest decentralized knowledge marketplace.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {/* Founder */}
                        <div className="flex flex-col items-center group">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--bg-card)] mb-6 shadow-[0_0_20px_rgba(245,178,26,0.15)] relative top-0 group-hover:-top-2 transition-all duration-300">
                                <Image src="/Me2.jpg" alt="Paritosh Dash" fill className="object-cover" />
                            </div>
                            <h4 className="text-xl font-heading font-bold text-text-main">Paritosh Dash</h4>
                            <p className="text-primary font-medium text-sm mb-3">Founder</p>
                            <p className="text-text-muted text-sm max-w-[200px]">Building the internet&apos;s decentralized knowledge marketplace.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==== FOOTER ==== */}
            <Footer />
        </main >
    );
}
