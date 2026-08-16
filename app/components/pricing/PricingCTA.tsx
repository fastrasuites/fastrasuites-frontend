"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "../motion/MotionWrappers";

export default function PricingCTA() {
  return (
    <section className="relative py-12 sm:py-32 md:py-32 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background Image Container */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/cta_workers_clean.png" // using existing CTA background image
          alt="Professionals in an office"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#0c1524]/85" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full">
        {/* Pill */}
        <FadeIn delay={0.05} distance={15}>
          <div className="inline-flex items-center justify-center bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-8">
            How it works
          </div>
        </FadeIn>

        <FadeIn delay={0.1} distance={20}>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight mb-6 leading-snug">
            Try it free for 14 days, no card required
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} distance={20}>
          <p className="text-gray-300 text-[15px] sm:text-[16px] leading-relaxed max-w-3xl mb-10 text-balance">
            Sign up and get instant access to the Core plan for 14 days, completely free. No card detail is needed to start. 
            At the end of your trial, choose to continue on Core, upgrade to Enterprise, or simply let your trial expire. If 
            you decide to subscribe, you&apos;ll be asked for payment details at that point, not before.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} distance={15} className="w-full sm:w-auto">
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
