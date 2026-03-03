import { createClient } from '@/utils/supabase/server';
import { Skill } from '@/components/skills/SkillsGrid';

export async function getServerSkills(): Promise<Skill[]> {
    const supabase = await createClient();
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
        console.error("Failed to fetch skills from Supabase (Server)", error);
        return [];
    }

    return (data as any || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        provider: item.users?.name || 'Unknown Provider',
        providerId: item.provider_id,
        rating: item.rating || 0,
        price: `${item.sc_cost || 0} SC`,
        category: item.category,
        type: item.type,
        duration: `${item.duration_hours || 0} Hour${(item.duration_hours || 0) !== 1 ? 's' : ''}`,
        createdAt: item.created_at
    }));
}
