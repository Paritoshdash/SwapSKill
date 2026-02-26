import { Skill } from '@/components/skills/SkillsGrid';

const SKILLS_STORAGE_KEY = 'swapskill_skills';

// Initial Dummy Data seeded into localStorage if it's empty
const INITIAL_SKILLS: Skill[] = [
    { id: 1, title: 'Advanced React Patterns & Performance', provider: 'Alex Chen', providerId: 'user_alex', rating: 4.9, price: 'UI/UX Design', category: 'Coding', type: 'Online', duration: '2 Hours', trendingScore: 98, createdAt: '2023-10-01' },
    { id: 2, title: 'Mastering Digital Illustration in Procreate', provider: 'Samantha Lee', providerId: 'user_sam', rating: 4.8, price: 'Video Editing', category: 'Art', type: 'Online', duration: '3 Hours', trendingScore: 85, createdAt: '2023-09-15' },
    { id: 3, title: 'Beginner Acoustic Guitar Chords', provider: 'Marcus Johnson', providerId: 'user_marcus', rating: 4.7, price: 'Web Dev', category: 'Music', type: 'Offline', duration: '1 Hour', trendingScore: 70, createdAt: '2023-10-10' },
    { id: 4, title: 'Authentic Thai Street Food Cooking', provider: 'Chef Niran', providerId: 'user_niran', rating: 5.0, price: 'Photography', category: 'Cooking', type: 'Offline', duration: 'Half Day', trendingScore: 92, createdAt: '2023-08-22' },
    { id: 5, title: 'Conversational Japanese for Travelers', provider: 'Yuki Takahashi', providerId: 'user_yuki', rating: 4.6, price: 'English Tutor', category: 'Language', type: 'Online', duration: '2 Hours', trendingScore: 65, createdAt: '2023-10-18' },
    { id: 6, title: 'High-Intensity Interval Training Basics', provider: 'David Smith', providerId: 'user_david', rating: 4.9, price: 'Meal Prep', category: 'Fitness', type: 'Offline', duration: '1 Hour', trendingScore: 88, createdAt: '2023-09-05' },
    { id: 7, title: 'Full-Stack Next.js 14 Development', provider: 'Sarah Jenkins', providerId: 'user_sarah', rating: 4.8, price: 'Copywriting', category: 'Coding', type: 'Online', duration: 'Multi-Session', trendingScore: 95, createdAt: '2023-10-20' },
    { id: 8, title: 'Portrait Photography with Natural Light', provider: 'Elena Rodriguez', providerId: 'user_elena', rating: 4.7, price: 'Logo Design', category: 'Art', type: 'Offline', duration: '2 Hours', trendingScore: 75, createdAt: '2023-09-28' },
    { id: 9, title: 'Creative Writing Workshop', provider: 'James Wilson', providerId: 'user_james', rating: 4.5, price: 'Web Design', category: 'Art', type: 'Online', duration: '2 Hours', trendingScore: 60, createdAt: '2023-07-15' },
    { id: 10, title: 'French Baking Secrets', provider: 'Marie Dubois', providerId: 'user_marie', rating: 4.9, price: 'Language Exchange', category: 'Cooking', type: 'Offline', duration: 'Half Day', trendingScore: 89, createdAt: '2023-10-05' }
];

// Helper to check if we are in the browser
const isBrowser = typeof window !== 'undefined';

export const storage = {
    // ---- SKILLS ----

    // Initialize standard dummy data if localStorage is empty
    initializeData: () => {
        if (!isBrowser) return;
        const stored = localStorage.getItem(SKILLS_STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(SKILLS_STORAGE_KEY, JSON.stringify(INITIAL_SKILLS));
        }
    },

    getSkills: (): Skill[] => {
        if (!isBrowser) return [];
        const stored = localStorage.getItem(SKILLS_STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse skills from localStorage", e);
                return [];
            }
        }
        return INITIAL_SKILLS; // Fallback for server-side mostly
    },

    addSkill: (skill: Omit<Skill, 'id'>): Skill => {
        if (!isBrowser) return skill as Skill;
        const skills = storage.getSkills();
        const newId = skills.length > 0 ? Math.max(...skills.map(s => s.id)) + 1 : 1;

        const newSkill: Skill = {
            ...skill,
            id: newId,
        };

        const updatedSkills = [newSkill, ...skills]; // Add to top
        localStorage.setItem(SKILLS_STORAGE_KEY, JSON.stringify(updatedSkills));
        return newSkill;
    },

    getUserSkills: (userId: string): Skill[] => {
        const skills = storage.getSkills();
        return skills.filter(skill => skill.providerId === userId);
    },

    // ---- CLEAR ----
    clearAll: () => {
        if (!isBrowser) return;
        localStorage.removeItem(SKILLS_STORAGE_KEY);
        // Do not remove auth tokens here, handled by AuthContext
    }
};
