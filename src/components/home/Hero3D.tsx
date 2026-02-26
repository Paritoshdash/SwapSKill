'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Text, Text3D, Center, RoundedBox, Environment, ContactShadows, PresentationControls } from '@react-three/drei';
import { Button } from '@/components/ui/Button';

function GlassScreen() {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.1, 0.1]}>
            <group position={[0, 0, 0]}>
                {/* Luminous blue halo ring behind the screen */}
                <mesh position={[0, 0, -0.5]}>
                    <ringGeometry args={[3, 3.2, 64]} />
                    <meshBasicMaterial color="#0088ff" transparent opacity={0.8} />
                </mesh>

                <mesh position={[0, 0, -1]}>
                    <torusGeometry args={[3.1, 0.05, 16, 100]} />
                    <meshStandardMaterial color="#00aaff" emissive="#00aaff" emissiveIntensity={2} />
                </mesh>

                {/* Main glass display */}
                <RoundedBox args={[7, 3.5, 0.2]} radius={0.15} smoothness={4}>
                    <meshPhysicalMaterial
                        color="#0a1526"
                        metalness={0.9}
                        roughness={0.1}
                        transmission={0.95} // glass effect
                        thickness={0.5}
                        envMapIntensity={2}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                    />
                </RoundedBox>

                {/* 3D Model Typography across the screen */}
                <Center position={[0, 0.3, 0.25]}>
                    <Text3D
                        font="/fonts/optimer_bold.typeface.json"
                        size={0.7}
                        height={0.15}
                        curveSegments={12}
                        bevelEnabled
                        bevelThickness={0.02}
                        bevelSize={0.02}
                        bevelOffset={0}
                        bevelSegments={5}
                        letterSpacing={0.05}
                    >
                        SKILLSWAP
                        <meshPhysicalMaterial 
                            color="#ffffff" 
                            emissive="#e0f0ff" 
                            emissiveIntensity={0.3} 
                            metalness={0.8}
                            roughness={0.1}
                            clearcoat={1}
                            clearcoatRoughness={0.1}
                        />
                    </Text3D>
                </Center>

                <Text
                    position={[0, -0.4, 0.2]}
                    fontSize={0.2}
                    letterSpacing={0.05}
                    color="#88aaff"
                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
                >
                    Swap knowledge. Learn faster. Grow together.
                </Text>
            </group>
        </Float>
    );
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#e0f0ff" />
            <directionalLight position={[-10, -10, -5]} intensity={1} color="#0055ff" />
            <spotLight position={[0, 10, 10]} angle={0.3} penumbra={1} intensity={2} color="#00aaff" />

            <Environment preset="city" />

            <PresentationControls
                global
                rotation={[0.1, -0.2, 0]}
                polar={[-0.1, 0.2]}
                azimuth={[-0.3, 0.3]}
            >
                <GlassScreen />
            </PresentationControls>

            {/* Subtle glow particles */}
            <Sparkles count={150} scale={12} size={2} color="#66bfff" speed={0.4} opacity={0.6} />
            <Sparkles count={50} scale={10} size={4} color="#ffffff" speed={0.2} opacity={0.8} />

            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
        </>
    );
}

export function Hero3D() {
    return (
        <section className="relative w-full h-screen min-h-[800px] flex flex-col items-center justify-center bg-gradient-to-b from-[#020617] via-[#0f172a] to-black overflow-hidden pt-20">
            {/* 3D Canvas Element */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 6.2], fov: 45 }}>
                    <Scene />
                </Canvas>
            </div>

            {/* HTML Overlay Content */}
            <div className="relative z-10 flex flex-col items-center justify-end h-full pb-32 pointer-events-none">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto animate-fade-in-up">
                    <Button href="/signup" variant="primary" className="w-full sm:w-auto px-10 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        Get Started Free
                    </Button>
                    <Button href="#how-it-works" variant="outline" className="w-full sm:w-auto px-10 text-white border-white/20 hover:bg-white/10 backdrop-blur-md">
                        See How It Works
                    </Button>
                </div>

                {/* Decorative quick links */}
                <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-1 p-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-sm font-medium animate-fade-in-up pointer-events-auto shadow-[0_0_30px_rgba(0,136,255,0.15)]">
                    <span className="px-4 py-2 flex items-center gap-2 text-gray-300">
                        <span className="text-xl">🎓</span> Find Mentors
                    </span>
                    <span className="w-px h-4 bg-white/20 hidden sm:block"></span>
                    <span className="px-4 py-2 flex items-center gap-2 text-gray-300">
                        <span className="text-xl">🌟</span> Verified Skills
                    </span>
                    <span className="w-px h-4 bg-white/20 hidden sm:block"></span>
                    <span className="px-4 py-2 flex items-center gap-2 text-gray-300">
                        <span className="text-xl">🤝</span> 1-on-1 Sessions
                    </span>
                </div>
            </div>
        </section>
    );
}
