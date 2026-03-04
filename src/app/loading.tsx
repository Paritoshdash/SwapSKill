"use client";

import React from 'react';

export default function Loading() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background overflow-hidden transition-colors duration-300">
            <div className="relative w-64 h-32 flex items-center justify-center scale-150">
                <svg
                    viewBox="0 0 300 150"
                    className="w-full h-full filter drop-shadow-[0_0_15px_rgba(245,178,26,0.3)]"
                >
                    <defs>
                        <linearGradient id="infinity-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="var(--primary)" />
                            <stop offset="50%" stopColor="var(--secondary)" />
                            <stop offset="100%" stopColor="var(--primary)" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Background Path (Dull) */}
                    <path
                        d="M75,75 C75,25 125,25 150,75 C175,125 225,125 225,75 C225,25 175,25 150,75 C125,125 75,125 75,75"
                        fill="none"
                        stroke="currentColor"
                        strokeOpacity="0.05"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />

                    {/* Animated Glow Path */}
                    <path
                        d="M75,75 C75,25 125,25 150,75 C175,125 225,125 225,75 C225,25 175,25 150,75 C125,125 75,125 75,75"
                        fill="none"
                        stroke="url(#infinity-gradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        filter="url(#glow)"
                        className="animate-[infinity_3s_linear_infinite]"
                        strokeDasharray="150 450"
                    />
                </svg>

                {/* Center Glow */}
                <div className="absolute w-24 h-24 bg-primary/20 rounded-full blur-[60px] animate-pulse" />
            </div>

            <div className="mt-8 flex flex-col items-center">
                <p className="text-foreground/60 font-heading font-medium tracking-[0.3em] uppercase animate-pulse">
                    Loading
                    <span className="inline-flex w-12 text-left">
                        <span className="animate-[dots_1.5s_infinite_0s]">.</span>
                        <span className="animate-[dots_1.5s_infinite_0.3s]">.</span>
                        <span className="animate-[dots_1.5s_infinite_0.3s]">.</span>
                    </span>
                </p>
            </div>

            <style jsx>{`
                @keyframes dots {
                    0%, 100% { opacity: 0; transform: translateY(0); }
                    50% { opacity: 1; transform: translateY(-2px); }
                }
                @keyframes infinity {
                    0% {
                        stroke-dashoffset: 600;
                    }
                    100% {
                        stroke-dashoffset: 0;
                    }
                }
            `}</style>
        </div>
    );
}
