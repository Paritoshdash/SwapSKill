import React from 'react';
import Image from 'next/image';

type AvatarProps = {
    name: string;
    imageUrl?: string;
    className?: string;
    fallbackColor?: string;
};

// Generates a simple hash to pick a consistent color based on the name
const getConsistentColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
        'bg-red-500', 'bg-blue-500', 'bg-green-500',
        'bg-yellow-500', 'bg-purple-500', 'bg-pink-500',
        'bg-indigo-500', 'bg-teal-500', 'bg-orange-500'
    ];
    return colors[Math.abs(hash) % colors.length];
};

export const Avatar = ({ name, imageUrl, className = "", fallbackColor }: AvatarProps) => {
    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    const bgColor = fallbackColor || getConsistentColor(name);

    return (
        <div
            className={`relative flex items-center justify-center rounded-full overflow-hidden text-white font-bold shrink-0 ${bgColor} ${className}`}
        >
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover"
                />
            ) : (
                <span>{initials}</span>
            )}
        </div>
    );
};
