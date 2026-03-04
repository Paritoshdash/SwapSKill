"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service like Sentry or PostHog
        console.error("Global Error Caught:", error);
    }, [error]);

    return (
        <html lang="en">
            <body className="bg-background min-h-screen flex items-center justify-center text-foreground transition-colors duration-300">
                <div className="bg-card/60 backdrop-blur-xl border border-divider p-12 rounded-[2rem] text-center max-w-lg w-full shadow-2xl animate-fade-in-up">
                    <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
                    <p className="text-muted mb-8 max-w-sm mx-auto">
                        We encountered an unexpected error. Please try again or return to the homepage.
                    </p>
                    <div className="flex gap-4 justify-center">
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
                            Go Home
                        </Link>
                    </div>
                </div>
            </body>
        </html>
    );
}
