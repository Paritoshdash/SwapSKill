"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function Navbar() {
    const pathname = usePathname();
    const isAuthPage = pathname === '/login' || pathname === '/signup';
    const { isAuthenticated, signOut, isLoading } = useAuth();

    if (isAuthPage) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
            <nav className="flex items-center justify-between px-4 md:px-8 py-3 w-full max-w-[1400px] mx-auto text-black">

                {/* Logo & Left Content */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center justify-center mr-6 lg:mr-10">
                        {/* Replace with SwapSkill typomark if available, using text for now */}
                        <span className="font-extrabold text-2xl tracking-tight">SwapSkill</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-6 text-[15px] font-medium text-gray-700">
                        <Link href="/skills" className="hover:text-black transition-colors">Learn</Link>
                        <Link href="/offer-skill" className="hover:text-black transition-colors">Teach</Link>

                        {/* Authenticated Links */}
                        {!isLoading && isAuthenticated && (
                            <>
                                <Link href="/profile" className="hover:text-black transition-colors">Profile</Link>
                                <Link href="/wallet" className="hover:text-black transition-colors">Wallet</Link>
                                <Link href="/messages" className="hover:text-black transition-colors relative">
                                    Messages
                                    <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                                </Link>
                            </>
                        )}

                        <Link href="/about" className="hover:text-black transition-colors">Swap Mode</Link>
                        <Link href="/enterprise" className="hover:text-black transition-colors">Team</Link>
                    </div>
                </div>

                {/* Right CTA */}
                <div className="flex items-center space-x-4">
                    {!isLoading && (
                        isAuthenticated ? (
                            <button
                                onClick={signOut}
                                className="text-[15px] font-medium hover:text-gray-600 transition-colors hidden sm:block"
                            >
                                Log out
                            </button>
                        ) : (
                            <>
                                <Link href="/login" className="text-[15px] font-medium hover:text-gray-600 transition-colors hidden sm:block">
                                    Log in
                                </Link>
                                <Link href="/signup" className="px-5 py-2.5 text-[15px] font-medium bg-[#1a1a1a] hover:bg-black text-white rounded-full transition-colors">
                                    Sign up
                                </Link>
                            </>
                        )
                    )}

                    {/* Mobile Menu Toggle */}
                    <button className="lg:hidden flex flex-col justify-center items-center w-8 h-8 ml-2" aria-label="Menu">
                        <span className="block h-[2px] w-5 bg-black rounded-full mb-1"></span>
                        <span className="block h-[2px] w-5 bg-black rounded-full"></span>
                    </button>
                </div>
            </nav>
        </div>
    );
}
