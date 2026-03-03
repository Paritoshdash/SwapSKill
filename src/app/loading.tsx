"use client";

import React from 'react';

export default function Loading() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
            <div className="relative w-64 h-32 flex items-center justify-center scale-150">
                <svg
                    viewBox="0 0 300 150"
                    className="w-full h-full filter drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                >
                    <defs>
                        <linearGradient id="infinity-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#a855f7" />
                            <stop offset="50%" stopColor="#ec4899" />
                            <stop offset="100%" stopColor="#a855f7" />
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
                        stroke="rgba(255,255,255,0.05)"
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

            <style jsx>{`
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
