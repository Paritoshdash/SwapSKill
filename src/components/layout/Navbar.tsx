"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler';

export function Navbar() {
    const pathname = usePathname();
    const isAuthPage = pathname === '/login' || pathname === '/signup';
    const { isAuthenticated, signOut, isLoading } = useAuth();
    const navRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (isAuthPage || isLoading) return;

        gsap.from(navRef.current, {
            opacity: 0,
            y: -20,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2 // Slight delay so it drops in as the hero container fades in
        });
    }, { dependencies: [isAuthPage, isLoading] });

    if (isAuthPage || isLoading) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none mt-4 transition-all duration-300">
            <nav className="flex items-center justify-between px-4 py-3 md:px-8 w-[95%] max-w-[1400px] mx-auto pointer-events-auto bg-background/90 dark:bg-section/80 backdrop-blur-xl border border-divider rounded-[16px] shadow-sm dark:shadow-lg" ref={navRef}>

                {/* Left side: Logo & Nav */}
                <div className="flex items-center gap-8 w-full md:w-auto">
                    {/* Logo */}
                    <Link href="/" className="flex items-center justify-center shrink-0 group">
                        <span className="font-heading font-bold text-2xl tracking-tight text-primary group-hover:drop-shadow-[0_0_8px_rgba(245,178,26,0.6)] transition-all">SwapSkill</span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden lg:flex items-center gap-2">
                        <Link href="/skills" className="text-secondary-text dark:text-muted hover:text-foreground dark:hover:text-primary hover:bg-primary/10 px-4 py-2 rounded-[12px] font-medium text-sm transition-all duration-200">
                            Learn
                        </Link>
                        <Link href="/offer-skill" className="text-secondary-text dark:text-muted hover:text-foreground dark:hover:text-primary hover:bg-primary/10 px-4 py-2 rounded-[12px] font-medium text-sm transition-all duration-200">
                            Teach
                        </Link>

                        {/* Authenticated Links */}
                        {isAuthenticated && (
                            <>
                                <Link href="/profile" className="text-secondary-text dark:text-muted hover:text-foreground dark:hover:text-primary hover:bg-primary/10 px-4 py-2 rounded-[12px] font-medium text-sm transition-all duration-200">
                                    Profile
                                </Link>
                                <Link href="/messages" className="text-secondary-text dark:text-muted hover:text-foreground dark:hover:text-primary hover:bg-primary/10 px-4 py-2 rounded-[12px] font-medium text-sm transition-all duration-200 relative">
                                    Messages
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full drop-shadow-[0_0_4px_rgba(245,178,26,0.8)]"></span>
                                </Link>
                            </>
                        )}

                        <div className="h-5 w-[1px] bg-divider mx-2"></div>

                        <Link href="/about" className="text-secondary-text dark:text-muted hover:text-foreground px-4 py-2 rounded-[12px] font-medium text-sm transition-all duration-200">
                            About
                        </Link>
                    </div>
                </div>

                {/* Right CTA */}
                <div className="flex items-center gap-3">
                    <AnimatedThemeToggler />
                    {isAuthenticated ? (
                        <button
                            onClick={signOut}
                            className="hidden md:flex items-center gap-2 bg-surface text-foreground font-bold border border-divider rounded-[20px] px-5 py-2.5 shadow-[inset_0px_3px_6px_rgba(255,255,255,0.8),inset_0px_-3px_6px_rgba(0,0,0,0.05),0px_6px_15px_rgba(0,0,0,0.05)] hover:-translate-y-[1px] hover:shadow-[inset_0px_4px_8px_rgba(255,255,255,1),inset_0px_-4px_8px_rgba(0,0,0,0.08),0px_8px_20px_rgba(0,0,0,0.08)] active:translate-y-[2px] active:shadow-[inset_0px_1px_2px_rgba(255,255,255,0.6),inset_0px_-1px_2px_rgba(0,0,0,0.03),0px_2px_5px_rgba(0,0,0,0.05)] transition-all duration-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            Log out
                        </button>
                    ) : (
                        <Link href="/signup" className="hidden md:flex items-center gap-2 bg-foreground dark:bg-primary text-background px-6 py-2.5 rounded-[20px] font-bold text-sm shadow-[inset_0px_3px_6px_rgba(255,255,255,0.15),inset_0px_-3px_6px_rgba(0,0,0,0.4),0px_6px_15px_rgba(0,0,0,0.1)] dark:shadow-[inset_0px_3px_6px_rgba(255,255,255,0.4),inset_0px_-3px_6px_rgba(0,0,0,0.15),0px_6px_15px_rgba(0,0,0,0.1)] hover:-translate-y-[1px] hover:shadow-[inset_0px_4px_8px_rgba(255,255,255,0.2),inset_0px_-4px_8px_rgba(0,0,0,0.5),0px_8px_20px_rgba(0,0,0,0.15)] dark:hover:shadow-[inset_0px_4px_8px_rgba(255,255,255,0.5),inset_0px_-4px_8px_rgba(0,0,0,0.2),0px_8px_20px_rgba(0,0,0,0.15)] active:translate-y-[2px] active:shadow-[inset_0px_1px_2px_rgba(255,255,255,0.1),inset_0px_-1px_2px_rgba(0,0,0,0.3),0px_2px_5px_rgba(0,0,0,0.1)] dark:active:shadow-[inset_0px_2px_4px_rgba(255,255,255,0.3),inset_0px_-2px_4px_rgba(0,0,0,0.1),0px_2px_5px_rgba(0,0,0,0.1)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary">
                            Join SwapSkill
                        </Link>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button className="lg:hidden flex flex-col justify-center items-center w-10 h-10 bg-section border border-divider rounded-[12px] ml-1 focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Menu">
                        <span className="block h-[2px] w-5 bg-foreground rounded-full mb-1"></span>
                        <span className="block h-[2px] w-5 bg-foreground rounded-full"></span>
                    </button>
                </div>
            </nav>
        </div>
    );
}
