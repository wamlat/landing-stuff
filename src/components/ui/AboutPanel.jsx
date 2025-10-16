"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info } from 'lucide-react';

export function AboutPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Learn More Button - Liquid Glass Style */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
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
            style={{ backdropFilter: 'url("#container-glass")' }}
          />
          <span className="pointer-events-none z-10">Learn More</span>
          <svg className="hidden">
            <defs>
              <filter
                id="container-glass"
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
      </div>

      {/* About Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
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
              {/* Glass Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 pointer-events-none" />
              
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-[100] p-2 rounded-full bg-white/20 dark:bg-neutral-800/40 hover:bg-white/40 dark:hover:bg-neutral-700/60 transition-colors backdrop-blur-sm shadow-md"
                aria-label="Close"
              >
                <X size={20} className="text-neutral-900 dark:text-white" />
              </button>

              {/* Content */}
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
    </>
  );
}
