'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

export function SmoothScrollWrapper({ children }: { children: React.ReactNode[] }) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Total scroll height = 100vh per section
    const numSections = React.Children.count(children);

    // We tie the scroll progress of the entire container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    return (
        <div
            ref={containerRef}
            style={{ height: `${numSections * 100}vh` }}
            className="relative w-full"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {React.Children.map(children, (child, index) => (
                    <SectionItem
                        key={`section-${index}`}
                        index={index}
                        numSections={numSections}
                        scrollYProgress={scrollYProgress}
                        child={child}
                    />
                ))}
            </div>
        </div>
    );
}

// Helper component to resolve Rules of Hooks for React.Children.map
const SectionItem = ({
    child,
    index,
    numSections,
    scrollYProgress,
}: {
    child: React.ReactNode;
    index: number;
    numSections: number;
    scrollYProgress: any;
}) => {
    // Each section gets 1/numSections of the scroll progress
    const start = index / numSections;
    const end = start + (1 / numSections);

    // Incoming section slides up from 100% to 0% linearly over its dedicated scroll window
    const y = useTransform(
        scrollYProgress,
        [start - (1 / numSections), start],
        ['100%', '0%']
    );

    // Old section stays pinned at 0% while the incoming one slides over it
    // Then optionally scales down slightly as it's being covered to enhance depth
    const scale = useTransform(
        scrollYProgress,
        [start, end],
        [1, 0.95]
    );

    // Fade out as it's getting covered
    const opacity = useTransform(
        scrollYProgress,
        [start, end],
        [1, 0.5]
    );

    // Z-index ensures that index 0 is at bottom (zIndex: 0), index 1 slides over it (zIndex: 1)
    const zIndex = index;

    // We only enable pointer events if this section is the "active" one (is fully pinned or animating in)
    const pointerEvents = useTransform(scrollYProgress, (v: number) => {
        if (v >= start - 0.05 && v <= end + 0.05) return 'auto';
        return 'none';
    });

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                y: index === 0 ? '0%' : y, // Hero section never slides in from bottom
                scale: index === numSections - 1 ? 1 : scale, // Last section doesn't scale down
                opacity: index === numSections - 1 ? 1 : opacity,
                overflow: 'hidden',
                pointerEvents: pointerEvents as any,
                transformOrigin: 'top center',
                zIndex: zIndex,
            }}
            // Standard rounded corners while entering give that iOS app card feel
            className="will-change-transform shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"
        >
            {child}
        </motion.div>
    );
};
