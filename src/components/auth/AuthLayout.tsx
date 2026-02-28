import React from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-[var(--bg-base)] flex flex-col justify-center items-center p-4 relative overflow-hidden">
            {/* Background luxury yellow gradient blurs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3 z-0"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

            <div className="w-full max-w-md z-10 animate-fade-in-up">
                {/* Logo or Brand Element */}
                <div className="flex justify-center mb-8">
                    <Link href="/" className="flex items-center justify-center w-14 h-14 rounded-full bg-[var(--bg-section)] border border-[var(--divider)] hover:border-primary/50 transition-colors shadow-xl group hover:shadow-[0_0_15px_rgba(245,178,26,0.3)]">
                        <span className="font-heading font-black text-2xl tracking-tighter text-text-main group-hover:text-primary transition-colors">S</span>
                    </Link>
                </div>

                {/* Main Card */}
                <div className="bg-[var(--bg-card)]/80 backdrop-blur-xl border border-[var(--divider)] rounded-[2rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)] w-full">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-heading font-extrabold text-text-main tracking-tight mb-2">{title}</h2>
                        <p className="text-text-muted text-sm">{subtitle}</p>
                    </div>

                    {children}
                </div>

                {/* Back to Home Link */}
                <div className="mt-8 text-center text-sm">
                    <Link href="/" className="text-text-muted hover:text-primary transition-colors flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
