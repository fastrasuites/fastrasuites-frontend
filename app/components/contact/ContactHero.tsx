"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeIn } from "../motion/MotionWrappers";
import Image from "next/image";

export default function ContactHero() {
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
          src="/about_scenario_photo.jpg" // Using this to match the screenshot showing a smiling person
          alt="Professional checking data"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </motion.div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1524]/90 via-[#0c1524]/70 to-[#0c1524] pointer-events-none z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <FadeIn delay={0.1} distance={20} direction="up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight leading-[1.1] mb-6">
            Prefer a guided walkthrough first?
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.2} distance={20} direction="up">
          <p className="text-gray-300 text-[15px] sm:text-[16px] md:text-[18px] max-w-3xl leading-relaxed mb-4">
            You can start your free 14 day trial right now, no card required. But if you&apos;d rather see FastraSuite on your own numbers before diving in, or you&apos;re evaluating it for a larger team, tell us a bit about how you currently handle requests, budgets, and payments. We&apos;ll show you exactly where FastraSuite fits.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
