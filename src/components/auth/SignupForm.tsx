"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';

import toast from 'react-hot-toast';

export function SignupForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [profilePicBase64, setProfilePicBase64] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const { refreshUser } = useAuth();
    const supabase = createClient();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicBase64(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string || 'John Doe';
        const email = formData.get('email') as string || 'john@example.com';
        const password = formData.get('password') as string;
        const tagline = formData.get('tagline') as string || 'Enthusiastic Learner';
        const bio = formData.get('bio') as string || 'Ready to swap skills.';

        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name,
                        profile_pic: profilePicBase64 || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
                        tagline,
                        bio
                    }
                }
            });

            if (authError) throw authError;

            if (authData.user) {
                // The Postgres trigger `on_auth_user_created` will automatically insert the user into the `public.users` table.

                // Also update the bio and tagline using a standard update (since the trigger doesn't map those custom fields yet)
                await supabase.from('users').update({
                    bio,
                    tagline
                }).eq('id', authData.user.id);

                await refreshUser();
                toast.success('Account created successfully!');
                router.push('/profile');
            }
        } catch (error: any) {
            console.error("Signup error:", error);
            if (error.code === 'over_email_send_rate_limit') {
                toast.error("Supabase rate limit reached. Please disable 'Confirm email' in your Supabase Auth settings to test without limits.", { duration: 6000 });
            } else {
                toast.error(error.message || error.details || "Signup failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center justify-center mb-6">
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative w-24 h-24 rounded-full border-2 border-dashed border-[var(--divider)] bg-[var(--bg-section)] hover:border-primary/50 transition-colors cursor-pointer group overflow-hidden flex items-center justify-center"
                >
                    {profilePicBase64 ? (
                        <Image src={profilePicBase64} alt="Profile Preview" fill className="object-cover" />
                    ) : (
                        <svg className="w-8 h-8 text-gray-500 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#121212]/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                        <span className="text-[10px] font-semibold text-text-main uppercase tracking-wider">Upload</span>
                    </div>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
            </div>

            {/* Input Group: Full Name */}
            <div className="space-y-2 group">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider ml-1 group-focus-within:text-primary transition-colors">
                    Full Name
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full bg-[var(--bg-section)] border border-[var(--divider)] rounded-[12px] py-3 pl-11 pr-4 text-text-main placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="John Doe"
                    />
                </div>
            </div>

            {/* Input Group: Email */}
            <div className="space-y-2 group">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider ml-1 group-focus-within:text-primary transition-colors">
                    Email Address
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full bg-[var(--bg-section)] border border-[var(--divider)] rounded-[12px] py-3 pl-11 pr-4 text-text-main placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="you@example.com"
                    />
                </div>
            </div>

            {/* Input Group: Tagline */}
            <div className="space-y-2 group">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider ml-1 group-focus-within:text-primary transition-colors">
                    Professional Tagline
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        name="tagline"
                        required
                        className="w-full bg-[var(--bg-section)] border border-[var(--divider)] rounded-[12px] py-3 pl-11 pr-4 text-text-main placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="e.g. Senior Frontend Engineer"
                    />
                </div>
            </div>

            {/* Input Group: Bio */}
            <div className="space-y-2 group">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider ml-1 group-focus-within:text-primary transition-colors">
                    Short Bio
                </label>
                <textarea
                    name="bio"
                    required
                    rows={2}
                    className="w-full bg-[var(--bg-section)] border border-[var(--divider)] rounded-[12px] py-3 px-4 text-text-main placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    placeholder="Tell the community what you do and what you want to learn..."
                />
            </div>

            {/* Input Group: Password */}
            <div className="space-y-2 group">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider ml-1 group-focus-within:text-primary transition-colors">
                    Create Password
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <input
                        type="password"
                        name="password"
                        required
                        className="w-full bg-[var(--bg-section)] border border-[var(--divider)] rounded-[12px] py-3 pl-11 pr-4 text-text-main placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-secondary text-[#121212] font-semibold py-3.5 rounded-[12px] transition-all shadow-[0_0_15px_rgba(245,178,26,0.3)] hover:shadow-[0_0_25px_rgba(229,142,0,0.5)] flex justify-center items-center gap-2 group relative overflow-hidden disabled:opacity-70 mt-4 active:scale-[0.98]"
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-[#121212] rounded-full animate-spin"></div>
                ) : (
                    <>
                        <span>Create Account</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </>
                )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-[var(--divider)]"></div>
                <span className="flex-shrink-0 mx-4 text-text-muted text-xs uppercase tracking-wider">or sign up with</span>
                <div className="flex-grow border-t border-[var(--divider)]"></div>
            </div>

            {/* Social Logins */}
            <div className="flex gap-4">
                <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-[var(--bg-section)] hover:border-primary/50 border border-[var(--divider)] py-2.5 rounded-[12px] text-sm font-medium text-text-main transition-all">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
                    Google
                </button>
                <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-[var(--bg-section)] hover:border-primary/50 border border-[var(--divider)] py-2.5 rounded-[12px] text-sm font-medium text-text-main transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                    Facebook
                </button>
            </div>

            <p className="text-center text-sm text-text-muted mt-6">
                Already have an account?{' '}
                <Link href="/login" className="text-text-main hover:text-primary transition-colors font-medium">
                    Log in
                </Link>
            </p>
        </form>
    );
}
