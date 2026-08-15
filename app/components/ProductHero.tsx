"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeIn } from "./motion/MotionWrappers";

export default function ProductHero() {
  return (
    <section className="relative bg-[#0c1524] text-white pt-28 pb-12 md:pt-40 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12">
      {/* Background Image Layer */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url('/product/hero-bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1524] via-[#0c1524]/80 to-[#0c1524] z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <FadeIn delay={0.05} distance={20}>
          <h1 className="text-[32px] sm:text-[44px] md:text-[50px] font-bold tracking-tight leading-[1.15] mb-6">
            The tools behind your projects,
            <br className="hidden sm:inline" /> connected
          </h1>
        </FadeIn>

        <FadeIn delay={0.15} distance={20}>
          <p className="text-gray-300 text-[14.5px] sm:text-[16px] leading-relaxed max-w-3xl">
            Search our growing suite of features to see how FastraSuite helps your 
            entire team work together, stay aligned, and make sure projects run without a hitch. 
            If you can&apos;t find what you are looking for, tell us and we&apos;ll see if it&apos;s already 
            on our product roadmap.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
