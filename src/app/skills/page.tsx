"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { SkillsHeader } from '@/components/skills/SkillsHeader';
import { SkillsSidebar } from '@/components/skills/SkillsSidebar';
import { SkillsGrid, Skill } from '@/components/skills/SkillsGrid';
import { storage } from '@/lib/storage';

export default function SkillsPage() {
    const [allSkills, setAllSkills] = useState<Skill[]>([]);

    useEffect(() => {
        const fetchSkills = async () => {
            const skills = await storage.getSkills();
            setAllSkills(skills);
        };
        fetchSkills();
    }, []);

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
    }, [searchQuery, sortBy, selectedCategories, selectedFormat, minRating, selectedDuration]);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 6);
    };

    return (
        <main className="min-h-screen bg-[#050505] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background elements to maintain luxury aesthetic */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

            <div className="max-w-7xl mx-auto relative z-10 animate-fade-in-up">
                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Skills</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        Discover top-tier talent and trade your expertise. Browse through our curated collection of community skills.
                    </p>
                </div>

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
            </div>
        </main>
    );
}
