"use client";

import React from 'react';
import { Avatar } from '@/components/ui/Avatar';

const LOGOS = [
    'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Spotify', 'Twitter', 'Stripe', 'Airbnb'
];

export function QuoteTickerSection() {
    return (
        <section className="w-full py-16 overflow-hidden flex flex-col items-center justify-center relative z-20">

            {/* Ticker Tape mimicking the '100+ Companies' strip */}
            <div className="w-full bg-black/40 backdrop-blur-md border-y border-white/10 py-4 flex overflow-hidden">
                <div className="flex animate-[scroll_20s_linear_infinite] whitespace-nowrap min-w-max">
                    {/* Double the logos for seamless loop */}
                    {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
                        <div key={i} className="flex items-center gap-8 mx-8 opacity-40 hover:opacity-100 transition-opacity cursor-default">
                            <span className="text-xl font-bold font-heading text-white tracking-widest uppercase">{logo}</span>
                            <div className="w-2 h-2 rounded-full bg-primary/50"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quote Layout mimicking the stacked avatars and large text quote */}
            <div className="mt-24 max-w-4xl px-4 text-center flex flex-col items-center relative z-10">

                {/* Overlapping Avatars */}
                <div className="flex -space-x-4 mb-8">
                    <Avatar name="Sarah Jenkins" className="w-16 h-16 border-4 border-[var(--bg-base)] z-30 shadow-xl" />
                    <Avatar name="John Doe" className="w-16 h-16 border-4 border-[var(--bg-base)] z-20 shadow-xl scale-95 opacity-90" />
                    <Avatar name="Alice Smith" className="w-16 h-16 border-4 border-[var(--bg-base)] z-10 shadow-xl scale-90 opacity-70" />
                </div>

                {/* Large Quote */}
                <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight font-medium">
                    &quot;SwapSkill made me realize my React skills were worth exactly the Spanish lessons I couldn&apos;t afford. <span className="text-primary italic">The purest form of learning.</span>&quot;
                </h2>

                <div className="mt-8 flex flex-col items-center">
                    <span className="text-white font-bold tracking-wide uppercase">Sarah Jenkins</span>
                    <span className="text-text-muted text-sm mt-1 border border-divider rounded-full px-3 py-1">Senior Frontend Engineer</span>
                </div>
            </div>

        </section>
    );
}
