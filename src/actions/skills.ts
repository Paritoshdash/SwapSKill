"use server";

import { createClient } from '@/utils/supabase/server';
import { checkRateLimit } from '@/utils/rateLimit';
import { revalidatePath } from 'next/cache';

export async function createSkill(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Unauthorized: You must be logged in to create a skill.' };
    }

    // Rate limiting: 5 skills per hour max
    const rateLimit = checkRateLimit(`createSkill_${user.id}`, 5, 3600000);
    if (!rateLimit.success) {
        return { error: 'Rate limit exceeded. Please try again later.' };
    }

    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const type = formData.get('type') as 'Online' | 'Offline';
    const duration_hours = Number(formData.get('duration_hours')) || 1;

    // Basic validation
    if (!title || !category || !type || duration_hours <= 0) {
        return { error: 'Invalid input. Please check all fields.' };
    }

    const { data, error } = await supabase
        .from('skills')
        .insert([{
            provider_id: user.id,
            title,
            category,
            type,
            duration_hours,
        }])
        .select('*')
        .single();

    if (error) {
        console.error("Failed to add skill", error);
        return { error: error.message || 'Failed to add skill.' };
    }

    revalidatePath('/skills');
    revalidatePath('/profile');

    return { success: true, data };
}
