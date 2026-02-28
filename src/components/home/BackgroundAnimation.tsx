'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 300;

export function BackgroundAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            const paddedNumber = String(i).padStart(3, '0');
            img.src = `/frames/ezgif-frame-${paddedNumber}.png`;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === 1) {
                    drawFrame(0);
                }
            };
            images.push(img);
        }

        imagesRef.current = images;
    }, []);

    const drawFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const image = imagesRef.current[index];

        if (canvas && ctx && image && image.complete) {
            // Calculate aspect ratio to cover the screen
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = image.width / image.height;

            let renderWidth = canvas.width;
            let renderHeight = canvas.height;
            let offsetX = 0;
            let offsetY = 0;

            if (canvasRatio > imgRatio) {
                // Canvas is wider than image
                renderHeight = canvas.width / imgRatio;
                offsetY = (canvas.height - renderHeight) / 2;
            } else {
                // Canvas is taller than image
                renderWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - renderWidth) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, offsetX, offsetY, renderWidth, renderHeight);
        }
    };

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (canvas && container) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                drawFrame(Math.round(canvasAnimationProgress.current.frame));
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial sizing

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const canvasAnimationProgress = useRef({ frame: 0 });

    useGSAP(() => {
        if (!canvasRef.current || !containerRef.current) return;

        // Scrub across the ENTIRE document height
        ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
            animation: gsap.to(canvasAnimationProgress.current, {
                frame: FRAME_COUNT - 1,
                ease: 'none',
                onUpdate: () => {
                    drawFrame(Math.round(canvasAnimationProgress.current.frame));
                }
            })
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="fixed inset-0 w-full h-full z-[-1] bg-white overflow-hidden pointer-events-none">
            <canvas
                ref={canvasRef}
                className="w-full h-full object-cover mix-blend-multiply opacity-100"
            />
        </div>
    );
}
