import React from 'react';
import { SkillCard } from './SkillCard';

export interface Skill {
    id: string;
    title: string;
    provider: string;
    providerId: string;
    rating: number;
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
            <div className="w-full flex flex-col items-center justify-center py-20 text-center bg-card/30 backdrop-blur-md rounded-[2rem] border border-divider">
                <div className="w-16 h-16 mb-4 rounded-full bg-surface flex items-center justify-center text-muted">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No skills found</h3>
                <p className="text-muted">Try adjusting your filters or search query.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {visibleSkills.map((skill) => (
                    <SkillCard key={skill.id} {...skill} />
                ))}
            </div>

            {/* Pagination / Load More */}
            {hasMore && (
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={onLoadMore}
                        className="px-8 py-3 bg-section hover:bg-surface border border-divider rounded-full text-foreground font-medium transition-all backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        Load More Skills ({skills.length - visibleCount} left)
                    </button>
                </div>
            )}
        </div>
    );
}
