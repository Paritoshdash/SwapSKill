"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const testimonials = [
    {
        quote: "Swapping Python lessons for Digital Marketing completely transformed my startup's trajectory without costing a single rupee.",
        author: "Priya Sharma",
        role: "Technical Founder",
        avatar: "https://i.pravatar.cc/150?img=5",
        offset: "md:mt-0 md:ml-0" // Top right
    },
    {
        quote: "The quality of peers on SwapSkill is unmatched. I've built a network of ambitious professionals while learning UI/UX design.",
        author: "Rahul Verma",
        role: "Frontend Developer",
        avatar: "https://i.pravatar.cc/150?img=11",
        offset: "md:mt-32 md:-ml-12" // Middle left
    },
    {
        quote: "I never thought I could trade my Spanish skills for AWS architecture help. This platform is a game-changer.",
        author: "Elena Rodriguez",
        role: "Language Architect",
        avatar: "https://i.pravatar.cc/150?img=3",
        offset: "md:mt-64 md:ml-24" // Bottom right
    }
];

export function ScatteredTestimonials() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Different parallax speeds for cards based on index
    const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [200, -50]);
    const y3 = useTransform(scrollYProgress, [0, 1], [50, -200]);

    const transforms = [y1, y2, y3];

    return (
        <section ref={containerRef} className="w-full py-24 px-4 md:px-12 relative z-20">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                {/* Left Column: Big Bold Text */}
                <div className="lg:col-span-5 sticky top-32">
                    <h2 className="text-6xl md:text-[8vw] lg:text-[7vw] font-heading font-black text-white leading-[0.8] tracking-tighter uppercase mb-4">
                        OUR <br />
                        <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">CUSTOMER</span><br />
                        <span className="text-[#a0a0a0]">S</span> <br />
                        <span className="text-white inline-flex items-center gap-2">
                            <span className="text-primary italic">L</span>
                            <div className="w-[1em] h-[1em] rounded-full bg-primary flex items-center justify-center text-[0.4em] rotate-12 drop-shadow-[0_0_15px_rgba(245,178,26,0.3)]"><span className="animate-pulse">🤝</span></div>
                            <span className="text-primary italic">VE US.</span>
                        </span>
                    </h2>
                </div>

                {/* Right Column: Scattered Cards Layout imitating image's cascading arrangement */}
                <div className="lg:col-span-7 relative h-auto min-h-[800px] flex flex-col md:block mt-12 lg:mt-0 gap-6">

                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            style={{ y: transforms[i] }}
                            className={`relative md:absolute w-full md:w-[450px] bg-[var(--bg-card)] p-8 rounded-[24px] border border-white/5 shadow-2xl hover:border-primary/30 transition-colors duration-300 group hover:-translate-y-2 z-${30 - i * 10} ${t.offset}`}
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                                    <img src={t.avatar} alt={t.author} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">{t.author}</h4>
                                    <p className="text-sm text-text-muted">{t.role}</p>
                                </div>
                            </div>
                            <p className="text-[17px] leading-relaxed text-[#c0c0c0] font-serif group-hover:text-white transition-colors">
                                &quot;{t.quote}&quot;
                            </p>

                            {/* Decorative quote mark */}
                            <div className="absolute top-6 right-6 text-6xl text-white/5 font-serif leading-none select-none pointer-events-none group-hover:text-primary/10 transition-colors">
                                &quot;
                            </div>
                        </motion.div>
                    ))}

                </div>

            </div>
        </section>
    );
}
