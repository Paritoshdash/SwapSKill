"use server";

import { createClient } from '@/utils/supabase/server';
import { checkRateLimit } from '@/utils/rateLimit';
import { revalidatePath } from 'next/cache';

export async function updateUserProfile(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Unauthorized.' };
    }

    // Rate limit updates to prevent abuse (10 per hour)
    const rateLimit = checkRateLimit(`updateProfile_${user.id}`, 10, 3600000);
    if (!rateLimit.success) {
        return { error: 'Rate limit exceeded. Please try updating your profile later.' };
    }

    const name = formData.get('name') as string;
    const tagline = formData.get('tagline') as string;
    const bio = formData.get('bio') as string;
    const level = formData.get('level') as string;

    const updates: Record<string, string> = {};
    if (name) updates.name = name;
    if (tagline) updates.tagline = tagline;
    if (bio) updates.bio = bio;
    if (level) updates.level = level;

    const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id);

    if (error) {
        console.error("Profile update error:", error);
        return { error: error.message || 'Failed to update profile.' };
    }

    revalidatePath('/profile');

    return { success: true };
}
