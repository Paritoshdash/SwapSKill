"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { BackgroundAnimation } from './BackgroundAnimation';

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Ensure elements are hidden before animating
    gsap.set('.hero-element', { opacity: 0, y: 40 });

    tl.to(containerRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'power2.inOut',
    })
      .to('.hero-element', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'back.out(1.2)'
      }, "-=0.5");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[85vh] bg-[var(--bg-card)] border border-[var(--divider)] rounded-[40px] md:rounded-[60px] flex flex-col justify-between p-8 md:p-14 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] mt-12 mb-12 opacity-0">

      {/* The 3D Animation Layer (scoped to this container) */}
      <BackgroundAnimation />

      {/* Top Text */}
      <div className="relative z-10 w-full flex justify-between items-start hero-element">
        <h1 className="text-text-main font-heading font-black text-6xl md:text-[8vw] leading-[0.85] tracking-tighter uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
          TRADE YOUR<br /><span className="text-primary drop-shadow-[0_0_15px_rgba(245,178,26,0.3)]">SKILLS</span>
        </h1>

        <p className="hidden md:block max-w-[220px] text-text-muted font-medium text-sm drop-shadow bg-bg-base/50 border border-divider backdrop-blur-md p-4 rounded-xl ml-4">
          Waiting&apos;s overrated. Swap what you know for what you want to learn, with instant access.
        </p>
      </div>

      {/* Middle Pills array */}
      <div className="relative z-10 flex flex-wrap gap-2 md:gap-4 justify-end items-center my-8 ml-auto hero-element">
        {['FRONTEND', 'DESIGN', 'MARKETING', 'BACKEND'].map((tag) => (
          <div key={tag} className="px-5 py-2 rounded-full border border-primary text-primary text-xs md:text-sm font-semibold uppercase backdrop-blur-sm bg-primary/5 hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(245,178,26,0.2)] transition-all duration-300 cursor-default">
            {tag}
          </div>
        ))}
      </div>

      {/* Bottom Text and CTA */}
      <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-6 hero-element">
        <div>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center bg-primary hover:bg-secondary text-[#121212] px-8 py-4 rounded-[12px] font-bold text-sm tracking-wide transition-all shadow-[0_0_15px_rgba(245,178,26,0.3)] hover:shadow-[0_0_25px_rgba(229,142,0,0.5)] transform duration-300 pointer-events-auto active:scale-[0.98]"
          >
            Start swapping ✨
          </Link>
        </div>
        <h1 className="text-text-main font-heading font-black text-6xl md:text-[8vw] leading-[0.8] tracking-tighter uppercase text-right drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
          <span className="text-primary opacity-90 drop-shadow-[0_0_15px_rgba(245,178,26,0.2)]">NOT MONEY</span>
        </h1>
      </div>

    </section>
  );
}