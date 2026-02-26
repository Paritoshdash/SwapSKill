import React from 'react';

const testimonials = [
    {
        quote: "I traded my knowledge of Python for advanced digital marketing strategies. SwapSkill completely transformed my startup's trajectory without costing a single rupee.",
        author: "Priya Sharma",
        role: "Technical Founder",
        avatar: "PS"
    },
    {
        quote: "The quality of peers on SwapSkill is unmatched. I've built a network of ambitious professionals while learning UI/UX design from an absolute master.",
        author: "Rahul Verma",
        role: "Frontend Developer",
        avatar: "RV"
    }
];

export function Testimonials() {
    return (
        <section className="py-24 bg-[#faf9f8] px-6 border-y border-gray-200/50 w-full h-full flex flex-col justify-center">
            <div className="max-w-6xl mx-auto w-full">

                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif text-[#111111] tracking-tight">
                        Loved by ambitious learners.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((t, index) => (
                        <div key={index} className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                            <p className="text-lg md:text-xl text-gray-700 font-serif italic mb-8 leading-relaxed">
                                "{t.quote}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                                    {t.avatar}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{t.author}</h4>
                                    <p className="text-sm text-gray-500">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
