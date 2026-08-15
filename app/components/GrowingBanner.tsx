"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "./motion/MotionWrappers";

export default function GrowingBanner() {
  return (
    <section className="bg-[#3B82F6] py-10 px-4 sm:px-12 md:px-16 overflow-hidden relative">
      {/* Subtle ambient light gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-transparent to-blue-400 opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        {/* Text Content */}
        <FadeIn delay={0.05} distance={15} className="flex flex-col gap-2 max-w-3xl text-left">
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            FastraSuite is growing
          </h3>
          <p className="text-white/90 text-[13.5px] sm:text-[14px] leading-relaxed font-normal">
            We&apos;re actively building beyond what you see today. If
            there&apos;s a workflow you wish FastraSuite handled, tell us, it
            might already be on the way.
          </p>
        </FadeIn>

        {/* CTA Button */}
        <FadeIn delay={0.12} distance={15} className="shrink-0 w-full sm:w-auto">
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="#feedback"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#0B1528] hover:bg-[#070D1A] text-white font-medium text-[13.5px] sm:text-[14px] px-6 py-3.5 sm:py-3 rounded-xl transition-all shadow-md shadow-black/20 hover:shadow-lg cursor-pointer text-center"
            >
              Tell us what you need
            </Link>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
