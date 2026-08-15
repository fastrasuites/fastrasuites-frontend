"use client";

import React from "react";
import { FadeIn } from "../motion/MotionWrappers";

export default function AboutMission() {
  return (
    <section className="py-12 md:py-32 bg-[#1B438D] text-white px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Pill */}
        <FadeIn delay={0.05} distance={15}>
          <div className="inline-flex items-center justify-center bg-white/10 border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-8">
            Mission
          </div>
        </FadeIn>

        {/* Quote */}
        <FadeIn delay={0.15} distance={20} direction="up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-semibold tracking-tight leading-[1.3] text-white/95 text-balance">
            “Every project should know, in real time, whether it can afford what it just requested.”
          </h2>
        </FadeIn>
        
      </div>
    </section>
  );
}
