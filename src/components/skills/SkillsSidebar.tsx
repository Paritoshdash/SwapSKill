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
            <div className="bg-surface/50 backdrop-blur-md rounded-[2rem] border border-border-subtle p-6 sticky top-28 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-foreground">Filters</h2>
                    <button
                        onClick={() => {
                            setSelectedCategories([]);
                            setSelectedFormat('Any');
                            setMinRating(0);
                            setSelectedDuration('any');
                        }}
                        className="text-xs text-primary hover:text-secondary transition-colors font-medium"
                    >
                        Reset All
                    </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Category</h3>
                    <div className="space-y-2">
                        {CATEGORIES.map((category) => {
                            const isSelected = selectedCategories.includes(category);
                            return (
                                <label key={category} className="flex items-center space-x-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary' : 'border-divider group-hover:border-primary/50'}`}>
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
                                    <span className={`transition-colors ${isSelected ? 'text-foreground font-medium' : 'text-muted group-hover:text-foreground'}`}>{category}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                <div className="h-px bg-divider w-full my-6 opacity-50"></div>

                {/* Format (Online/Offline) */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Format</h3>
                    <div className="flex bg-divider/10 rounded-xl p-1 relative">
                        <button
                            onClick={() => setSelectedFormat('Any')}
                            className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${selectedFormat === 'Any' ? 'bg-background text-foreground shadow-smBorder border-border-subtle' : 'text-muted hover:text-foreground'}`}
                        >
                            Any
                        </button>
                        <button
                            onClick={() => setSelectedFormat('Online')}
                            className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${selectedFormat === 'Online' ? 'bg-background text-foreground shadow-sm Border border-border-subtle' : 'text-muted hover:text-foreground'}`}
                        >
                            Online
                        </button>
                        <button
                            onClick={() => setSelectedFormat('Offline')}
                            className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${selectedFormat === 'Offline' ? 'bg-background text-foreground shadow-sm Border border-border-subtle' : 'text-muted hover:text-foreground'}`}
                        >
                            Offline
                        </button>
                    </div>
                </div>

                <div className="h-px bg-divider w-full my-6 opacity-50"></div>

                {/* Minimum Rating */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Rating</h3>
                    <div className="space-y-2">
                        {[4, 3, 2].map((rating) => {
                            const isSelected = minRating === rating;
                            return (
                                <label key={rating} className="flex items-center space-x-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-primary' : 'border-divider group-hover:border-primary/50'}`}>
                                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                                        <input
                                            type="radio"
                                            name="rating"
                                            className="hidden"
                                            checked={isSelected}
                                            onChange={() => setMinRating(rating)}
                                        />
                                    </div>
                                    <div className="flex items-center text-primary">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <svg key={i} className={`w-4 h-4 ${i < rating ? 'fill-current' : 'fill-divider'}`} viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                        <span className={`ml-2 text-sm transition-colors ${isSelected ? 'text-foreground font-medium' : 'text-muted group-hover:text-foreground'}`}>& up</span>
                                    </div>
                                </label>
                            );
                        })}
                    </div>
                </div>

                <div className="h-px bg-divider w-full my-6 opacity-50"></div>

                {/* Duration */}
                <div>
                    <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Duration</h3>
                    <div className="relative border border-divider rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all">
                        <select
                            value={selectedDuration}
                            onChange={(e) => setSelectedDuration(e.target.value)}
                            className="w-full bg-input-bg px-4 py-2 text-foreground appearance-none outline-none transition-colors cursor-pointer"
                        >
                            <option value="any">Any Duration</option>
                            <option value="1 Hour">1 Hour</option>
                            <option value="2 Hours">2 Hours</option>
                            <option value="3 Hours">3 Hours</option>
                            <option value="Half Day">Half Day</option>
                            <option value="Multi-Session">Multi-Session</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none bg-input-bg">
                            <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
