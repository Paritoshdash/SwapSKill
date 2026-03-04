"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface TextRevealProps {
    text: string;
    className?: string;
}

export function TextReveal({ text, className }: TextRevealProps) {
    const targetRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start 0.8", "start 0.25"],
    });

    const words = text.split(" ");

    return (
        <div ref={targetRef} className={`relative z-0 h-[100vh] ${className}`}>
            <div className="sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]">
                <p className="flex flex-wrap p-5 text-4xl font-heading font-black text-foreground/20 md:p-8 md:text-6xl lg:p-10 lg:text-7xl tracking-tighter uppercase leading-[0.9]">
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + 1 / words.length;
                        return (
                            <Word key={i} progress={scrollYProgress} range={[start, end]}>
                                {word}
                            </Word>
                        );
                    })}
                </p>
            </div>
        </div>
    );
}

interface WordProps {
    children: React.ReactNode;
    progress: MotionValue<number>;
    range: [number, number];
}

const Word = ({ children, progress, range }: WordProps) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (
        <span className="relative mx-1 lg:mx-2.5">
            <span className="absolute opacity-10">{children}</span>
            <motion.span style={{ opacity }} className="text-foreground">
                {children}
            </motion.span>
        </span>
    );
};
