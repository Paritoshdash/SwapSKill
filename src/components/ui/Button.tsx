import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    href,
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center rounded-[12px] font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-base";

    const variants = {
        primary: "bg-primary text-[#121212] hover:bg-secondary active:scale-[0.98] shadow-[0_0_15px_rgba(245,178,26,0.3)] hover:shadow-[0_0_25px_rgba(229,142,0,0.5)]",
        secondary: "bg-transparent text-primary border border-primary hover:bg-[rgba(245,178,26,0.1)] hover:shadow-[0_0_15px_rgba(245,178,26,0.2)] active:scale-[0.98]",
        dark: "bg-section text-text-main border border-divider hover:border-primary/50 hover:bg-divider active:scale-[0.98]",
        outline: "border border-divider text-text-muted hover:border-primary/50 hover:text-text-main active:scale-[0.98] bg-transparent",
        danger: "bg-[#7A1E1E] text-white hover:bg-[#992626] active:scale-[0.98]",
    };

    const sizes = {
        sm: "px-4 py-1.5 text-sm",
        md: "px-6 py-2.5 text-base",
        lg: "px-8 py-3.5 text-lg",
    };

    const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
}
