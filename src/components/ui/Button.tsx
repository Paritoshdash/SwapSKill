import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'dark' | 'outline';
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
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 ease-out";

    const variants = {
        primary: "bg-white text-black hover:bg-gray-100 active:bg-gray-200",
        secondary: "bg-[#ff8a9f] text-black hover:bg-[#ff758d] active:bg-[#ff617b]",
        dark: "bg-[#111] text-white hover:bg-[#222] active:bg-[#333]",
        outline: "border border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-50 bg-transparent",
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
