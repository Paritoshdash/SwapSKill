import React from 'react';

export function ProblemSolution() {
    return (
        <section className="py-24 md:py-32 px-6 w-full h-full flex items-center justify-center bg-transparent">
            <div className="max-w-6xl mx-auto w-full">
                <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-start">

                    {/* Problem Section */}
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl md:text-5xl font-serif text-gray-400 leading-tight">
                            Learning is expensive, isolated, and inefficient.
                        </h2>
                        <p className="text-lg text-gray-500 max-w-md">
                            Traditional courses and bootcamps cost lakhs of rupees, lack personalized 1-on-1 mentorship, and leave you disconnected from real-world practitioners.
                        </p>
                    </div>

                    {/* Divider visible on desktop */}
                    <div className="hidden md:block w-px h-64 bg-gray-200"></div>

                    {/* Solution Section */}
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl md:text-5xl font-serif text-[#111111] leading-tight">
                            A peer-to-peer economy where skills are currency.
                        </h2>
                        <p className="text-lg text-gray-700 max-w-md">
                            Trade your expertise for the skills you want to learn. SwapSkill matches you with ambitious peers for structured, mutually beneficial learning sessions—completely free from financial barriers.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
