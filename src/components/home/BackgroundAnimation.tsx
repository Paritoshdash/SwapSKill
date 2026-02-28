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
                const currentFrame = Math.round(canvasAnimationProgress.current.frame);

                // If this is the absolute first frame to finish downloading (often NOT index 0!), 
                // draw it immediately so the user isn't staring at a blank teal background container!
                if (loadedCount === 1) {
                    drawFrame(i - 1);
                }

                // In addition, always attempt to draw the true target frame just in case it's what finished downloading.
                drawFrame(currentFrame);
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
                const rect = container.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
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
        <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none opacity-100 rounded-[40px] md:rounded-[60px]">
            <canvas
                ref={canvasRef}
                className="w-full h-full object-cover opacity-100 contrast-110 saturate-110 filter"
            />
        </div>
    );
}
