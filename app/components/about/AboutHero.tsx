"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeIn } from "../motion/MotionWrappers";
import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative bg-[#0B1221] text-white pt-28 pb-12 md:pt-40 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12">
      {/* Background Image Layer */}
      <motion.div
        initial={{ scale: 1, x: 0, y: 0 }}
        animate={{ scale: [1, 1.05, 1], x: [0, 15, -10, 0], y: [0, -15, 10, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
      >
        <Image
          src="/about_hero_bg.png" // User provided image
          alt="People working in an office"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[#0B1221]/70 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1524]/90 via-transparent to-[#0B1221]/90 z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <FadeIn delay={0.1} distance={30} direction="up">
          <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold tracking-tight leading-[1.12]">
            Built for the way project-based
            <br className="hidden sm:inline" /> work actually happens
          </h1>
        </FadeIn>
      </div>
    </section>
  );
}
