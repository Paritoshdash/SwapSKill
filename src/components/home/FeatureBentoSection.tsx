"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Avatar } from '@/components/ui/avatar';
import { TextReveal } from '@/components/magicui/text-reveal';

export function FeatureBentoSection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax values for inner elements
    const yCards = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const yGraph = useTransform(scrollYProgress, [0, 1], [80, -80]);

    return (
        <section ref={containerRef} className="w-[96vw] max-w-[1400px] mx-auto py-20 px-4 md:px-8 relative z-20 bg-background/40 backdrop-blur-md text-foreground transition-all duration-500 rounded-[3rem] border border-white/5 shadow-2xl mb-12 mt-12 overflow-hidden">
            {/* Main Rounded Container */}
            <div className="max-w-[1400px] mx-auto p-8 md:p-16">

                <div className="mb-16">
                    <TextReveal
                        text="Connect with your peers while we get busy in the background."
                        className="bg-transparent"
                    />
                </div>

                {/* Bento Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

                    {/* Bento Card 1: Smart Matching */}
                    <div className="bg-card rounded-[32px] p-8 flex flex-col justify-between group overflow-hidden border border-divider hover:border-primary/30 transition-all duration-500 min-h-[400px] shadow-sm">
                        <div>
                            <h3 className="text-2xl font-bold text-foreground mb-3 font-heading">Precision Matching Algorithm</h3>
                            <p className="text-muted leading-relaxed">
                                Our platform analyzes your offered skills and learning goals to pair you with the perfect exchange partner in seconds.
                            </p>
                        </div>

                        {/* Visual for Card 1 - Fake Match UI */}
                        <motion.div
                            style={{ y: yCards }}
                            className="mt-8 bg-surface rounded-2xl p-4 border border-divider shadow-inner relative transform group-hover:scale-[1.02] transition-transform duration-500"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex -space-x-3">
                                    <Avatar name="User A" className="w-10 h-10 border-2 border-surface text-sm" />
                                    <Avatar name="User B" className="w-10 h-10 border-2 border-surface text-sm" />
                                </div>
                                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">98% Match</span>
                            </div>
                            <div className="space-y-3">
                                <div className="bg-divider/10 h-12 rounded-xl w-full flex items-center px-4 gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div className="h-2 w-1/3 bg-muted/30 rounded"></div>
                                </div>
                                <div className="bg-divider/10 h-12 rounded-xl w-full flex items-center px-4 gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <div className="h-2 w-1/2 bg-muted/30 rounded"></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bento Card 2: Structured Sessions */}
                    <div className="bg-card rounded-[32px] p-8 flex flex-col justify-between group overflow-hidden border border-divider hover:border-secondary/30 transition-all duration-500 min-h-[400px] shadow-sm">
                        <div>
                            <div className="flex gap-2 mb-4">
                                <span className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">📹</span>
                                <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">📅</span>
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-3 font-heading">Structured Video Sessions</h3>
                            <p className="text-muted leading-relaxed">
                                Built-in scheduling, high-quality video rooms, and collaborative notes ensure your hour is productive and organized.
                            </p>
                        </div>

                        {/* Visual for Card 2 - Fake Video UI */}
                        <motion.div
                            style={{ y: yCards }}
                            className="mt-8 bg-surface rounded-2xl border border-divider shadow-inner h-48 relative overflow-hidden flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500"
                        >
                            {/* Fake Video Grid */}
                            <div className="absolute inset-2 grid grid-cols-2 gap-2">
                                <div className="bg-divider/10 rounded-xl relative overflow-hidden">
                                    <div className="absolute bottom-2 left-2 text-[10px] bg-foreground/80 px-2 py-0.5 rounded text-background">You</div>
                                </div>
                                <div className="bg-divider/20 rounded-xl relative overflow-hidden">
                                    <div className="absolute bottom-2 left-2 text-[10px] bg-foreground/80 px-2 py-0.5 rounded text-background">Partner</div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/20 animate-ping"></div>
                                </div>
                            </div>
                            {/* Fake Controls */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-foreground/10 p-2 rounded-full backdrop-blur border border-border-subtle">
                                <div className="w-6 h-6 rounded-full bg-foreground/5"></div>
                                <div className="w-6 h-6 rounded-full bg-foreground/5"></div>
                                <div className="w-6 h-6 rounded-full bg-red-500/80"></div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bento Card 3: Full Width (Portfolio) */}
                    <div className="md:col-span-2 bg-gradient-to-r from-card to-surface rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between group border border-divider hover:border-primary/20 transition-all duration-500 overflow-hidden shadow-sm">
                        <div className="md:w-1/2 mb-8 md:mb-0 relative z-10">
                            <h3 className="text-3xl font-bold text-foreground mb-4 font-heading">Build an irrefutable portfolio.</h3>
                            <p className="text-muted leading-relaxed mb-6">
                                Every verified swap acts as a peer endorsement. Prove you know your stuff not with certificates, but with real-world teaching and learning experiences tracked on your profile.
                            </p>
                            <Link href="/signup" className="text-primary font-bold hover:text-secondary underline underline-offset-4 decoration-primary/30 transition-colors">
                                Learn how it works &rarr;
                            </Link>
                        </div>

                        {/* Visual for Card 3 - Flow graph / Nodes */}
                        <div className="md:w-[45%] h-56 w-full relative">
                            {/* Abstract connection lines mimicking the "graphs" */}
                            <motion.div style={{ x: yGraph }} className="absolute inset-0 max-w-sm mx-auto">
                                {/* SVG Path mimicking connections */}
                                <svg width="100%" height="100%" viewBox="0 0 400 200" className="opacity-30 group-hover:opacity-60 transition-opacity duration-1000">
                                    <path d="M 50 100 Q 120 -20, 200 100 T 350 100" fill="transparent" stroke="var(--primary)" strokeWidth="3" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" />
                                    <path d="M 50 100 Q 150 250, 250 100 T 380 50" fill="transparent" stroke="var(--secondary)" strokeWidth="2" />
                                </svg>

                                {/* Node points */}
                                <div className="absolute top-[80px] left-[30px] w-10 h-10 rounded-full bg-surface border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(245,178,26,0.5)] z-10 overflow-hidden"><Avatar name="Node 1" className="w-full h-full text-xs" /></div>
                                <div className="absolute top-[10px] left-[180px] bg-surface border border-divider px-3 py-1 rounded-lg shadow-lg z-10 text-xs font-bold text-foreground">JavaScript</div>
                                <div className="absolute top-[160px] left-[140px] w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.3)] z-10">
                                    <span className="text-[10px] text-blue-500 font-bold">React</span>
                                </div>
                                <div className="absolute top-[80px] right-[40px] w-12 h-12 rounded-full bg-surface border-2 border-secondary flex items-center justify-center shadow-[0_0_15px_rgba(229,142,0,0.5)] z-10 overflow-hidden"><Avatar name="Node 2" className="w-full h-full text-xs" /></div>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
