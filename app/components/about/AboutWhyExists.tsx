"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn, EASING } from "../motion/MotionWrappers";

export default function AboutWhyExists() {
  return (
    <section className="py-12 md:py-32 bg-white px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
        
        {/* Left Content */}
        <div className="flex-1 max-w-xl">
          <FadeIn delay={0.1} distance={20} direction="up">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#161C2D] tracking-tight mb-6">
              Why FastraSuite exists
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2} distance={20} direction="up">
            <p className="text-gray-600 text-[15px] sm:text-[16px] leading-relaxed">
              Most software built for tracking project spend was built for someone in an office, 
              reconciling numbers after the fact. FastraSuite was built for the request happening 
              on-site right now, checked against a live budget before it&apos;s approved — not 
              discovered as an overrun weeks later.
            </p>
          </FadeIn>
        </div>

        {/* Right Image */}
        <FadeIn delay={0.3} distance={30} direction="left" className="flex-1 w-full flex justify-end">
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.4, ease: EASING.smooth }}
            className="relative w-full max-w-[500px] h-[360px] sm:h-[400px] md:h-[460px] rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-gray-100"
          >
            <Image
              src="/about_scenario_photo.jpg" // User provided image
              alt="Construction professional reviewing plans"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </FadeIn>
        
      </div>
    </section>
  );
}
