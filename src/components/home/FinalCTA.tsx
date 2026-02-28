import React from 'react';
import { Button } from '@/components/ui/Button';

export function FinalCTA() {
    return (
        <section className="py-32 px-6 bg-transparent text-white drop-shadow-md overflow-hidden relative w-full h-full flex flex-col justify-center items-center">
            {/* Premium Subtle Gradient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-[#fb8a9f]/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
                <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-8">
                    Your Skills Are <br className="hidden md:block" /> an Asset.
                </h2>
                <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Stop paying for expensive courses. Start trading your expertise for the knowledge you need to succeed.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button href="/signup" variant="primary" size="lg" className="px-12 py-4 text-lg">
                        Join SwapSkill Free
                    </Button>
                </div>
            </div>
        </section>
    );
}
