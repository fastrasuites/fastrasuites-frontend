"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FadeIn, EASING, StaggerContainer, StaggerItem, TiltCard } from "./motion/MotionWrappers";

export type ThemeColor = "blue" | "green" | "yellow" | "purple";

interface ProductScenarioSectionProps {
  activeCategory: "Purchase Requests" | "Project Tracking" | "Finance" | "Executives";
  theme: ThemeColor;
  title: React.ReactNode;
  description: string;
  benefits: string[];
  imageSrc: string;
  imageAlt: string;
}

const CATEGORIES = [
  "Purchase Requests",
  "Project Tracking",
  "Finance",
  "Executives",
];

const THEME_STYLES = {
  blue: {
    text: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    highlight: "bg-blue-100",
    check: "text-blue-500",
    sectionBg: "bg-white",
  },
  green: {
    text: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    highlight: "bg-green-100",
    check: "text-green-500",
    sectionBg: "bg-white",
  },
  yellow: {
    text: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-200",
    highlight: "bg-amber-100",
    check: "text-amber-500",
    sectionBg: "bg-white",
  },
  purple: {
    text: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    highlight: "bg-purple-100",
    check: "text-purple-500",
    sectionBg: "bg-white",
  },
};

export default function ProductScenarioSection({
  activeCategory,
  theme,
  title,
  description,
  benefits,
  imageSrc,
  imageAlt,
}: ProductScenarioSectionProps) {
  const styles = THEME_STYLES[theme];

  return (
    <section className={`py-12 md:py-24 px-4 sm:px-6 md:px-12 overflow-hidden ${styles.sectionBg}`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Content */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          
          {/* Category Tabs */}
          <FadeIn delay={0.05} distance={15} className="w-full">
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {CATEGORIES.map((cat) => {
                const isActive = cat === activeCategory;
                return (
                  <div
                    key={cat}
                    className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors border ${
                      isActive
                        ? `${styles.bg} ${styles.text} ${styles.border}`
                        : "bg-transparent text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600"
                    }`}
                  >
                    {cat}
                  </div>
                );
              })}
            </div>
          </FadeIn>

          {/* Title */}
          <FadeIn delay={0.1} distance={20} className="w-full">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#161C2D] tracking-tight leading-[1.18] mb-5">
              {title}
            </h2>
          </FadeIn>

          {/* Description Block */}
          <FadeIn delay={0.15} distance={20} className="w-full">
            <div className={`p-5 rounded-xl ${styles.bg} border ${styles.border} mb-6`}>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${styles.text} block mb-2 opacity-80`}>
                SCENARIO
              </span>
              <p className="text-[#333d4e] text-[14.5px] leading-[1.65] font-normal">
                {description}
              </p>
            </div>
          </FadeIn>

          {/* Benefits List */}
          <div className="w-full">
            <FadeIn delay={0.2} distance={10}>
              <p className="text-[13px] text-gray-500 font-semibold mb-3">
                What this actually means:
              </p>
            </FadeIn>
            <StaggerContainer delayChildren={0.25} staggerDelay={0.08} className="flex flex-col gap-3.5 mb-2">
              {benefits.map((benefit, idx) => (
                <StaggerItem key={idx} distance={10} className="flex items-start gap-3 group">
                  <div className={`shrink-0 mt-0.5 w-4 h-4 rounded flex items-center justify-center ${styles.check}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-[14px] text-gray-700 leading-snug group-hover:text-black transition-colors">
                    {benefit}
                  </span>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end w-full relative">
          <FadeIn delay={0.3} distance={40} direction="up" className="w-full max-w-[500px]">
            <TiltCard maxTilt={6} scaleOnHover={1.02}>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-gray-100/50">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </TiltCard>
          </FadeIn>
        </div>
        
      </div>
    </section>
  );
}
