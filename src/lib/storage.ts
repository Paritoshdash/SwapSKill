import { Skill } from '@/components/skills/SkillsGrid';
import { createClient } from '@/utils/supabase/client';

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
                sc_cost,
                rating,
                created_at,
                provider_id,
                users!inner(name)
            `);

        if (error) {
            console.error("Failed to fetch skills from Supabase", error);
            return [];
        }

        return data.map((item: any) => ({
            id: item.id,
            title: item.title,
            provider: item.users.name,
            providerId: item.provider_id,
            rating: item.rating,
            price: `${item.sc_cost} SC`,
            category: item.category,
            type: item.type,
            duration: `${item.duration_hours} Hour${item.duration_hours > 1 ? 's' : ''}`,
            createdAt: item.created_at
        }));
    },

    addSkill: async (skill: any): Promise<any> => {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('skills')
            .insert([{
                provider_id: skill.providerId,
                title: skill.title,
                category: skill.category,
                type: skill.type,
                duration_hours: skill.duration_hours || 1, // fallback
                sc_cost: skill.sc_cost || 10,              // fallback
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
                sc_cost,
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

        return data.map((item: any) => ({
            id: item.id,
            title: item.title,
            provider: item.users.name,
            providerId: item.provider_id,
            rating: item.rating,
            price: `${item.sc_cost} SC`,
            category: item.category,
            type: item.type,
            duration: `${item.duration_hours} Hour${item.duration_hours > 1 ? 's' : ''}`,
            createdAt: item.created_at
        }));
    }
};
