"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeIn } from "../motion/MotionWrappers";
import Image from "next/image";

export default function FAQHero() {
  return (
    <section className="relative bg-[#0c1524] text-white pt-28 pb-16 md:pt-40 md:pb-36 overflow-hidden flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12">
      {/* Background Image Layer */}
      <motion.div
        initial={{ scale: 1, x: 0, y: 0 }}
        animate={{ scale: [1, 1.05, 1], x: [0, 15, -10, 0], y: [0, -15, 10, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
      >
        <Image
          src="/hero_bg.jpg" // Or about_scenario_photo.jpg, keeping consistent with dark theme
          alt="Engineering background"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </motion.div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1524]/90 via-[#0c1524]/60 to-[#0c1524] pointer-events-none z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <FadeIn delay={0.1} distance={20} direction="up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight leading-[1.1] mb-6">
            Frequently asked questions
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.2} distance={20} direction="up">
          <p className="text-gray-300 text-[16px] sm:text-[18px] md:text-[20px] max-w-2xl leading-relaxed mb-4">
            Everything you need to know before getting started.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
