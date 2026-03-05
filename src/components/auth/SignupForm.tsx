"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';

export function SignupForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
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
                await supabase.from('users').update({
                    bio,
                    tagline
                }).eq('id', authData.user.id);

                await refreshUser();
                toast.success('Account created successfully!');
                router.push('/profile');
            }
        } catch (error: unknown) {
            console.error("Signup error:", error);
            const err = error as { code?: string; message?: string; details?: string };
            if (err.code === 'over_email_send_rate_limit') {
                toast.error("Supabase rate limit reached. Please disable 'Confirm email' in your Supabase Auth settings to test without limits.", { duration: 6000 });
            } else {
                toast.error(err.message || err.details || "Signup failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center justify-center mb-4">
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative w-24 h-24 rounded-full border-2 border-dashed border-border-subtle bg-surface hover:bg-white/5 hover:border-muted transition-colors cursor-pointer group overflow-hidden flex items-center justify-center"
                >
                    {profilePicBase64 ? (
                        <Image src={profilePicBase64} alt="Profile Preview" fill className="object-cover" />
                    ) : (
                        <svg className="w-8 h-8 text-muted group-hover:text-foreground transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                        <span className="text-[10px] font-semibold text-white uppercase tracking-wider">Upload</span>
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

            <div className="space-y-4">
                <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-input border border-border-subtle rounded-full py-4 px-6 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Full Name"
                />

                <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-input border border-border-subtle rounded-full py-4 px-6 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Email Address"
                />

                <input
                    type="text"
                    name="tagline"
                    required
                    className="w-full bg-input border border-border-subtle rounded-full py-4 px-6 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Professional Tagline (e.g. Frontend Dev)"
                />

                <textarea
                    name="bio"
                    required
                    rows={2}
                    className="w-full bg-input border border-border-subtle rounded-2xl py-4 px-6 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Short Bio..."
                />

                <div className="relative group">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        className="w-full bg-input border border-border-subtle rounded-full py-4 pl-6 pr-12 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Create Password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-6 flex items-center text-muted hover:text-foreground transition-colors"
                    >
                        {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-2 mt-4 pt-2">
                <input type="checkbox" id="terms" className="w-4 h-4 rounded bg-input border-border-subtle text-primary focus:ring-primary accent-primary cursor-pointer" required />
                <label htmlFor="terms" className="text-sm text-secondary-text font-medium tracking-tight cursor-pointer">
                    I agree to the <span className="text-foreground font-bold hover:text-primary transition-colors cursor-pointer">Terms & Condition</span>
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-background font-bold py-4 rounded-full transition-all hover:opacity-90 active:scale-[0.98] flex justify-center items-center gap-2 group disabled:opacity-70 mt-2"
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin"></div>
                ) : (
                    <span>Create Account</span>
                )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-divider"></div>
                <span className="flex-shrink-0 mx-4 text-muted text-sm">Or</span>
                <div className="flex-grow border-t border-divider"></div>
            </div>

            {/* Social Logins */}
            <div className="flex flex-col sm:flex-row gap-4 mb-2">
                <button type="button" className="flex-1 flex items-center justify-center gap-3 bg-surface text-foreground font-semibold border border-divider hover:bg-white/5 active:bg-white/10 py-3.5 rounded-full text-sm transition-all duration-300">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
                    Continue with Google
                </button>
                <button type="button" className="flex-1 flex items-center justify-center gap-3 bg-surface text-foreground font-semibold border border-divider hover:bg-white/5 active:bg-white/10 py-3.5 rounded-full text-sm transition-all duration-300">
                    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                    Continue with Facebook
                </button>
            </div>
        </form>
    );
}
