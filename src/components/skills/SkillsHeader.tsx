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
                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-lg"
                    placeholder="Search for skills..."
                />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-3 w-full sm:w-auto">
                <span className="text-sm text-gray-400">Sort by:</span>
                <div className="relative border border-white/10 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 transition-all">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-[#1a1a1a]/80 backdrop-blur-md text-white py-2 pl-4 pr-10 focus:outline-none cursor-pointer outline-none w-full"
                    >
                        <option value="Trending">Trending</option>
                        <option value="Popular">Highest Rated</option>
                        <option value="Newest">Newest</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
