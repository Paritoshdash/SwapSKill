"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

// Extend our app's User model with Supabase's user mapping
export interface AppUser {
    id: string;
    name: string;
    email: string;
    phone?: string;
    bio?: string;
    tagline?: string;
    profilePic?: string;
    level?: string;
    sc_balance?: number;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: AppUser | null;
    supabaseUser: SupabaseUser | null;
    isLoading: boolean;
    refreshUser: () => Promise<void>;
    signOut: () => Promise<void>;
    updateProfile: (updates: Partial<AppUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<AppUser | null>(null);
    const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    const fetchProfile = async (authId: string) => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', authId)
            .single();

        if (data) {
            setUser({
                id: data.id,
                name: data.name,
                email: data.email,
                phone: data.phone,
                bio: data.bio,
                tagline: data.tagline,
                profilePic: data.profile_pic,
                level: data.level,
                sc_balance: data.sc_balance
            });
            setIsAuthenticated(true);
        } else if (error) {
            console.error('Error fetching user profile:', error);
            // Even if profile fails, user is auth'd with Supabase
            setUser(null);
            setIsAuthenticated(true);
        }
    };

    const refreshUser = async () => {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            setSupabaseUser(session.user);
            await fetchProfile(session.user.id);
        } else {
            setIsAuthenticated(false);
            setUser(null);
            setSupabaseUser(null);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        refreshUser();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (session?.user) {
                    setSupabaseUser(session.user);
                    fetchProfile(session.user.id);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                    setSupabaseUser(null);
                }
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
        setIsAuthenticated(false);
        setUser(null);
        setSupabaseUser(null);
    };

    const updateProfile = async (updates: Partial<AppUser>) => {
        if (!user) return;

        // Map AppUser fields to Supabase DB columns
        const dbUpdates: any = {};
        if (updates.name !== undefined) dbUpdates.name = updates.name;
        if (updates.bio !== undefined) dbUpdates.bio = updates.bio;
        if (updates.tagline !== undefined) dbUpdates.tagline = updates.tagline;
        if (updates.profilePic !== undefined) dbUpdates.profile_pic = updates.profilePic;

        const { error } = await supabase
            .from('users')
            .update(dbUpdates)
            .eq('id', user.id);

        if (!error) {
            setUser({ ...user, ...updates });
        } else {
            console.error("Failed to update profile", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, supabaseUser, isLoading, refreshUser, signOut, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

