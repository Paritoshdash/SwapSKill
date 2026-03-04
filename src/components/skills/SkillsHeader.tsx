import React from 'react';

interface SkillsHeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
}

export function SkillsHeader({ searchQuery, setSearchQuery, sortBy, setSortBy }: SkillsHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            {/* Search Bar */}
            <div className="relative w-full sm:w-96 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-muted group-focus-within:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-input-bg backdrop-blur-md border border-border-subtle rounded-2xl text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-md"
                    placeholder="Search for skills..."
                />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-3 w-full sm:w-auto">
                <span className="text-sm text-muted">Sort by:</span>
                <div className="relative border border-border-subtle rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-input-bg text-foreground py-2 pl-4 pr-10 focus:outline-none cursor-pointer outline-none w-full"
                    >
                        <option value="Trending">Trending</option>
                        <option value="Popular">Highest Rated</option>
                        <option value="Newest">Newest</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none bg-input-bg">
                        <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
