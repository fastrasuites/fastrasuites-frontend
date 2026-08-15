"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "./motion/MotionWrappers";

export default function StartFreeCTA() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#F6F6F6] px-4 sm:px-6 md:px-12 text-center overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col items-center w-full">
        {/* Heading */}
        <FadeIn delay={0.05} distance={18}>
          <h2 className="text-2xl sm:text-4xl lg:text-[38px] font-bold text-[#161C2D] tracking-tight mb-3 sm:mb-4 leading-tight">
            Start free. Scale when you&apos;re ready.
          </h2>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.12} distance={18}>
          <p className="text-[13.5px] sm:text-[15px] text-[#5A6578] leading-relaxed max-w-2xl mb-7 sm:mb-8 font-normal">
            Core covers the full request-to-payment workflow. Enterprise adds full
            procurement, sales, HR, and asset management — all on the same
            connected data.
          </p>
        </FadeIn>

        {/* CTA Button */}
        <FadeIn delay={0.18} distance={15} className="w-full sm:w-auto">
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="#pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#4285F4] hover:bg-[#3367D6] text-white font-medium text-[14px] sm:text-[14.5px] px-8 py-3.5 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 cursor-pointer text-center"
            >
              See Plans and Pricing
            </Link>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
