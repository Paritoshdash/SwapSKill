import React from 'react';

export interface Skill {
    id: number;
    title: string;
    provider: string;
    providerId: string;
    rating: number;
    price: string;
    category: string;
    type: 'Online' | 'Offline';
    duration: string;
    trendingScore?: number;
    createdAt?: string;
}

interface SkillsGridProps {
    skills: Skill[];
    visibleCount: number;
    onLoadMore: () => void;
}

export function SkillsGrid({ skills, visibleCount, onLoadMore }: SkillsGridProps) {
    const visibleSkills = skills.slice(0, visibleCount);
    const hasMore = visibleCount < skills.length;

    if (skills.length === 0) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-20 text-center bg-[#1a1a1a]/30 backdrop-blur-md rounded-[2rem] border border-white/5">
                <div className="w-16 h-16 mb-4 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No skills found</h3>
                <p className="text-gray-400">Try adjusting your filters or search query.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Dynamically imported transparently from previous SkillCard file */}
                {visibleSkills.map((skill) => {
                    const { SkillCard } = require('./SkillCard');
                    return <SkillCard key={skill.id} {...skill} />;
                })}
            </div>

            {/* Pagination / Load More */}
            {hasMore && (
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={onLoadMore}
                        className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-medium transition-all backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        Load More Skills ({skills.length - visibleCount} left)
                    </button>
                </div>
            )}
        </div>
    );
}
