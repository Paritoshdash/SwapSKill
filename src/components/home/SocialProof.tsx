import React from 'react';

export function SocialProof() {
    return (
        <section className="py-16 border-y border-transparent bg-transparent relative z-10 w-full h-full flex flex-col justify-center">
            <div className="max-w-6xl mx-auto px-6 text-center w-full">
                <p className="text-sm font-semibold text-gray-500 mb-10 uppercase tracking-widest">
                    Trusted by learners and professionals from
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                    {/* Faking company logos using text for now */}
                    {['TCS', 'Infosys', 'Flipkart', 'Zomato', 'Cred'].map((company) => (
                        <span key={company} className="text-2xl md:text-3xl font-bold font-sans tracking-wide">
                            {company}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
