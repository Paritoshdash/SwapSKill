"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Marquee } from "@/components/magicui/marquee";

interface Review {
    id: string;
    content: string;
    rating: number;
    user: {
        name: string;
        profile_pic: string;
    };
}

const ReviewCard = ({
    img,
    name,
    body,
}: {
    img: string;
    name: string;
    body: string;
}) => {
    return (
        <figure
            className="relative h-full w-full cursor-pointer overflow-hidden rounded-2xl border p-6 m-2 border-white/5 bg-white/[0.03] hover:bg-white/[0.08] transition-colors duration-300 backdrop-blur-sm shadow-xl"
        >
            <div className="flex flex-row items-center gap-3">
                <img className="rounded-full border border-white/10 object-cover" width="44" height="44" alt={name} src={img || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-bold text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium text-text-muted">Reviewer</p>
                </div>
            </div>
            <blockquote className="mt-4 text-sm leading-relaxed text-[#c0c0c0] font-serif italic">
                &quot;{body}&quot;
            </blockquote>
        </figure>
    );
};

export function ScatteredTestimonials() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    const fetchReviews = React.useCallback(async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('website_reviews')
            .select(`
                id,
                content,
                rating,
                user:users (
                    name,
                    profile_pic
                )
            `)
            .order('created_at', { ascending: false })
            .limit(10);

        if (data) {
            setReviews(data as any);
        } else if (error) {
            console.error('Error fetching reviews:', error);
        }
        setIsLoading(false);
    }, [supabase]);

    useEffect(() => {
        fetchReviews();

        // Real-time subscription for new reviews
        const channel = supabase
            .channel('public:website_reviews')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'website_reviews' }, () => {
                fetchReviews(); // Re-fetch to get the user join data
            })
            .subscribe();

        // Listen for local custom event from ReviewForm
        const handleReviewSubmitted = () => {
            fetchReviews();
        };

        window.addEventListener('review-submitted', handleReviewSubmitted);

        return () => {
            supabase.removeChannel(channel);
            window.removeEventListener('review-submitted', handleReviewSubmitted);
        };
    }, [supabase, fetchReviews]);

    const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
    const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

    if (isLoading && reviews.length === 0) {
        return (
            <div className="w-full py-32 flex items-center justify-center">
                <div className="animate-pulse text-primary font-heading text-xl uppercase tracking-widest">Loading Testimonials...</div>
            </div>
        );
    }

    return (
        <section className="w-full py-32 px-4 md:px-12 relative z-20 overflow-hidden">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Left Column: Big Bold Text */}
                <div className="lg:col-span-5 relative z-30">
                    <h2 className="text-6xl md:text-[8vw] lg:text-[7vw] font-heading font-black text-white leading-[0.8] tracking-tighter uppercase mb-4">
                        OUR <br />
                        <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">CUSTOMER</span><br />
                        <span className="text-[#a0a0a0]">S</span> <br />
                        <span className="text-white inline-flex items-center gap-2">
                            <span className="text-primary italic">L</span>
                            <div className="w-[1em] h-[1em] rounded-full bg-primary flex items-center justify-center text-[0.4em] rotate-12 drop-shadow-[0_0_15px_rgba(245,178,26,0.3)]"><span className="animate-pulse">🤝</span></div>
                            <span className="text-primary italic">VE US.</span>
                        </span>
                    </h2>
                </div>

                {/* Right Column: Marquee Demo Vertical */}
                <div className="lg:col-span-7 relative flex h-[600px] w-full flex-row items-center justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                    {reviews.length > 0 ? (
                        <>
                            <Marquee pauseOnHover vertical className="[--duration:25s] w-1/2">
                                {firstRow.map((review) => (
                                    <ReviewCard
                                        key={review.id}
                                        name={review.user?.name || 'Anonymous'}
                                        img={review.user?.profile_pic}
                                        body={review.content}
                                    />
                                ))}
                            </Marquee>
                            <Marquee reverse pauseOnHover vertical className="[--duration:25s] w-1/2">
                                {secondRow.map((review) => (
                                    <ReviewCard
                                        key={review.id}
                                        name={review.user?.name || 'Anonymous'}
                                        img={review.user?.profile_pic}
                                        body={review.content}
                                    />
                                ))}
                            </Marquee>
                        </>
                    ) : (
                        <div className="text-white/20 font-serif italic text-lg">No reviews yet. Be the first to share your experience!</div>
                    )}
                </div>

            </div>
        </section>
    );
}
