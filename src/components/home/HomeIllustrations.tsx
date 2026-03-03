"use client";

import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ActiveHomeSection } from '@/app/page';

interface HomeIllustrationsProps {
    activeSection: ActiveHomeSection;
}

const variants: Variants = {
    initial: {
        opacity: 0,
        scale: 1.1,
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1.2,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        scale: 0.85,
        transition: {
            duration: 1,
            ease: "easeOut"
        }
    }
};

export function HomeIllustrations({ activeSection }: HomeIllustrationsProps) {
    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            {/* Full Bleed Container */}
            <div className="w-full h-full relative">
                <AnimatePresence mode="popLayout">
                    {activeSection === 'hero' && (
                        <motion.div
                            key="hero"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0a0a0a]"
                        >
                            {/* Abstract Hero Shapes */}
                            <div className="absolute top-[20%] left-[15%] w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-[100px]" />
                            <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-[#1a1c20] blur-[80px]" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
                        </motion.div>
                    )}

                    {activeSection === 'ticker' && (
                        <motion.div
                            key="ticker"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#0f1012] via-[#1a1a1a] to-[#0f1012]"
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-secondary/5 blur-[150px]" />
                        </motion.div>
                    )}

                    {activeSection === 'bento' && (
                        <motion.div
                            key="bento"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="absolute inset-0 w-full h-full bg-gradient-to-bl from-[#121212] via-[#0a0a0a] to-[#121212]"
                        >
                            <div className="absolute top-[40%] right-[20%] w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[120px]" />
                            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,255,255,0.01)_20px,rgba(255,255,255,0.01)_21px)]" />
                        </motion.div>
                    )}

                    {activeSection === 'testimonials' && (
                        <motion.div
                            key="testimonials"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="absolute inset-0 w-full h-full bg-gradient-to-tr from-[#1a1a1a] via-[#121212] to-[#0a0a0a]"
                        >
                            <div className="absolute bottom-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-[120px]" />
                        </motion.div>
                    )}


                    {activeSection === 'steps' && (
                        <motion.div
                            key="steps"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]"
                        >
                            <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[30vw] h-[30vw] rounded-full bg-secondary/10 blur-[100px]" />
                        </motion.div>
                    )}

                    {activeSection === 'cta' && (
                        <motion.div
                            key="cta"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="absolute inset-0 w-full h-full bg-black"
                        >
                            <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] rounded-[100%] bg-primary/20 blur-[150px]" />
                        </motion.div>
                    )}

                    {activeSection === 'footer' && (
                        <motion.div
                            key="footer"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="absolute inset-0 w-full h-full bg-gradient-to-t from-[#0a0a0a] via-[#121212] to-[#1a1a1a]"
                        >
                            <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] rounded-[100%] bg-primary/10 blur-[120px]" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
