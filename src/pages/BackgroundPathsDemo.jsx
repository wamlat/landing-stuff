/**
 * Background Paths Demo Page
 * Shows the exact effect from the code you provided
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GooeyText } from '@/components/ui/gooey-text-morphing';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { WaitlistModal } from '@/components/ui/WaitlistModal';
import { X } from 'lucide-react';

// About Panel Modal Component
function AboutPanelModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-[80vh] rounded-2xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden"
            style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 pointer-events-none" />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-[100] p-2 rounded-full bg-white/20 dark:bg-neutral-800/40 hover:bg-white/40 dark:hover:bg-neutral-700/60 transition-colors backdrop-blur-sm shadow-md"
              aria-label="Close"
            >
              <X size={20} className="text-neutral-900 dark:text-white" />
            </button>

            <div className="relative z-10 p-8 h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-white">
                  About Onyma
                </h2>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      Our Vision
                    </h3>
                    <p className="text-sm leading-relaxed mb-2">
                      Onyma is reinventing how people master spelling, vocabulary, and language through interactive games, an AI coach, and real linguistics.
                    </p>
                    <p className="text-sm leading-relaxed font-semibold text-blue-800 dark:text-blue-200">
                      We plan to launch in early 2026.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800">
                    <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                      Our Features
                    </h3>
                    <p className="text-sm leading-relaxed">
                      Onyma is the most comprehensive word learning platform ever built, with over 200,000 words spanning spelling, vocabulary, and linguistic mastery. Our AI coach teaches the patterns and language concepts that power real understanding, not just memorization. Learners can speak words aloud in oral spelling mode, compete on live leaderboards, or use our core modules to prepare for SATs, spelling bees, or TOEFL.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
    const [isAboutOpen, setIsAboutOpen] = useState(false);

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

                    <div className="flex flex-col items-center gap-4">
                        {/* Learn More Button */}
                        <button
                            onClick={() => setIsAboutOpen(true)}
                            className="relative inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-md text-lg font-semibold transition-[color,box-shadow] px-8 py-3 bg-transparent hover:scale-105 duration-300 transition text-neutral-900 dark:text-white"
                            style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}
                            aria-label="Learn More"
                        >
                            <div className="absolute top-0 left-0 z-0 h-full w-full rounded-full 
                                shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] 
                            transition-all 
                            dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]" />
                            <div
                                className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-full"
                                style={{ backdropFilter: 'url("#learn-more-glass")' }}
                            />
                            <span className="pointer-events-none z-10">Learn More</span>
                            <svg className="hidden">
                                <defs>
                                    <filter
                                        id="learn-more-glass"
                                        x="0%"
                                        y="0%"
                                        width="100%"
                                        height="100%"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        <feTurbulence
                                            type="fractalNoise"
                                            baseFrequency="0.05 0.05"
                                            numOctaves="1"
                                            seed="1"
                                            result="turbulence"
                                        />
                                        <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
                                        <feDisplacementMap
                                            in="SourceGraphic"
                                            in2="blurredNoise"
                                            scale="70"
                                            xChannelSelector="R"
                                            yChannelSelector="B"
                                            result="displaced"
                                        />
                                        <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
                                        <feComposite in="finalBlur" in2="finalBlur" operator="over" />
                                    </filter>
                                </defs>
                            </svg>
                        </button>

                        {/* Join Waitlist Button */}
                        <LiquidButton 
                            onClick={() => setIsModalOpen(true)}
                            className="text-lg font-semibold text-neutral-900 dark:text-white"
                            style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}
                        >
                            Join Waitlist
                        </LiquidButton>
                    </div>
                </motion.div>
            </div>

            {/* Waitlist Modal */}
            <WaitlistModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />

            {/* About Panel Modal */}
            <AboutPanelModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
        </div>
    );
}

export default BackgroundPaths;
