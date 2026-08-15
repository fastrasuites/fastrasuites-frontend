"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeIn, EASING } from "../motion/MotionWrappers";
import { Clock, Link2, Smartphone } from "lucide-react";

export default function AboutBeliefs() {
  const beliefs = [
    {
      icon: Clock,
      iconBg: "bg-red-50 text-red-500",
      title: "Spending controls should happen before the money leaves, not after.",
      description: "Most financial software is built to record what already happened. We built FastraSuite to check what's about to happen, before it does."
    },
    {
      icon: Link2,
      iconBg: "bg-blue-50 text-blue-500",
      title: "The field and the office should run on the same data.",
      description: "Not a summary — the same live numbers in the field and the office."
    },
    {
      icon: Smartphone,
      iconBg: "bg-indigo-50 text-indigo-500",
      title: "Software for project-based work shouldn't assume a desk and a stable connection.",
      description: "If it doesn't work on a low-end phone with patchy signal, it doesn't work for the people who actually need it most."
    }
  ];

  return (
    <section className="py-12 md:py-32 bg-white px-4 sm:px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-6xl mx-auto flex flex-col items-center w-full text-center">
        
        {/* Heading */}
        <FadeIn delay={0.1} distance={20}>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#161C2D] tracking-tight mb-16">
            What we believe
          </h2>
        </FadeIn>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-left">
          {beliefs.map((belief, idx) => (
            <FadeIn key={idx} delay={0.15 + (idx * 0.1)} distance={20} direction="up" className="h-full">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: EASING.smooth }}
                className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col h-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow duration-300"
              >
                {/* Icon */}
                <div className="relative w-12 h-12 mb-6">
                  {/* Subtle pulsing background */}
                  <motion.div
                    className={`absolute inset-0 rounded-full ${belief.iconBg} opacity-50`}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                  />
                  <div className={`relative w-full h-full rounded-full flex items-center justify-center shadow-sm ${belief.iconBg}`}>
                    <belief.icon className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                </div>
                
                {/* Text */}
                <h3 className="text-lg font-bold text-[#161C2D] leading-snug mb-4">
                  {belief.title}
                </h3>
                <p className="text-gray-500 text-[14.5px] leading-relaxed">
                  {belief.description}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
