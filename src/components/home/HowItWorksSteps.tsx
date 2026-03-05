"use client";

import React from 'react';
import { Avatar } from '@/components/ui/avatar';

const steps = [
    {
        num: "Step 1",
        title: "List your skills",
        desc: "Create a profile detailing what you can teach and what you want to learn.",
        visual: (
            <div className="w-full h-full bg-divider/10 rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden border border-divider/50 shadow-inner">
                <div className="flex gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 shrink-0"></div>
                    <div className="w-full h-8 bg-divider/20 rounded-md"></div>
                </div>
                <div className="flex gap-2 mt-auto">
                    <div className="h-6 w-1/3 bg-blue-500/20 rounded-full border border-blue-500/30"></div>
                    <div className="h-6 w-1/4 bg-purple-500/20 rounded-full border border-purple-500/30"></div>
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                </div>
            </div>
        )
    },
    {
        num: "Step 2",
        title: "Match & connect",
        desc: "Our algorithm finds users with exact complementary needs.",
        visual: (
            <div className="w-full h-full bg-divider/10 rounded-xl p-4 flex items-center justify-center relative overflow-hidden border border-divider/50 shadow-inner">
                {/* Match UI */}
                <div className="relative w-[150px] h-[150px]">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_20s_linear_infinite]" opacity="0.3" />
                    </svg>
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-background border-2 border-primary z-10 overflow-hidden"><Avatar name="U 1" className="w-full h-full text-xs" /></div>
                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-background border-2 border-secondary z-10 overflow-hidden"><Avatar name="U 2" className="w-full h-full text-xs" /></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-background font-bold text-[10px] px-2 py-1 rounded-full z-20 shadow-[0_0_10px_rgba(245,178,26,0.5)]">
                        MATCH
                    </div>
                    {/* Connecting line */}
                    <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
                        <line x1="30" y1="30" x2="70" y2="70" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3 3" />
                    </svg>
                </div>
            </div>
        )
    },
    {
        num: "Step 3",
        title: "Swap & grow",
        desc: "Schedule sessions using our built-in video and tracking tools.",
        visual: (
            <div className="w-full h-full bg-divider/10 rounded-xl p-4 flex flex-col relative overflow-hidden border border-divider/50 shadow-inner">
                <div className="w-full h-1/2 bg-card rounded-lg mb-2 relative flex items-center justify-center opacity-80 border border-divider">
                    <span className="text-secondary/50 text-3xl">▶</span>
                    <div className="absolute bottom-2 left-2 text-[8px] bg-foreground/50 px-1 rounded text-background font-mono">00:45:12</div>
                </div>
                <div className="flex gap-2 mt-auto">
                    <div className="w-6 h-6 rounded-full bg-background flex items-center justify-center text-[10px]">🎤</div>
                    <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-[10px] border border-red-500/30">📞</div>
                </div>
            </div>
        )
    }
];

export function HowItWorksSteps() {
    return (
        <section className="w-[96vw] max-w-[1400px] mx-auto py-24 relative z-20 bg-surface dark:bg-background/40 backdrop-blur-md transition-all duration-500 rounded-[3rem] border border-divider dark:border-white/5 shadow-md dark:shadow-2xl mb-12 mt-12 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center md:text-left">

                <h2 className="text-5xl md:text-6xl lg:text-[7vw] font-heading font-black text-foreground leading-[0.85] tracking-tighter mb-16">
                    Here&apos;s how <span className="text-primary italic">it works</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {steps.map((step, i) => (
                        <div key={i} className="bg-card rounded-[32px] p-8 md:p-10 border border-divider shadow-sm hover:shadow-lg hover:border-primary/20 hover:-translate-y-2 transition-all duration-300 group min-h-[450px] flex flex-col justify-between">

                            <div className="mb-10 text-left">
                                <span className="inline-block px-3 py-1 bg-surface rounded-full text-xs font-bold text-foreground mb-6 border border-divider">{step.num}</span>
                                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors">{step.title}</h3>
                                <p className="text-secondary-text dark:text-muted font-medium text-[15px] leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>

                            <div className="h-[200px] w-full mt-auto rounded-xl overflow-hidden group-hover:scale-[1.03] transition-transform duration-500 origin-bottom">
                                {step.visual}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
