import { Skill } from '@/components/skills/SkillsGrid';
import { createClient } from '@/utils/supabase/client';

interface DatabaseSkill {
    id: string;
    title: string;
    category: string;
    type: 'Online' | 'Offline';
    duration_hours: number;
    rating: number;
    created_at: string;
    provider_id: string;
    users: {
        name: string;
    };
}

interface SkillInput {
    providerId: string;
    title: string;
    category: string;
    type: 'Online' | 'Offline';
    duration_hours?: number;
}

export const storage = {
    initializeData: async () => {
        // Handled by database seeding now.
    },

    getSkills: async (): Promise<Skill[]> => {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('skills')
            .select(`
                id,
                title,
                category,
                type,
                duration_hours,
                rating,
                created_at,
                provider_id,
                users!inner(name)
            `);

        if (error) {
            console.error("Failed to fetch skills from Supabase", error);
            return [];
        }

        return (data as unknown as DatabaseSkill[] || []).map((item) => ({
            id: item.id,
            title: item.title,
            provider: item.users?.name || 'Unknown Provider',
            providerId: item.provider_id,
            rating: item.rating || 0,
            category: item.category,
            type: item.type,
            duration: `${item.duration_hours || 0} Hour${(item.duration_hours || 0) !== 1 ? 's' : ''}`,
            createdAt: item.created_at
        }));
    },

    addSkill: async (skill: SkillInput): Promise<DatabaseSkill | null> => {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('skills')
            .insert([{
                provider_id: skill.providerId,
                title: skill.title,
                category: skill.category,
                type: skill.type,
                duration_hours: skill.duration_hours || 1,
            }])
            .select('*')
            .single();

        if (error) {
            console.error("Failed to add skill", error);
        }

        return data;
    },

    getUserSkills: async (userId: string): Promise<Skill[]> => {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('skills')
            .select(`
                id,
                title,
                category,
                type,
                duration_hours,
                rating,
                created_at,
                provider_id,
                users!inner(name)
            `)
            .eq('provider_id', userId);

        if (error) {
            console.error("Error fetching user skills", error);
            return [];
        }

        return (data as unknown as DatabaseSkill[] || []).map((item) => ({
            id: item.id,
            title: item.title,
            provider: item.users?.name || 'Unknown Provider',
            providerId: item.provider_id,
            rating: item.rating || 0,
            category: item.category,
            type: item.type,
            duration: `${item.duration_hours || 0} Hour${(item.duration_hours || 0) !== 1 ? 's' : ''}`,
            createdAt: item.created_at
        }));
    }
};
