import React from 'react';

interface SkillsSidebarProps {
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
    selectedFormat: 'Any' | 'Online' | 'Offline';
    setSelectedFormat: (format: 'Any' | 'Online' | 'Offline') => void;
    minRating: number;
    setMinRating: (rating: number) => void;
    selectedDuration: string;
    setSelectedDuration: (duration: string) => void;
}

const CATEGORIES = ['Coding', 'Art', 'Music', 'Cooking', 'Language', 'Fitness'];

export function SkillsSidebar({
    selectedCategories,
    setSelectedCategories,
    selectedFormat,
    setSelectedFormat,
    minRating,
    setMinRating,
    selectedDuration,
    setSelectedDuration
}: SkillsSidebarProps) {

    const toggleCategory = (category: string) => {
        setSelectedCategories((prev: string[]) =>
            prev.includes(category)
                ? prev.filter((c: string) => c !== category)
                : [...prev, category]
        );
    };

    return (
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
            {/* Filter Section Container */}
            <div className="bg-[#1a1a1a]/50 backdrop-blur-md rounded-[2rem] border border-white/10 p-6 sticky top-28">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Filters</h2>
                    <button
                        onClick={() => {
                            setSelectedCategories([]);
                            setSelectedFormat('Any');
                            setMinRating(0);
                            setSelectedDuration('any');
                        }}
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        Reset All
                    </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Category</h3>
                    <div className="space-y-2">
                        {CATEGORIES.map((category) => {
                            const isSelected = selectedCategories.includes(category);
                            return (
                                <label key={category} className="flex items-center space-x-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-white/20 group-hover:border-blue-400'}`}>
                                        {isSelected && (
                                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                        )}
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={isSelected}
                                            onChange={() => toggleCategory(category)}
                                        />
                                    </div>
                                    <span className={`transition-colors ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{category}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                <div className="h-px bg-white/10 w-full my-6"></div>

                {/* Format (Online/Offline) */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Format</h3>
                    <div className="flex bg-white/5 rounded-xl p-1 relative">
                        <button
                            onClick={() => setSelectedFormat('Any')}
                            className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${selectedFormat === 'Any' ? 'bg-white/10 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                        >
                            Any
                        </button>
                        <button
                            onClick={() => setSelectedFormat('Online')}
                            className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${selectedFormat === 'Online' ? 'bg-white/10 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                        >
                            Online
                        </button>
                        <button
                            onClick={() => setSelectedFormat('Offline')}
                            className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${selectedFormat === 'Offline' ? 'bg-white/10 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                        >
                            Offline
                        </button>
                    </div>
                </div>

                <div className="h-px bg-white/10 w-full my-6"></div>

                {/* Minimum Rating */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Rating</h3>
                    <div className="space-y-2">
                        {[4, 3, 2].map((rating) => {
                            const isSelected = minRating === rating;
                            return (
                                <label key={rating} className="flex items-center space-x-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-yellow-400' : 'border-white/20 group-hover:border-yellow-400'}`}>
                                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>}
                                        <input
                                            type="radio"
                                            name="rating"
                                            className="hidden"
                                            checked={isSelected}
                                            onChange={() => setMinRating(rating)}
                                        />
                                    </div>
                                    <div className="flex items-center text-yellow-400">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <svg key={i} className={`w-4 h-4 ${i < rating ? 'fill-current' : 'fill-white/10'}`} viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                        <span className={`ml-2 text-sm transition-colors ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>& up</span>
                                    </div>
                                </label>
                            );
                        })}
                    </div>
                </div>

                <div className="h-px bg-white/10 w-full my-6"></div>

                {/* Duration */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Duration</h3>
                    <div className="relative border border-white/10 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 transition-all">
                        <select
                            value={selectedDuration}
                            onChange={(e) => setSelectedDuration(e.target.value)}
                            className="w-full bg-[#1a1a1a] px-4 py-2 text-white appearance-none outline-none transition-colors cursor-pointer"
                        >
                            <option value="any">Any Duration</option>
                            <option value="1 Hour">1 Hour</option>
                            <option value="2 Hours">2 Hours</option>
                            <option value="3 Hours">3 Hours</option>
                            <option value="Half Day">Half Day</option>
                            <option value="Multi-Session">Multi-Session</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none bg-[#1a1a1a]">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
