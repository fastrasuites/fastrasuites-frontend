"use client";

import React from "react";
import { FadeIn } from "../motion/MotionWrappers";
import Image from "next/image";

export default function PricingHero() {
  return (
    <section className="relative bg-[#0c182a] text-white pt-36 pb-24 md:pt-48 md:pb-36 overflow-hidden flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Right-aligned image with multiply blend */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-[85%] lg:w-[72%] h-full">
          <Image
            src="/pricing_hero_raw.png"
            alt="Professional celebrating at desk"
            fill
            priority
            className="object-cover object-[75%_center] mix-blend-multiply opacity-75"
            sizes="100vw"
          />
        </div>
        {/* Deep blue color wash and gradient overlays */}
        <div className="absolute inset-0 bg-[#0c182a]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c182a] via-[#0c182a]/85 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c182a]/70 via-transparent to-[#0c182a] z-[1]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <FadeIn delay={0.05} distance={20} direction="up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold tracking-tight leading-[1.15] mb-6 text-balance text-white">
            Two ways to run FastraSuite,
            <br className="hidden sm:inline" /> both cover the full spending loop
          </h1>
        </FadeIn>

        <FadeIn delay={0.15} distance={20} direction="up">
          <p className="text-gray-400 text-sm sm:text-lg md:text-xl leading-relaxed  mx-auto text-balance font-normal">
            Whether you&apos;re a single-site team getting started or a company managing procurement across multiple projects, FastraSuite scales with you. Start free for 14 days, no card required. Upgrade anytime, your data comes with you.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
