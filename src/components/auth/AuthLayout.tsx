import React from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-[#050505] flex flex-col justify-center items-center p-4 relative overflow-hidden">
            {/* Background luxury gradient blurs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3 z-0"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

            <div className="w-full max-w-md z-10 animate-fade-in-up">
                {/* Logo or Brand Element */}
                <div className="flex justify-center mb-8">
                    <Link href="/" className="flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors shadow-xl group">
                        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
                        </svg>
                    </Link>
                </div>

                {/* Main Card */}
                <div className="bg-[#1a1a1a]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] w-full">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">{title}</h2>
                        <p className="text-gray-400 text-sm">{subtitle}</p>
                    </div>

                    {children}
                </div>

                {/* Back to Home Link */}
                <div className="mt-8 text-center text-sm">
                    <Link href="/" className="text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
