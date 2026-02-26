'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';

const faqs = [
    {
        question: "How do I offer a skill on SwapSkill?",
        answer: "To offer a skill, simply create an account, go to your Dashboard, and click 'Offer a Skill'. Fill in the details about what you can teach, your experience level, and what skills you're hoping to learn in return. Our matching algorithm handles the rest."
    },
    {
        question: "How do I find someone to swap with?",
        answer: "You can use the search bar on the 'Browse Skills' page to look for specific topics. Alternatively, the platform will automatically suggest \"Matches\" on your Dashboard based on users who want to learn what you teach, and teach what you want to learn."
    },
    {
        question: "Is SwapSkill completely free?",
        answer: "Yes! There is no currency exchanged on SwapSkill. The entire platform operates on a strict time-for-time skill barter system, ensuring education remains democratized."
    },
    {
        question: "How do video calls work?",
        answer: "We offer built-in, secure WebRTC video calls directly within the messaging interface so you don't need to share your personal phone number or Zoom links until you feel comfortable."
    },
    {
        question: "What are your Trust & Safety guidelines?",
        answer: "We mandate verifiable email registration, offer a community-driven rating and review system after each swap, and restrict inappropriate content. Always keep early conversations on the platform, and report suspicious behavior immediately via the flag icon on any user profile."
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white pt-24 font-inter">

            {/* ==== HERO SECTION ==== */}
            <section className="relative px-6 py-24 md:py-32 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full point-events-none" />

                <div className="relative z-10 space-y-6 max-w-3xl animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        How can we <span className="text-blue-400">help</span> you today?
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                        Search for a topic or browse our support articles and core FAQs below to make the most of SwapSkill.
                    </p>

                    {/* Mock Search Bar */}
                    <div className="pt-6 w-full max-w-xl mx-auto">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search articles, guides, and FAQs..."
                                className="w-full bg-[#111111] border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ==== HELP ARTICLES GRID ==== */}
            <section className="relative px-6 py-16 bg-[#0d0d0d] border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Article Card 1 */}
                        <Link href="#" className="flex items-start gap-4 p-6 rounded-2xl bg-[#111111] border border-white/5 hover:border-blue-500/30 hover:bg-[#161616] transition-all group">
                            <div className="w-12 h-12 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">Getting Started</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">Learn how to create your first offer, browse the marketplace, and prepare for your first skill swap.</p>
                            </div>
                        </Link>

                        {/* Article Card 2 */}
                        <Link href="#" className="flex items-start gap-4 p-6 rounded-2xl bg-[#111111] border border-white/5 hover:border-purple-500/30 hover:bg-[#161616] transition-all group">
                            <div className="w-12 h-12 shrink-0 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">Trust & Safety</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">Guidelines on safe swapping, our verification process, community standards, and handling disputes.</p>
                            </div>
                        </Link>

                        {/* Article Card 3 */}
                        <Link href="#" className="flex items-start gap-4 p-6 rounded-2xl bg-[#111111] border border-white/5 hover:border-emerald-500/30 hover:bg-[#161616] transition-all group">
                            <div className="w-12 h-12 shrink-0 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2 group-hover:text-emerald-400 transition-colors">Account Management</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">Manage your profile visibility, notification preferences, connected accounts, and password resets.</p>
                            </div>
                        </Link>

                    </div>
                </div>
            </section>

            {/* ==== INTERACTIVE FAQ ACCORDION ==== */}
            <section className="relative px-6 py-24 bg-[#0a0a0a]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-400">Can't find what you're looking for? Reach out to support below.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div
                                    key={index}
                                    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-[#111111] border-blue-500/30 shadow-[0_10px_30px_rgba(59,130,246,0.05)]' : 'bg-transparent border-white/10 hover:border-white/20'}`}
                                >
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                    >
                                        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-blue-400' : 'text-white'}`}>
                                            {faq.question}
                                        </span>
                                        <div className={`shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-blue-500/20 text-blue-400 rotate-180' : 'bg-white/5 text-gray-400'}`}>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <div className="p-6 pt-0 text-gray-400 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ==== CONTACT FORM ==== */}
            <section className="relative px-6 py-24 bg-[#111111] border-t border-white/5">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16">
                    <div className="md:w-1/3 space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
                            <p className="text-gray-400 leading-relaxed">Our support team is distributed globally and usually responds within 24 hours.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-gray-300 group">
                                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <span className="font-medium">support@swapskill.com</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300 group">
                                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                </div>
                                <span className="font-medium">@SwapSkillApp</span>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-2/3">
                        <form className="bg-[#161616] p-8 rounded-3xl border border-white/5 shadow-2xl space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Your Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                        placeholder="jane@example.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Subject</label>
                                <select className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all appearance-none">
                                    <option>Account Issue</option>
                                    <option>Report a User</option>
                                    <option>Bug Report</option>
                                    <option>General Inquiry</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Message</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                                    placeholder="How can we help?"
                                />
                            </div>
                            <button type="button" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-4 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-[0.98]">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
