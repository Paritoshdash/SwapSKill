"use server";

import { createClient } from '@/utils/supabase/server';
import { checkRateLimit } from '@/utils/rateLimit';
import { revalidatePath } from 'next/cache';

export async function bookSession(skillId: string, providerId: string) {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return { error: 'Unauthorized: Must be logged in to book a session.' };
    }

    // Rate limit: 10 booking requests per hour
    const rateLimit = checkRateLimit(`bookSession_${user.id}`, 10, 3600000);
    if (!rateLimit.success) {
        return { error: 'Rate limit exceeded. Too many booking requests.' };
    }

    if (!skillId || !providerId) {
        return { error: 'Invalid Parameters: Skill or Provider is missing.' };
    }

    if (user.id === providerId) {
        return { error: 'You cannot book your own skill.' };
    }

    const { data, error } = await supabase.rpc('book_session', {
        p_seeker_id: user.id,
        p_provider_id: providerId,
        p_skill_id: skillId
    });

    if (error) {
        console.error("Booking error:", error);
        return { error: error.message || 'Failed to book session.' };
    }

    revalidatePath('/messages');

    return { success: true, sessionId: data };
}

export async function completeSession(sessionId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Unauthorized: Session required.' };
    }

    // High limit for completing, just preventing spam bursts
    const rateLimit = checkRateLimit(`completeSession_${user.id}`, 20, 60000);
    if (!rateLimit.success) {
        return { error: 'Too many requests. Please slow down.' };
    }

    const { data, error } = await supabase.rpc('complete_session', {
        p_session_id: sessionId
    });

    if (error) {
        console.error("Completion error:", error);
        return { error: error.message || 'Failed to complete session.' };
    }

    revalidatePath('/messages');
    revalidatePath('/profile');

    return { success: true, data };
}
