import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: React.ReactNode;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="h-screen w-screen overflow-hidden bg-background flex p-4 sm:p-6 lg:p-8">
            {/* Split Container */}
            <div className="flex w-full h-full bg-card border border-border-subtle rounded-[2rem] overflow-hidden shadow-2xl relative">

                {/* Left Side: Form Container */}
                <div className="w-full lg:w-1/2 flex flex-col h-full animate-fade-in-up relative z-10">

                    {/* Logo - Fixed at top of left container */}
                    <div className="flex-none pt-8 px-8 sm:pt-10 sm:px-12 flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center overflow-hidden shrink-0">
                                <span className="font-heading font-black text-xl text-background">S</span>
                            </div>
                            <span className="font-bold text-xl tracking-tight text-foreground">SwapSkill</span>
                        </Link>
                    </div>

                    {/* Scrollable Form Content */}
                    <div className="flex-1 overflow-y-auto px-8 sm:px-12 lg:px-16 py-8 flex flex-col no-scrollbar">
                        <div className="max-w-md w-full m-auto py-4">
                            <div className="mb-6">
                                <h2 className="text-4xl font-heading font-bold text-foreground mb-2">{title}</h2>
                                {subtitle && (
                                    <p className="text-muted font-medium">{subtitle}</p>
                                )}
                            </div>

                            {children}

                            {/* Back to Home Link */}
                            <div className="mt-8 text-left pb-4">
                                <Link href="/" className="text-muted hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Image Container */}
                <div className="hidden lg:block lg:w-1/2 h-full relative p-4 pl-0">
                    <div className="w-full h-full relative rounded-[2rem] overflow-hidden">
                        <Image
                            src="/images/auth-bg.png"
                            alt="VR Experience"
                            fill
                            className="object-cover object-center"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
