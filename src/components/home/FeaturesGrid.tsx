import React from 'react';

const features = [
    {
        title: "Smart Matching",
        description: "Our algorithm connects you with peers who need your skills and possess the expertise you're looking for.",
        icon: "🎯"
    },
    {
        title: "Verified Profiles",
        description: "Trust your matches with comprehensive skill endorsements and peer-reviewed learning histories.",
        icon: "🛡️"
    },
    {
        title: "Structured Sessions",
        description: "Built-in video rooms, collaborative notes, and time-tracking ensure productive exchanges.",
        icon: "📹"
    },
    {
        title: "Community Networking",
        description: "Join pods of aligned professionals. Learn, collaborate, and build your network simultaneously.",
        icon: "🌐"
    },
    {
        title: "Portfolio Tracking",
        description: "Automatically document your teaching and learning milestones to showcase your continuous growth.",
        icon: "📈"
    }
];

export function FeaturesGrid() {
    return (
        <section id="features" className="py-24 bg-[#111111] text-white px-6 w-full h-full flex flex-col justify-center">
            <div className="max-w-6xl mx-auto w-full">
                <div className="text-center md:text-left mb-16 md:mb-24">
                    <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-6">
                        Everything you need <br className="hidden md:block" /> to grow efficiently.
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
                        Designed to remove friction from peer-to-peer learning so you can focus entirely on upskilling.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-2xl bg-[#1c1c1c] border border-white/5 hover:bg-[#222222] transition-colors"
                        >
                            <div className="text-4xl mb-6">{feature.icon}</div>
                            <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}

                    {/* Empty callout card to balance the 5-item grid */}
                    <div className="p-8 rounded-2xl bg-gradient-to-br from-[#2a2a2a] to-[#111111] border border-white/10 flex flex-col justify-center items-center text-center">
                        <h3 className="text-xl font-serif italic mb-4">"The fastest way to learn is to teach."</h3>
                        <span className="text-sm text-gray-400 uppercase tracking-widest font-semibold">— SwapSkill Philosophy</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
