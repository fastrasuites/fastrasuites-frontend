"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn, EASING } from "./motion/MotionWrappers";

export default function ProductCTA() {
  return (
    <section className="relative bg-[#0B1528] py-12 sm:py-28 md:py-28 px-4 sm:px-6 md:px-12 overflow-hidden flex flex-col items-center">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1528] via-[#0c1a36] to-[#0B1528] pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Top Badge */}
        <FadeIn delay={0.05} distance={15}>
          <div className="inline-flex items-center justify-center bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
            Future Focused
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.1} distance={20}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight mb-5">
            FastraSuite is growing with your business
          </h2>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.15} distance={20}>
          <p className="text-gray-400 text-[14px] sm:text-[15px] max-w-2xl mx-auto leading-relaxed mb-14">
            Tell us the workflows you wish existed, we may already be building it. If we aren&apos;t, 
            it goes straight to our product roadmap. Requesting features is easier than managing 
            things the hard way.
          </p>
        </FadeIn>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl text-left">
          
          {/* Card 1 */}
          <FadeIn delay={0.2} distance={20} direction="up" className="h-full">
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: EASING.smooth }}
              className="bg-white rounded-2xl p-7 sm:p-8 flex flex-col h-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-100 transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-[#161C2D]">Talk to Sales</h3>
                <span className="bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  SUPPORTED
                </span>
              </div>
              <p className="text-gray-600 text-[14px] leading-relaxed mb-6 flex-grow">
                Tell us how you manage the budget of your business right now. You can&apos;t improve 
                what you don&apos;t track, we will set it up for you.
              </p>
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="#sales"
                  className="inline-flex items-center justify-center bg-[#4285F4] hover:bg-[#3367D6] text-white font-medium text-[14px] px-6 py-3 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/45 transition-all duration-200 cursor-pointer text-center gap-2"
                >
                  Contact Sales
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </FadeIn>

          {/* Card 2 */}
          <FadeIn delay={0.3} distance={20} direction="up" className="h-full">
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: EASING.smooth }}
              className="bg-white rounded-2xl p-7 sm:p-8 flex flex-col h-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-100 transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-[#161C2D]">View More Features</h3>
                <span className="bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  AVAILABLE
                </span>
              </div>
              <p className="text-gray-600 text-[14px] leading-relaxed mb-6 flex-grow">
                Explore all our current features and how to make the most of it to improve how 
                your business handles the day to day activities.
              </p>
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium text-[14px] px-6 py-3 rounded-xl shadow-sm transition-all duration-200 cursor-pointer text-center gap-2"
                >
                  Explore Features
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
