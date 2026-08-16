"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "./motion/MotionWrappers";

export default function FinalCTA() {
  return (
    <section className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background Image Container with Slow Cinematic Drift */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/cta_workers_clean.png"
          alt="Project and construction professionals"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Dark Blue Overlay */}
        <div className="absolute inset-0 bg-[#0B2144]/85" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center w-full">
        <FadeIn delay={0.05} distance={20}>
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-semibold text-white tracking-tight mb-7 sm:mb-8 leading-snug max-w-2xl text-center">
            Every day you wait is a request, a receipt, or a naira that slips
            through.
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} distance={15} className="w-full sm:w-auto">
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="https://fastra-suite-new.vercel.app/"
              className="inline-flex items-center justify-center gap-2 bg-[#3b82f6] text-white px-8 py-4 rounded-xl font-semibold text-[16px] hover:bg-blue-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all group"
            >
              Start Your Free 14-Day Trial
            </Link>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
