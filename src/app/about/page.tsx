import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white pt-24 font-inter">

            {/* ==== HERO SECTION (MISSION & VISION) ==== */}
            <section className="relative px-6 py-20 md:py-32 max-w-7xl mx-auto flex flex-col items-center justify-center text-center overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full point-events-none" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full point-events-none" />

                <div className="relative z-10 space-y-8 max-w-4xl animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500 pb-2">
                        Knowledge is meant to be <span className="text-purple-400">shared.</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                        Our mission is to democratize education by creating a global marketplace where anyone can trade what they know for what they want to learn. No money, just pure skill-for-skill exchange.
                    </p>
                    <div className="pt-8">
                        <Link href="/signup" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                            Join the Movement
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ==== HOW IT WORKS SECTION (3 STEPS) ==== */}
            <section className="relative border-t border-white/10 bg-[#111111] px-6 py-32">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <h2 className="text-purple-500 font-semibold tracking-wider uppercase text-sm mb-3">The Process</h2>
                        <h3 className="text-4xl md:text-5xl font-bold">How SwapSkill Works</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop Only) */}
                        <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-purple-600/0 via-purple-600/50 to-blue-600/0 -translate-y-1/2 z-0" />

                        {/* Step 1 */}
                        <div className="relative z-10 flex flex-col items-center text-center group bg-[#1a1a1a] p-10 rounded-[2rem] border border-white/5 hover:border-purple-500/30 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(147,51,234,0.1)]">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-8 shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform">
                                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </div>
                            <h4 className="text-2xl font-bold mb-4">1. Offer a Skill</h4>
                            <p className="text-gray-400 leading-relaxed">List what you know. It could be coding, guitar, conversational Spanish, or marketing. Everyone is an expert at something.</p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative z-10 flex flex-col items-center text-center group bg-[#1a1a1a] p-10 rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)]">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-8 shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform">
                                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            </div>
                            <h4 className="text-2xl font-bold mb-4">2. Find a Match</h4>
                            <p className="text-gray-400 leading-relaxed">Browse the marketplace to find someone who offers what you want to learn, and is looking for what you teach.</p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative z-10 flex flex-col items-center text-center group bg-[#1a1a1a] p-10 rounded-[2rem] border border-white/5 hover:border-emerald-500/30 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)]">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform">
                                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                            </div>
                            <h4 className="text-2xl font-bold mb-4">3. Meet & Learn</h4>
                            <p className="text-gray-400 leading-relaxed">Connect via our messaging system to coordinate a video call or in-person meetup. Swap hours, learn, and review!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==== VIDEO DEMO PLACEHOLDER ==== */}
            <section className="relative px-6 py-32 bg-[#0a0a0a]">
                <div className="max-w-5xl mx-auto text-center space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold">See It In Action</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Watch a 2-minute demonstration of how easily communities are growing through transparent skill exchanges.</p>
                    </div>

                    <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/10 group cursor-pointer shadow-[0_0_50px_rgba(255,255,255,0.05)] bg-[#111]">
                        {/* Placeholder gradient mimicking a blurry video thumbnail */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-[#0a0a0a] blur-xl opacity-60 transition-opacity group-hover:opacity-100" />

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110">
                            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-2xl">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==== COMMUNITY & FOUNDERS SECTION ==== */}
            <section className="relative px-6 py-32 bg-[#111111] border-t border-white/10">
                <div className="max-w-7xl mx-auto text-center space-y-16">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold">Meet The Community</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">The pioneers building the internet&apos;s largest decentralized knowledge marketplace.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {/* Founder */}
                        <div className="flex flex-col items-center group">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#1a1a1a] mb-6 shadow-xl relative top-0 group-hover:-top-2 transition-all duration-300">
                                <Image src="/Me2.jpg" alt="Paritosh Dash" fill className="object-cover" />
                            </div>
                            <h4 className="text-xl font-bold">Paritosh Dash</h4>
                            <p className="text-purple-400 font-medium text-sm mb-3">Founder</p>
                            <p className="text-gray-500 text-sm max-w-[200px]">Building the internet's decentralized knowledge marketplace.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==== FOOTER ==== */}
            <Footer />
        </main >
    );
}
