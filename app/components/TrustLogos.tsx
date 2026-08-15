"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "./motion/MotionWrappers";

export default function TrustLogos() {
  return (
    <section className="py-12 sm:py-16 bg-white px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-5 sm:gap-6 text-center">
        {/* Subtitle */}
        <FadeIn delay={0.05} distance={15}>
          <p className="text-[12.5px] sm:text-[13px] text-[#5A6578] font-normal tracking-normal">
            Trusted by construction and project teams
          </p>
        </FadeIn>

        {/* Logos Row with Fluid Responsive Gaps */}
        <FadeIn delay={0.15} distance={18}>
          <div className="flex items-center justify-center gap-8 sm:gap-16 md:gap-24 opacity-75 hover:opacity-100 transition-opacity">
            {/* Amazon Logo 1 */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="relative h-5 sm:h-7 w-16 sm:w-24 transition-transform shrink-0"
            >
              <Image
                src="/logos/amazon.png"
                alt="Amazon"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Google Logo */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="relative h-5 sm:h-7 w-16 sm:w-24 transition-transform shrink-0"
            >
              <Image
                src="/logos/google.png"
                alt="Google"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Amazon Logo 2 */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="relative h-5 sm:h-7 w-16 sm:w-24 transition-transform shrink-0"
            >
              <Image
                src="/logos/amazon.png"
                alt="Amazon"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
