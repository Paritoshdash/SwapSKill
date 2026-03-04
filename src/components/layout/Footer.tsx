import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
    return (
        <footer className="relative bg-section text-foreground pt-24 pb-0 overflow-hidden font-sans border-t border-divider">

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 pb-16">

                {/* Left Column */}
                <div className="flex flex-col gap-6">
                    <div className="w-auto h-12 flex items-center justify-start mb-2">
                        <Image src="/logo.png" alt="SwapSkill Logo" width={120} height={40} className="object-contain" />
                    </div>

                    <div className="flex flex-col gap-4 w-full max-w-sm">
                        <p className="font-semibold text-foreground font-sans text-base">Don&apos;t miss out on platform updates.</p>
                        <input
                            type="text"
                            placeholder="Name"
                            className="bg-background border border-divider text-foreground placeholder-muted px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary transition-all font-sans rounded-none"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="bg-background border border-divider text-foreground placeholder-muted px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary transition-all font-sans rounded-none"
                        />
                        <div className="flex">
                            <button className="flex-1 bg-foreground text-background font-bold py-3 hover:bg-primary hover:text-white transition-colors font-sans text-sm tracking-wide uppercase">
                                Subscribe
                            </button>
                        </div>
                        <p className="text-muted text-xs font-sans mt-1">Unsubscribe anytime.</p>
                    </div>

                    <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-muted text-xs uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 bg-primary block"></span>
                            EMPOWERING GLOBAL LEARNERS
                        </div>
                        <div className="flex items-center gap-2 text-muted text-xs uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 bg-primary block"></span>
                            DECENTRALIZED KNOWLEDGE
                        </div>
                    </div>
                </div>

                {/* Center Column */}
                <div className="flex flex-col items-start md:items-center pt-2 md:pt-16">
                    <div className="flex flex-col gap-4 text-left md:text-center text-muted font-sans">
                        <Link href="/skills" className="hover:text-primary transition-colors uppercase tracking-wider text-sm">Browse Skills</Link>
                        <Link href="/offer-skill" className="hover:text-primary transition-colors uppercase tracking-wider text-sm">Offer a Skill</Link>
                        <Link href="/about" className="hover:text-primary transition-colors uppercase tracking-wider text-sm">How it Works</Link>
                        <Link href="/about" className="hover:text-primary transition-colors uppercase tracking-wider text-sm">About Us</Link>
                        <Link href="/faq" className="hover:text-primary transition-colors uppercase tracking-wider text-sm">FAQ</Link>
                        <Link href="#" className="hover:text-primary transition-colors uppercase tracking-wider text-sm">Blog</Link>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col items-start md:items-end font-sans pt-2 md:pt-16">
                    <div className="flex flex-col gap-2 text-left md:text-right text-muted mb-10">
                        <a href="mailto:support@swapskill.com" className="hover:text-primary transition-colors underline decoration-muted/30 underline-offset-4">support@swapskill.com</a>
                        <a href="mailto:hello@swapskill.com" className="hover:text-primary transition-colors underline decoration-muted/30 underline-offset-4">hello@swapskill.com</a>
                        <a href="mailto:careers@swapskill.com" className="hover:text-primary transition-colors underline decoration-muted/30 underline-offset-4">careers@swapskill.com</a>
                    </div>

                    <div className="flex flex-col gap-2 text-left md:text-right text-muted mb-10">
                        <Link href="#" className="hover:text-primary transition-colors underline decoration-muted/30 underline-offset-4">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary transition-colors underline decoration-muted/30 underline-offset-4">Terms of Service</Link>
                        <Link href="#" className="hover:text-primary transition-colors underline decoration-muted/30 underline-offset-4">Community Guidelines</Link>
                    </div>

                    {/* Social Icons instead of grid/color toggles */}
                    <div className="flex items-center gap-4 justify-start md:justify-end mt-auto">
                        <Link href="#" className="text-muted hover:text-primary transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-background border border-divider">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                        </Link>
                        <Link href="#" className="text-muted hover:text-primary transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-background border border-divider">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        </Link>
                        <Link href="#" className="text-muted hover:text-primary transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-background border border-divider">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </Link>
                    </div>
                </div>

            </div>

            {/* Middle Bottom */}
            <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center justify-center text-muted text-sm font-sans pointer-events-none">
                <p>© 2026</p>
                <p>SwapSkill</p>
                <p>All rights reserved.</p>
            </div>

            {/* Giant Text Watermark */}
            <div className="absolute bottom-0 left-0 right-0 text-center z-0 pointer-events-none select-none flex items-end justify-center">
                <h1 className="text-[20vw] leading-none font-bold text-background tracking-tighter whitespace-nowrap opacity-10">
                    SwapSkill
                </h1>
            </div>

        </footer>
    );
}

