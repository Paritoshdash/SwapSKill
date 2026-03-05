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
    const baseStyles = "inline-flex items-center justify-center rounded-[20px] font-bold transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background";

    const variants = {
        primary: "bg-primary text-background shadow-[inset_0px_3px_6px_rgba(255,255,255,0.4),inset_0px_-3px_6px_rgba(0,0,0,0.15),0px_6px_15px_rgba(0,0,0,0.1)] hover:-translate-y-[1px] hover:shadow-[inset_0px_4px_8px_rgba(255,255,255,0.5),inset_0px_-4px_8px_rgba(0,0,0,0.2),0px_8px_20px_rgba(0,0,0,0.15)] active:translate-y-[2px] active:scale-[0.98] active:shadow-[inset_0px_2px_4px_rgba(255,255,255,0.3),inset_0px_-2px_4px_rgba(0,0,0,0.1),0px_2px_5px_rgba(0,0,0,0.1)] dark:shadow-[inset_0px_3px_6px_rgba(255,255,255,0.4),inset_0px_-3px_6px_rgba(0,0,0,0.15),0px_6px_15px_rgba(0,0,0,0.1)]",
        secondary: "bg-surface text-primary border-none shadow-[inset_0px_3px_6px_rgba(245,158,11,0.15),inset_0px_-3px_6px_rgba(0,0,0,0.05),0px_6px_15px_rgba(0,0,0,0.05)] hover:-translate-y-[1px] hover:shadow-[inset_0px_4px_8px_rgba(245,158,11,0.25),inset_0px_-4px_8px_rgba(0,0,0,0.08),0px_8px_20px_rgba(0,0,0,0.08)] active:translate-y-[2px] active:scale-[0.98] active:shadow-[inset_0px_1px_2px_rgba(245,158,11,0.1),inset_0px_-1px_2px_rgba(0,0,0,0.03),0px_2px_5px_rgba(0,0,0,0.05)]",
        dark: "bg-foreground text-background shadow-[inset_0px_3px_6px_rgba(255,255,255,0.15),inset_0px_-3px_6px_rgba(0,0,0,0.4),0px_6px_15px_rgba(0,0,0,0.1)] hover:-translate-y-[1px] hover:shadow-[inset_0px_4px_8px_rgba(255,255,255,0.2),inset_0px_-4px_8px_rgba(0,0,0,0.5),0px_8px_20px_rgba(0,0,0,0.15)] active:translate-y-[2px] active:scale-[0.98] active:shadow-[inset_0px_1px_2px_rgba(255,255,255,0.1),inset_0px_-1px_2px_rgba(0,0,0,0.3),0px_2px_5px_rgba(0,0,0,0.1)]",
        outline: "bg-surface text-foreground border-none shadow-[inset_0px_3px_6px_rgba(255,255,255,0.8),inset_0px_-3px_6px_rgba(0,0,0,0.05),0px_6px_15px_rgba(0,0,0,0.05)] hover:-translate-y-[1px] hover:shadow-[inset_0px_4px_8px_rgba(255,255,255,1),inset_0px_-4px_8px_rgba(0,0,0,0.08),0px_8px_20px_rgba(0,0,0,0.08)] active:translate-y-[2px] active:scale-[0.98] active:shadow-[inset_0px_1px_2px_rgba(255,255,255,0.6),inset_0px_-1px_2px_rgba(0,0,0,0.03),0px_2px_5px_rgba(0,0,0,0.05)]",
        danger: "bg-red-500 text-white shadow-[inset_0px_3px_6px_rgba(255,255,255,0.4),inset_0px_-3px_6px_rgba(0,0,0,0.15),0px_6px_15px_rgba(0,0,0,0.1)] hover:-translate-y-[1px] hover:bg-red-600 hover:shadow-[inset_0px_4px_8px_rgba(255,255,255,0.5),inset_0px_-4px_8px_rgba(0,0,0,0.2),0px_8px_20px_rgba(0,0,0,0.15)] active:translate-y-[2px] active:scale-[0.98]",
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
