import React from 'react';

import { useRouter } from 'next/navigation';

interface SkillCardProps {
    id: string | number;
    title: string;
    provider: string;
    rating: number;
    price: string;
    category: string;
    type: 'Online' | 'Offline';
    duration: string;
    imageUrl?: string;
}

export function SkillCard({ id, title, provider, rating, price, category, type, duration }: SkillCardProps) {
    const router = useRouter();
    return (
        <div
            onClick={() => router.push(`/book/${id}`)}
            className="group relative w-full h-80 bg-[var(--bg-card)] rounded-[2rem] border border-[var(--divider)] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(245,178,26,0.15)] cursor-pointer"
        >
            {/* 3D Hover Effect Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

            <div className="relative z-10 flex flex-col h-full p-6">
                {/* Top Section: Category & Type */}
                <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-[var(--bg-section)] text-text-main rounded-full backdrop-blur-md border border-[var(--divider)]">
                        {category}
                    </span>
                    <span className="text-xs font-medium text-text-muted">
                        {type}
                    </span>
                </div>

                {/* Content Section */}
                <div className="flex-grow">
                    <h3 className="text-xl font-heading font-bold text-text-main mb-2 leading-tight group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-text-muted">by {provider}</p>
                </div>

                {/* Info Container on Hover */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)] to-transparent pt-12">
                    <div className="flex items-center text-sm text-text-muted mb-2">
                        <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {duration}
                    </div>
                    <div className="flex items-center text-sm text-text-muted">
                        <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        Available {type}
                    </div>
                </div>

                {/* Bottom Section: Rating & Price (shifts up on hover) */}
                <div className="flex justify-between items-end mt-4 pt-4 border-t border-[var(--divider)] transition-transform duration-500 group-hover:-translate-y-16">
                    <div className="flex items-center space-x-1">
                        <svg className="w-5 h-5 text-primary fill-primary" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-text-main font-medium">{rating.toFixed(1)}</span>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-text-muted block mb-1">Swap For</span>
                        <span className="text-sm font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                            {price}
                        </span>
                    </div>
                </div>
            </div>

            {/* Cool subtle gradient border effect on hover */}
            <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent group-hover:border-primary/30 transition-all duration-500 pointer-events-none"></div>
        </div>
    );
}
