import React from 'react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-transparent flex flex-col md:flex-row items-center justify-between pt-24 overflow-hidden pointer-events-none">
      {/* Left Column: Copy */}
      <div className="w-full md:w-1/2 min-h-[60vh] md:min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 z-10 pointer-events-auto bg-transparent">
        <p className="text-gray-500 font-medium text-lg lg:text-xl tracking-wide uppercase mb-6">
          Skill Exchange
        </p>

        <h1 className="text-black font-extrabold text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter mb-8 max-w-2xl drop-shadow-sm">
          TRADE YOUR<br />
          SKILLS NOT<br />
          MONEY
        </h1>

        <p className="text-gray-800 text-lg md:text-xl font-medium max-w-lg mb-10 leading-relaxed drop-shadow-sm">
          Waiting&apos;s overrated. Grow your skills faster by swapping what you know for what you want to learn, with instant access.
        </p>

        <div>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center bg-[#1a1a1a] hover:bg-black text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors hover:scale-105 transform duration-300 pointer-events-auto"
          >
            Start swapping
          </Link>
        </div>
      </div>

      {/* Right Column: Frame Sequence shines through from the fixed global background */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative z-0">
      </div>
    </section>
  );
}