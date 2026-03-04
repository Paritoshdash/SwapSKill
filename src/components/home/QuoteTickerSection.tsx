"use client";

import React, { useEffect, useState } from 'react';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { createClient } from '@/utils/supabase/client';

const mockTestimonials = [
    {
        quote: "SwapSkill opened up a whole new world for me. I learned React from a senior dev in exchange for teaching conversational Spanish. It's the most authentic way to learn.",
        name: "Sarah Jenkins",
        title: "Senior Frontend Engineer",
    },
    {
        quote: "I've been trying to learn guitar for years but couldn't afford consistent lessons. By swapping my graphic design skills, I found an amazing teacher and made a great friend.",
        name: "David Chen",
        title: "UX/UI Designer",
    },
    {
        quote: "The platform's interface is incredibly smooth. I set up my profile in minutes and found a language partner the very next day. Highly recommend to anyone looking to level up.",
        name: "Elena Rodriguez",
        title: "Product Manager",
    },
    {
        quote: "As a self-taught programmer, finding mentorship is tough. SwapSkill connected me with incredible minds who were eager to learn my marketing expertise in return.",
        name: "Marcus Johnson",
        title: "Growth Hacker",
    },
    {
        quote: "The best part about SwapSkill isn't just the skills you learn, it's the community. Everyone is here to share knowledge and help each other grow. It's truly inspiring.",
        name: "Aisha Patel",
        title: "Data Scientist",
    }
];

// Helper to extract initials from a name (e.g. "John Doe" -> "JD")
const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
};

export function QuoteTickerSection() {
    const [testimonials, setTestimonials] = useState<{ quote: string; name: string; title: string; avatarText: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReviews() {
            const supabase = createClient();
            const { data: reviews, error } = await supabase
                .from('website_reviews')
                .select(`
                    content,
                    users (
                        name,
                        tagline
                    )
                `)
                .order('created_at', { ascending: false })
                .limit(10);

            let mappedReviews: { quote: string; name: string; title: string; avatarText: string }[] = [];

            if (error) {
                console.error('Error fetching website reviews:', error);
            } else if (reviews && reviews.length > 0) {
                mappedReviews = reviews.map((review: { content: string; users: { name: string; tagline: string } | { name: string; tagline: string }[] | null }) => {
                    const name = Array.isArray(review.users) ? review.users[0]?.name : review.users?.name || 'Anonymous User';
                    return {
                        quote: review.content,
                        name: name,
                        title: Array.isArray(review.users) ? review.users[0]?.tagline : review.users?.tagline || 'SwapSkill Member',
                        avatarText: getInitials(name)
                    };
                });
            }

            // Combine DB reviews with Mock reviews to ensure slider is full
            const finalReviews = [...mappedReviews];

            // Add mock testimonials to fill out the slider if DB has few entries
            mockTestimonials.forEach(mock => {
                finalReviews.push({
                    ...mock,
                    avatarText: getInitials(mock.name)
                });
            });

            setTestimonials(finalReviews);
            setLoading(false);
        }

        fetchReviews();
    }, []);

    return (
        <section className="w-[96vw] max-w-[1400px] mx-auto py-16 overflow-hidden flex flex-col items-center justify-center relative z-20 transition-all duration-500 rounded-[3rem] mb-12 mt-12 bg-black/40 border border-white/5 shadow-2xl backdrop-blur-md">
            <div className="w-full flex flex-col items-center sm:px-4 relative z-20 pt-10">
                <h2 className="text-3xl md:text-5xl font-serif text-foreground leading-tight font-medium text-center mb-10">
                    What Our Users <span className="text-primary italic">Say</span>
                </h2>

                {loading ? (
                    <div className="h-[20rem] flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                    </div>
                ) : testimonials.length > 0 ? (
                    <InfiniteMovingCards
                        items={testimonials}
                        direction="right"
                        speed="normal"
                    />
                ) : (
                    <p className="text-muted text-sm mt-4 pb-12">We are still gathering feedback from our amazing community.</p>
                )}
            </div>
        </section>
    );
}
