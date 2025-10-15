/**
 * Background Paths Demo Page
 * Shows the exact effect from the code you provided
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GooeyText } from '@/components/ui/gooey-text-morphing';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { WaitlistModal } from '@/components/ui/WaitlistModal';

function FloatingPaths({ position }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-slate-950 dark:text-white"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Welcome to Onyma",
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center -mt-48 md:-mt-52">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="mb-8">
                        <GooeyText
                            texts={["Welcome", "to", "Onyma"]}
                            morphTime={1.5}
                            cooldownTime={1}
                            className="h-[240px] md:h-[320px] flex items-center justify-center"
                            textClassName="font-bold tracking-tight text-6xl md:text-[80pt] text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-700/80 dark:from-white dark:to-white/80"
                            style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}
                        />
                    </div>

                    <div className="flex justify-center">
                        <LiquidButton 
                            onClick={() => setIsModalOpen(true)}
                            className="text-lg font-semibold text-neutral-900 dark:text-white"
                            style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}
                        >
                            Join Waitlist →
                        </LiquidButton>
                    </div>
                </motion.div>
            </div>

            {/* Waitlist Modal */}
            <WaitlistModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
}

export default BackgroundPaths;
