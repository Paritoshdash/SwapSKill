'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface StackedCardsWrapperProps {
  children: React.ReactNode[];
}

export function StackedCardsWrapper({ children }: StackedCardsWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numSections = React.Children.count(children);

  // Track scroll progress for the entire container
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
          <CardSection
            key={`card-${index}`}
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

interface CardSectionProps {
  child: React.ReactNode;
  index: number;
  numSections: number;
  scrollYProgress: any;
}

const CardSection = ({ child, index, numSections, scrollYProgress }: CardSectionProps) => {
  // Calculate scroll ranges for this section
  const start = index / numSections;
  const end = (index + 1) / numSections;
  
  // For the first section, it should start at the top
  const isFirst = index === 0;
  const isLast = index === numSections - 1;

  // Transform for incoming section (slides up from bottom)
  const y = useTransform(
    scrollYProgress,
    [start - (1 / numSections), start],
    ['100%', '0%']
  );

  // Scale transform for background sections (shrink as new section comes in)
  const scale = useTransform(
    scrollYProgress,
    [start, end],
    [1, 0.95] // Scale from 1 to 0.95
  );

  // Opacity transform for depth effect
  const opacity = useTransform(
    scrollYProgress,
    [start, end],
    [1, 0.7] // Fade slightly as it shrinks
  );

  // Z-index management
  const zIndex = numSections - index; // Higher index for earlier sections

  // Background color - use white for all sections for consistency
  const backgroundColor = 'bg-white';

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        y: isFirst ? '0%' : y,
        scale: isLast ? 1 : scale,
        opacity: isLast ? 1 : opacity,
        zIndex: zIndex,
        transformOrigin: 'top center',
      }}
      className={`
        ${backgroundColor}
        rounded-t-[3rem] 
        shadow-2xl
        will-change-transform
        overflow-hidden
        // Mobile optimization
        sm:rounded-t-[3rem]
        rounded-t-2xl
      `}
    >
      <div className="h-full w-full">
        {child}
      </div>
    </motion.div>
  );
};