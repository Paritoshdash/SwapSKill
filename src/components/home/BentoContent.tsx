import React from 'react';
import Link from 'next/link';

// Features from FeaturesGrid
const features = [
    { title: "Smart Matching", desc: "Our algorithm connects you with peers who precisely need your skills and possess the expertise you desire.", icon: "🎯" },
    { title: "Verified Profiles", desc: "Trust your matches with comprehensive skill endorsements and peer-reviewed learning histories.", icon: "🛡️" },
    { title: "Structured Sessions", desc: "Built-in video rooms, collaborative notes, and time-tracking ensure productive exchanges.", icon: "📹" },
    { title: "Community Networking", desc: "Join pods of aligned professionals. Learn, collaborate, and build your network simultaneously.", icon: "🌐" },
    { title: "Portfolio Tracking", desc: "Automatically document your teaching and learning milestones to showcase your continuous growth.", icon: "📈" }
];

// Steps from HowItWorks
const steps = [
    { num: "01", title: "Create Your Profile", desc: "List the skills you have to offer and the skills you want to learn." },
    { num: "02", title: "Get Smart Matched", desc: "Our algorithm finds users with complementary needs." },
    { num: "03", title: "Swap & Grow", desc: "Schedule sessions using our built-in video and collaboration tools." }
];

export function BentoContent() {
    return (
        <section className="bg-[var(--bg-section)] border-t border-divider rounded-t-[40px] md:rounded-t-[80px] w-full pt-20 md:pt-32 pb-32 px-6 md:px-12 mt-[-60px] relative z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.4)]">
            <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

                {/* Left Column (3 col) - ProblemSolution */}
                <div className="lg:col-span-3 flex flex-col space-y-12">
                    <h2 className="text-4xl lg:text-5xl font-heading font-black leading-[0.9] text-text-main uppercase tracking-tighter">
                        A PEER-TO-PEER<br /><span className="text-primary drop-shadow-[0_0_10px_rgba(245,178,26,0.2)]">ECONOMY</span>
                    </h2>

                    {/* Subheader */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-3">
                                <div className="w-10 h-10 rounded-full bg-bg-base border border-divider flex items-center justify-center text-xs font-bold text-primary shadow-sm">PS</div>
                                <div className="w-10 h-10 rounded-full bg-bg-base border border-divider flex items-center justify-center text-xs font-bold text-primary shadow-sm">RV</div>
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-widest text-primary">Loved by Learners</span>
                        </div>
                        <p className="text-text-muted font-medium text-[15px] leading-relaxed">
                            Learning is expensive, isolated, and inefficient. Trade your expertise for the skills you want to learn.
                        </p>
                    </div>


                    {/* Testimonial Card */}
                    <div className="bg-[var(--bg-card)] rounded-[16px] p-8 shadow-md relative overflow-hidden group border border-divider mt-auto transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(245,178,26,0.1)] hover:-translate-y-1">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Real Swap</h4>
                        <p className="text-[15px] font-medium italic text-text-main leading-relaxed mb-6">
                            &quot;The quality of peers on SwapSkill is unmatched. I&apos;ve built a network of ambitious professionals while learning UI/UX design.&quot;
                        </p>
                        <div className="absolute bottom-6 right-6 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-[#121212] shadow-[0_0_10px_rgba(245,178,26,0.3)] transform group-hover:scale-110 group-hover:bg-secondary transition-all cursor-pointer">
                            <svg className="w-5 h-5 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </div>
                    </div>
                </div>

                {/* Middle Column (4 col) - How It Works */}
                <div className="lg:col-span-4 flex flex-col space-y-10 lg:pl-10">
                    <h2 className="text-4xl md:text-5xl font-heading font-black leading-[0.90] text-text-main uppercase tracking-tighter">
                        HOW SWAPSKILL<br /><span className="text-primary">WORKS FOR YOU</span>
                    </h2>

                    <div className="flex gap-4">
                        <Link href="/signup" className="px-8 py-3.5 rounded-[12px] bg-transparent border border-primary text-primary font-bold uppercase tracking-widest text-[11px] hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(245,178,26,0.2)] transition-all duration-300 active:scale-[0.98]">
                            Start Swapping
                        </Link>
                    </div>

                    <div className="flex flex-col gap-10 mt-14 pr-4">
                        {steps.map((st, i) => (
                            <div key={i} className="flex gap-6 items-start group">
                                <div className="text-sm font-black mt-0.5 text-[#121212] bg-primary shadow-[0_0_10px_rgba(245,178,26,0.3)] px-2.5 py-1.5 rounded-[8px] group-hover:shadow-[0_0_15px_rgba(245,178,26,0.5)] transition-all">
                                    {st.num}
                                </div>
                                <div>
                                    <h4 className="font-bold text-[15px] tracking-wide mb-2 text-text-main group-hover:text-primary transition-colors">{st.title}</h4>
                                    <p className="text-[14px] text-text-muted font-medium leading-relaxed">{st.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column (5 col) - Features Grid */}
                <div className="lg:col-span-5 flex flex-col lg:pl-12 pt-8 lg:pt-0">
                    {features.map((f, i) => (
                        <div key={i} className="flex gap-6 items-start border-b border-divider py-7 first:pt-0 last:border-0 last:pb-0 group">
                            <div className="w-16 h-16 shrink-0 bg-bg-base border border-divider group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(245,178,26,0.15)] transition-all duration-300 rounded-[16px] overflow-hidden relative flex flex-col justify-center items-center text-2xl group-hover:-translate-y-1">
                                {f.icon}
                            </div>
                            <div className="flex flex-col pt-1">
                                <h3 className="text-text-main font-bold text-[15px] mb-2.5 tracking-wide group-hover:text-primary transition-colors">{f.title}</h3>
                                <p className="text-text-muted font-medium text-[14px] leading-relaxed max-w-[340px]">
                                    {f.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Social Proof at the bottom */}
            <div className="max-w-[1600px] mx-auto mt-32 pt-16 border-t border-divider text-center">
                <p className="text-[11px] font-bold text-text-muted mb-10 uppercase tracking-widest">
                    Trusted by learners and professionals from
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                    {['TCS', 'Infosys', 'Flipkart', 'Zomato', 'Cred'].map((company) => (
                        <span key={company} className="text-3xl font-heading font-black tracking-tighter text-text-main hover:text-primary transition-colors duration-300">
                            {company}.
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
