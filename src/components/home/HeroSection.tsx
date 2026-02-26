import React from 'react';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[800px] flex flex-col items-center justify-center bg-gradient-to-b from-[#020617] via-[#0f172a] to-black overflow-hidden pt-20">
      {/* Video Element */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/main.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/30 to-black/70"></div>

      {/* HTML Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-32 pointer-events-none">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto animate-fade-in-up">
          <Button href="/signup" variant="primary" className="w-full sm:w-auto px-10 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Get Started Free
          </Button>
          <Button href="#how-it-works" variant="outline" className="w-full sm:w-auto px-10 text-white border-white/20 hover:bg-white/10 backdrop-blur-md">
            See How It Works
          </Button>
        </div>

        {/* Decorative quick links */}
        <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-1 p-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-sm font-medium animate-fade-in-up pointer-events-auto shadow-[0_0_30px_rgba(0,136,255,0.15)]">
          <span className="px-4 py-2 flex items-center gap-2 text-gray-300">
            <span className="text-xl">🎓</span> Find Mentors
          </span>
          <span className="w-px h-4 bg-white/20 hidden sm:block"></span>
          <span className="px-4 py-2 flex items-center gap-2 text-gray-300">
            <span className="text-xl">🌟</span> Verified Skills
          </span>
          <span className="w-px h-4 bg-white/20 hidden sm:block"></span>
          <span className="px-4 py-2 flex items-center gap-2 text-gray-300">
            <span className="text-xl">🤝</span> 1-on-1 Sessions
          </span>
        </div>
      </div>
    </section>
  );
}