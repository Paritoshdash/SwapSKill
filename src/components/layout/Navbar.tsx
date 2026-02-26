"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

export function Navbar() {
    const pathname = usePathname();
    const isAuthPage = pathname === '/login' || pathname === '/signup';
    const { isAuthenticated, signOut, isLoading } = useAuth();

    // Animation Stages: 0: hidden, 1: small logo pill, 2: expanded full width
    const [stage, setStage] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const t1 = setTimeout(() => setStage(1), 100); // Fade in small pill
        const t2 = setTimeout(() => setStage(2), 1200); // Expand horizontally
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down past 100px -> hide navbar
                setIsVisible(false);
            } else {
                // Scrolling up or at top -> show navbar
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    if (isAuthPage) {
        return null;
    }

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 w-full mt-12 bg-transparent pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'translate-y-0' : '-translate-y-[200%]'}`}>
            <nav className={`flex items-center justify-between rounded-[2rem] bg-[#1a1a1a]/70 backdrop-blur-xl border border-white/15 p-1.5 shadow-2xl text-white pointer-events-auto transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${stage === 0 ? 'w-[56px] opacity-0 -translate-y-4' : stage === 1 ? 'w-[56px] opacity-100 translate-y-0' : 'max-w-4xl w-full flex-1 opacity-100 translate-y-0'}`}>

                {/* Logo & Left Content */}
                <div className="flex items-center shrink-0">
                    <Link href="/" className="shrink-0 flex items-center justify-center p-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors ml-1">
                        <Image src="/logo.png" alt="SwapSkill Logo" width={32} height={32} className="object-contain" />
                    </Link>

                    {/* Navigation Links */}
                    <div className={`hidden lg:flex items-center space-x-1 ml-4 transition-opacity delay-[400ms] duration-1000 ${stage === 2 ? 'opacity-100' : 'opacity-0'}`}>
                        <Link href="/" className="px-3 py-2 text-sm font-medium hover:text-white text-gray-200 transition-colors rounded-3xl hover:bg-white/10">Home</Link>
                        <Link href="/skills" className="px-3 py-2 text-sm font-medium hover:text-white text-gray-200 transition-colors rounded-3xl hover:bg-white/10">Skills</Link>

                        {/* Authenticated Links */}
                        {!isLoading && isAuthenticated && (
                            <>
                                <Link href="/profile" className="px-3 py-2 text-sm font-medium hover:text-white text-gray-200 transition-colors rounded-3xl hover:bg-white/10">Profile</Link>
                                <Link href="/wallet" className="px-3 py-2 text-sm font-medium hover:text-white text-emerald-400 transition-colors rounded-3xl hover:bg-white/10 flex items-center gap-1">
                                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                    Wallet
                                </Link>
                                <Link href="/offer-skill" className="px-3 py-2 text-sm font-medium hover:text-white text-gray-200 transition-colors rounded-3xl hover:bg-white/10">Offer Skill</Link>
                                <Link href="/messages" className="px-3 py-2 text-sm font-medium hover:text-white text-gray-200 transition-colors rounded-3xl hover:bg-white/10 relative flex items-center">
                                    Messages
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                                </Link>
                            </>
                        )}

                        <Link href="/about" className="px-3 py-2 text-sm font-medium hover:text-white text-gray-200 transition-colors rounded-3xl hover:bg-white/10">About</Link>
                        <Link href="/faq" className="px-3 py-2 text-sm font-medium hover:text-white text-gray-200 transition-colors rounded-3xl hover:bg-white/10">FAQ</Link>
                    </div>
                </div>

                {/* Right CTA */}
                <div className={`flex items-center ml-4 shrink-0 transition-opacity delay-[400ms] duration-1000 ${stage === 2 ? 'opacity-100' : 'opacity-0'}`}>
                    {!isLoading && (
                        isAuthenticated ? (
                            <button
                                onClick={signOut}
                                className="px-5 py-2 mr-2 text-sm font-medium bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 border border-red-500/20 transition-colors rounded-3xl hidden sm:block"
                            >
                                Sign out
                            </button>
                        ) : (
                            <>
                                <Link href="/login" className="px-4 py-2 mr-2 text-sm font-medium hover:text-white text-gray-200 transition-colors rounded-3xl hover:bg-white/10 hidden sm:block">
                                    Login
                                </Link>
                                <Link href="/signup" className="group flex items-center justify-between gap-3 px-5 py-2.5 text-sm font-medium bg-[#0a66c2]/80 hover:bg-[#0a66c2] text-white rounded-[1.75rem] border border-white/10 transition-all">
                                    Signup
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </span>
                                </Link>
                            </>
                        )
                    )}

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden flex flex-col justify-center items-center w-10 h-10 ml-2 mr-1 rounded-full bg-white/10" aria-label="Menu">
                        <span className="block h-[2px] w-4 bg-white rounded-full mb-1"></span>
                        <span className="block h-[2px] w-4 bg-white rounded-full"></span>
                    </button>
                </div>
            </nav>
        </div>
    );
}
