"use client";

import React from 'react';

const categories = [
    { name: 'Google Workspace', tag: 'Productivity', logo: 'G', color: 'from-[#ffffff] to-[#f0f0f0]', text: 'text-gray-800' },
    { name: 'Framer Motion', tag: 'Animation', logo: 'FM', color: 'from-[#ff4181] to-[#ff0055]', text: 'text-white' },
    { name: 'React Native', tag: 'Mobile Dev', logo: 'RN', color: 'from-[#1a1c20] to-[#121212]', text: 'text-white' },
    { name: 'Stripe', tag: 'Payments', logo: 'S', color: 'from-[#635bff] to-[#4b43e6]', text: 'text-white' },
    { name: 'TailwindCSS', tag: 'Design', logo: 'TW', color: 'from-[#0ea5e9] to-[#0284c7]', text: 'text-white' },
    { name: 'Discord', tag: 'Community', logo: 'D', color: 'from-[#5865F2] to-[#4752c4]', text: 'text-white' },
    { name: 'Slack', tag: 'Communication', logo: 'SL', color: 'from-[#4A154B] to-[#360d37]', text: 'text-white' },
];

export function PopularCategories() {
    return (
        <section className="w-full py-24 relative z-20">
            {/* Dark container for Integrations/Categories imitating the image's dark block */}
            <div className="max-w-[1400px] mx-auto bg-black rounded-[40px] md:rounded-[60px] p-8 md:p-16 border border-white/5 shadow-2xl relative overflow-hidden">

                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjAzIi8+PC9zdmc+')] [mask-image:linear-gradient(to_bottom_left,black,transparent)] pointer-events-none"></div>

                <div className="relative z-10 max-w-2xl mb-16">
                    <h2 className="text-4xl md:text-6xl font-heading font-black text-primary leading-[0.9] tracking-tighter mb-4">
                        Integrations <br />
                        <span className="text-white">We&apos;ve got &apos;em</span>
                    </h2>
                    <p className="text-text-muted text-lg font-medium">
                        Don&apos;t worry, you can still use the tools you&apos;re already using. Learn alongside your favorite stack.
                    </p>
                </div>

                {/* Grid imitating the colorful app integrations block */}
                <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {categories.map((cat, i) => (
                        <div
                            key={i}
                            className={`bg-gradient-to-br ${cat.color} ${cat.text} rounded-[24px] p-6 flex flex-col justify-between h-[180px] hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 cursor-pointer border border-white/10`}
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center font-bold text-xl shadow-inner border border-white/20">
                                {cat.logo}
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-1">{cat.name}</h4>
                                <p className="text-xs opacity-70 font-medium uppercase tracking-widest">{cat.tag}</p>
                            </div>
                        </div>
                    ))}

                    {/* Ghost card for "More" */}
                    <div className="bg-[var(--bg-card)] rounded-[24px] p-6 flex flex-col items-center justify-center h-[180px] hover:bg-white/5 transition-all duration-300 cursor-pointer border border-dashed border-white/20 group">
                        <span className="text-3xl text-text-muted group-hover:text-primary mb-2 transition-colors">+</span>
                        <h4 className="font-bold text-text-main group-hover:text-white transition-colors">View All</h4>
                    </div>
                </div>

                {/* Bottom Pattern */}
                <div className="absolute -bottom-10 left-0 w-full h-[150px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none opacity-50"></div>
            </div>

        </section>
    );
}
