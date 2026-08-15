"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeIn } from "../motion/MotionWrappers";
import Image from "next/image";

export default function PricingHero() {
  return (
    <section className="relative bg-[#0c1524] text-white pt-28 pb-12 md:pt-40 md:pb-36 overflow-hidden flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12">
      {/* Background Image Layer */}
      <motion.div
        initial={{ scale: 1, x: 0, y: 0 }}
        animate={{ scale: [1, 1.05, 1], x: [0, 15, -10, 0], y: [0, -15, 10, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
      >
        <Image
          src="/hero_bg.jpg" // Placeholder for pricing hero background
          alt="Professionals in an office"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1524]/95 via-[#0c1524]/85 to-[#0c1524]/95 z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <FadeIn delay={0.05} distance={20} direction="up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight leading-[1.15] mb-6 text-balance">
            Two ways to run FastraSuite,
            <br className="hidden sm:inline" /> both cover the full spending loop
          </h1>
        </FadeIn>

        <FadeIn delay={0.15} distance={20} direction="up">
          <p className="text-gray-300 text-[14.5px] sm:text-[16px] leading-relaxed max-w-3xl text-balance">
            Whether you&apos;re a single site team getting started or a company managing 
            procurement across multiple projects, FastraSuite scales with you. Start free for 14 
            days, no card required. Upgrade anytime, your data comes with you.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
