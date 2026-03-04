"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Route Error Caught:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-background pt-32 pb-24 px-4 flex flex-col items-center justify-center text-foreground transition-colors duration-300">
            <div className="bg-card/60 backdrop-blur-xl border border-divider rounded-[2rem] p-12 text-center max-w-lg w-full shadow-2xl animate-fade-in-up">
                <div className="w-20 h-20 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4">Oops! Something went wrong</h2>
                <p className="text-muted mb-8 max-w-sm mx-auto">
                    We&apos;ve logged the error and are looking into it. Feel free to try again or return home.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => reset()}
                        className="px-6 py-3 bg-section hover:bg-surface text-foreground font-medium rounded-xl transition-all border border-divider"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="px-6 py-3 bg-primary hover:bg-secondary text-background font-medium rounded-xl transition-all shadow-lg text-center"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
