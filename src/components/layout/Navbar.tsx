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
                            className="hidden md:flex items-center gap-2 bg-transparent border border-divider text-secondary-text dark:text-muted hover:text-foreground hover:border-foreground px-5 py-2.5 rounded-[12px] transition-all font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary active:scale-[0.98]"
                        >
                            Log out
                        </button>
                    ) : (
                        <Link href="/signup" className="hidden md:flex items-center gap-2 bg-foreground text-background dark:bg-primary dark:text-background px-6 py-2.5 rounded-[12px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(245,178,26,0.2)] hover:bg-foreground/90 dark:hover:bg-secondary dark:hover:shadow-[0_0_25px_rgba(229,142,0,0.5)] transition-all font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-primary active:scale-[0.98]">
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
