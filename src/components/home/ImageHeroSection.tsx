"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ImageHeroSection() {
    const containerRef = useRef<HTMLElement>(null);

    // Parallax setup based on scroll
    const { scrollY } = useScroll();

    // Different speed transforms for depth
    const yCardsFast = useTransform(scrollY, [0, 1000], [0, -150]);
    const yCardsSlow = useTransform(scrollY, [0, 1000], [0, -60]);
    const yCardsReverse = useTransform(scrollY, [0, 1000], [0, 80]);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        gsap.set('.hero-content > *', { opacity: 0, y: 30 });
        gsap.set('.floating-ui', { opacity: 0, scale: 0.9, y: 50 });

        tl.to(containerRef.current, { opacity: 1, duration: 0.5 })
            .to('.hero-content > *', {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'back.out(1.2)'
            })
            .to('.floating-ui', {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out'
            }, "-=0.8");

        // Continuous floating animation
        gsap.to('.float-slow', {
            y: "-=15",
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });

        gsap.to('.float-medium', {
            y: "+=20",
            duration: 4,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: 0.5
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="w-[96vw] max-w-[1400px] mx-auto relative flex flex-col items-center justify-start pt-32 pb-20 px-4 md:px-8 bg-background/40 backdrop-blur-md rounded-b-[3rem] border-x border-b border-white/5 shadow-2xl">

            {/* Headlines (Centered, bold, thick sans or serif) */}
            <div className="hero-content text-center max-w-5xl z-20 flex flex-col items-center">
                <h1 className="text-foreground font-heading font-black text-6xl md:text-[7vw] leading-[0.9] tracking-tighter capitalize drop-shadow-xl">
                    How <span className="text-primary italic font-serif relative">Creators<div className="absolute -bottom-2 left-0 w-full h-3 bg-primary/20 -rotate-2 rounded"></div></span> Grow<br />
                    <span className="text-foreground">Community.</span>
                </h1>

                <p className="mt-8 text-muted text-lg md:text-xl font-medium max-w-2xl px-4">
                    Trade your knowledge for new skills. No cash, just powerful peer-to-peer exchanges that accelerate your growth.
                </p>

                <Link
                    href="/signup"
                    className="mt-10 inline-flex items-center justify-center bg-primary hover:bg-secondary text-background px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(245,178,26,0.2)] hover:shadow-[0_0_30px_rgba(229,142,0,0.4)] hover:-translate-y-1 transform duration-300 pointer-events-auto"
                >
                    Start building free
                </Link>
            </div>

            {/* Floating UI Elements matching the image concept */}
            <div className="relative w-full max-w-5xl h-[400px] mt-16 z-10 hidden md:block perspective-1000">

                {/* Main Center Dashboard UI */}
                <motion.div
                    style={{ y: yCardsSlow }}
                    className="floating-ui float-slow absolute left-1/2 top-4 -translate-x-1/2 w-[60%] h-[300px] bg-card/80 backdrop-blur-xl border border-divider rounded-2xl shadow-2xl p-6 flex flex-col gap-4"
                >
                    {/* Fake UI Header */}
                    <div className="flex justify-between items-center border-b border-divider/50 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">JD</div>
                            <div>
                                <div className="h-4 w-24 bg-foreground/20 rounded mb-1"></div>
                                <div className="h-3 w-16 bg-muted/20 rounded"></div>
                            </div>
                        </div>
                        <div className="h-8 w-24 bg-primary/10 rounded-full border border-primary/30"></div>
                    </div>
                    {/* Fake UI Body */}
                    <div className="flex gap-4 h-full">
                        <div className="w-1/3 rounded-xl bg-background/50 flex flex-col gap-3 p-3">
                            <div className="h-8 w-full bg-divider/30 rounded"></div>
                            <div className="h-8 w-full bg-divider/30 rounded"></div>
                        </div>
                        <div className="w-2/3 rounded-xl bg-divider/10 border border-divider/50 p-4">
                            <div className="h-4 w-1/2 bg-foreground/10 rounded mb-4"></div>
                            <div className="h-24 w-full bg-primary/5 rounded-lg border border-primary/20"></div>
                        </div>
                    </div>
                </motion.div>

                {/* Small Left Card */}
                <motion.div
                    style={{ y: yCardsFast, rotate: -4 }}
                    className="floating-ui float-medium absolute left-[5%] top-[80px] w-[28%] h-[180px] bg-background/90 backdrop-blur border border-divider rounded-2xl shadow-xl p-4"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20"></div>
                        <div className="h-3 w-1/2 bg-foreground/20 rounded"></div>
                    </div>
                    <div className="w-full h-16 bg-divider/20 rounded-lg mb-2"></div>
                    <div className="h-3 w-2/3 bg-muted/20 rounded"></div>
                </motion.div>

                {/* Small Right Card */}
                <motion.div
                    style={{ y: yCardsReverse, rotate: 3 }}
                    className="floating-ui float-slow absolute right-[5%] top-[120px] w-[26%] h-[160px] bg-card/90 backdrop-blur border border-divider rounded-xl shadow-xl p-4 flex flex-col justify-between"
                >
                    <div className="flex justify-end mb-2">
                        <div className="w-6 h-6 rounded-full bg-green-500/20"></div>
                    </div>
                    <div>
                        <div className="h-4 w-full bg-foreground/20 rounded mb-2"></div>
                        <div className="h-4 w-4/5 bg-foreground/20 rounded"></div>
                    </div>
                </motion.div>

            </div>

        </section>
    );
}
