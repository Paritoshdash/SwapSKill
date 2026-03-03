"use client";

import React, { useState, useMemo } from 'react';
import { SkillsHeader } from '@/components/skills/SkillsHeader';
import { SkillsSidebar } from '@/components/skills/SkillsSidebar';
import { SkillsGrid, Skill } from '@/components/skills/SkillsGrid';

interface SkillsContentProps {
    initialSkills: Skill[];
    currentUserId?: string;
}

export function SkillsContent({ initialSkills, currentUserId }: SkillsContentProps) {
    const [allSkills] = useState<Skill[]>(initialSkills);

    // Header State
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Trending');

    // Sidebar State
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedFormat, setSelectedFormat] = useState<'Any' | 'Online' | 'Offline'>('Any');
    const [minRating, setMinRating] = useState<number>(0);
    const [selectedDuration, setSelectedDuration] = useState<string>('any');

    // Grid State
    const [visibleCount, setVisibleCount] = useState(6);

    // Derived Logic for Filtering and Sorting
    const filteredAndSortedSkills = useMemo(() => {
        return allSkills
            // 0. Filter out the current user's own skills
            .filter(skill => {
                if (currentUserId && skill.providerId === currentUserId) return false;
                return true;
            })
            // 1. Filter by Search Query
            .filter(skill => {
                if (!searchQuery) return true;
                const query = searchQuery.toLowerCase();
                return (
                    skill.title.toLowerCase().includes(query) ||
                    skill.provider.toLowerCase().includes(query) ||
                    skill.category.toLowerCase().includes(query)
                );
            })
            // 2. Filter by Category
            .filter(skill => {
                if (selectedCategories.length === 0) return true;
                return selectedCategories.includes(skill.category);
            })
            // 3. Filter by Format
            .filter(skill => {
                if (selectedFormat === 'Any') return true;
                return skill.type === selectedFormat;
            })
            // 4. Filter by Rating
            .filter(skill => {
                return skill.rating >= minRating;
            })
            // 5. Filter by Duration
            .filter(skill => {
                if (selectedDuration === 'any') return true;
                return skill.duration === selectedDuration;
            })
            // 6. Sort
            .sort((a, b) => {
                if (sortBy === 'Trending') {
                    return (b.trendingScore || 0) - (a.trendingScore || 0);
                } else if (sortBy === 'Popular') {
                    return b.rating - a.rating;
                } else if (sortBy === 'Newest') {
                    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
                }
                return 0;
            });
    }, [allSkills, searchQuery, sortBy, selectedCategories, selectedFormat, minRating, selectedDuration, currentUserId]);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 6);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <SkillsSidebar
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedFormat={selectedFormat}
                setSelectedFormat={setSelectedFormat}
                minRating={minRating}
                setMinRating={setMinRating}
                selectedDuration={selectedDuration}
                setSelectedDuration={setSelectedDuration}
            />

            {/* Main Content Area */}
            <div className="flex-1">
                <SkillsHeader
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />
                <SkillsGrid
                    skills={filteredAndSortedSkills}
                    visibleCount={visibleCount}
                    onLoadMore={handleLoadMore}
                />
            </div>
        </div>
    );
}
