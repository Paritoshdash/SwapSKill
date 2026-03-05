import React from 'react';
import Link from 'next/link';
import { Avatar } from '@/components/ui/avatar';

export function JoinCtaSection() {
    return (
        <section className="w-[96vw] max-w-[1200px] mx-auto py-32 relative z-20 overflow-hidden bg-surface dark:bg-background/40 backdrop-blur-md rounded-[4rem] border border-divider dark:border-white/10 shadow-sm dark:shadow-3xl mb-12 mt-12">
            <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">

                <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-foreground leading-[0.9] tracking-tighter mb-8 max-w-4xl drop-shadow-2xl">
                    Join us in <br />
                    <span className="text-primary hover:text-secondary transition-colors cursor-crosshair">the &apos;burbs</span>
                </h2>

                <p className="text-secondary-text dark:text-muted text-lg md:text-xl font-medium max-w-xl mb-12 leading-relaxed">
                    Stop paying for bootcamps. Start trading your knowledge in the world&apos;s first peer-to-peer skill economy.
                </p>

                <Link href="/signup" className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-background bg-primary rounded-[20px] overflow-hidden transition-all shadow-[inset_0px_3px_6px_rgba(255,255,255,0.4),inset_0px_-3px_6px_rgba(0,0,0,0.15),0px_6px_15px_rgba(0,0,0,0.1)] hover:-translate-y-[1px] hover:shadow-[inset_0px_4px_8px_rgba(255,255,255,0.5),inset_0px_-4px_8px_rgba(0,0,0,0.2),0px_8px_20px_rgba(0,0,0,0.15)] active:translate-y-[2px] active:shadow-[inset_0px_2px_4px_rgba(255,255,255,0.3),inset_0px_-2px_4px_rgba(0,0,0,0.1),0px_2px_5px_rgba(0,0,0,0.1)] duration-300">
                    <span className="relative z-10 flex items-center gap-2 tracking-wide uppercase text-sm">
                        Start your journey <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </Link>

            </div>

            {/* Bottom avatars/faces patterned strip imitating the image's row of characters */}
            <div className="absolute bottom-[-10%] md:bottom-[-20%] left-0 w-full h-[200px] md:h-[400px] opacity-20 pointer-events-none flex items-end justify-center overflow-hidden">
                <div className="flex w-[200%] md:w-[150%] animate-[scroll_40s_linear_infinite] grayscale opacity-50">
                    {/* Repeating visual placeholder for crowd/faces */}
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-divider -ml-8 overflow-hidden shrink-0 bg-surface">
                            <Avatar name={`User ${i}`} className="w-full h-full text-2xl md:text-3xl" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-background to-transparent pointer-events-none z-10"></div>
        </section>
    );
}
