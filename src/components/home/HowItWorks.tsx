import React from 'react';

const steps = [
    {
        number: "01",
        title: "Create Your Profile",
        description: "List the skills you have to offer and the skills you want to learn. Our verified endorsement system ensures quality matches."
    },
    {
        number: "02",
        title: "Get Smart Matched",
        description: "Our algorithm finds users with complementary needs. E.g., You teach them React, they teach you UX design."
    },
    {
        number: "03",
        title: "Swap & Grow",
        description: "Schedule sessions using our built-in video and collaboration tools. Build your portfolio while expanding your capabilities."
    }
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-white px-6 w-full h-full flex flex-col justify-center">
            <div className="max-w-6xl mx-auto w-full">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#111111] tracking-tight mb-4">
                        How SwapSkill Works
                    </h2>
                    <p className="text-lg text-gray-500 max-w-xl mx-auto">
                        A frictionless process to turn your existing knowledge into new capabilities.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 relative">
                    {/* Connector Line for Desktop */}
                    <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-gray-100 z-0"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="flex-1 relative z-10 flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-full bg-white border-4 border-gray-100 flex items-center justify-center text-lg font-bold font-serif shadow-sm text-[#111111] mb-6">
                                {step.number}
                            </div>
                            <h3 className="text-xl font-medium text-[#111111] mb-3">{step.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
