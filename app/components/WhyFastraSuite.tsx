"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeIn, EASING } from "./motion/MotionWrappers";
import SpotlightCard from "./motion/SpotlightCard";

interface WhyFastraItem {
  boldText: string;
  regularText: string;
}

const WHY_FASTRA_ITEMS: WhyFastraItem[] = [
  {
    boldText: "Built specifically for project-based work,",
    regularText: " not adapted from generic accounting software.",
  },
  {
    boldText: "Mobile-first request management,",
    regularText:
      " designed for low-end Android phones and unreliable site connectivity.",
  },
  {
    boldText: "Budget checks happen before approval, not after —",
    regularText:
      " overspending gets caught at the request, not the reconciliation.",
  },
  {
    boldText: "Project-first architecture.",
    regularText:
      " Every number traces back to a specific project and activity.",
  },
  {
    boldText: "Import your project budget directly from Excel.",
    regularText: " No manual re-entry of a structure you've already built.",
  },
  {
    boldText: "A single trail from request to payment.",
    regularText:
      " Nothing to reconcile across five different tools at month-end.",
  },
];

export default function WhyFastraSuite() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: EASING.smooth,
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-[#F6F6F6] px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Category Pill */}
        <FadeIn delay={0.05} distance={15}>
          <div className="inline-flex items-center justify-center bg-[#DBEAFE]/70 text-[#3B7CED] text-[13px] font-medium px-4 py-1 rounded-full mb-4">
            Why FastraSuite
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.12} distance={18}>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#161C2D] tracking-tight mb-14 sm:mb-16 text-center max-w-3xl leading-tight">
            Why project-based businesses choose FastraSuite over a general-purpose ERP
          </h2>
        </FadeIn>

        {/* 2-Column Cards Grid with Spotlight */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full max-w-[1040px]"
        >
          {WHY_FASTRA_ITEMS.map((item, idx) => (
            <motion.div key={idx} variants={cardVariants} className="w-full h-full">
              <SpotlightCard
                whileHover={{
                  y: -4,
                  scale: 1.012,
                  boxShadow: "0 12px 28px -4px rgba(0,0,0,0.06)",
                }}
                transition={{ duration: 0.2 }}
                spotlightColor="59, 124, 237"
                spotlightSize={320}
                spotlightAlpha={0.08}
                className="bg-white border border-gray-200 rounded-[20px] p-6 sm:p-7 flex items-start gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-blue-200 transition-colors cursor-default group"
              >
                {/* Blue Checkmark Circle Icon */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  className="w-5 h-5 rounded-full bg-[#3B7CED] flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:shadow-[0_0_12px_rgba(59,124,237,0.4)] transition-shadow relative z-10"
                >
                  <svg
                    className="w-3 h-3 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>

                {/* Text */}
                <p className="text-[14px] sm:text-[14.5px] leading-[1.6] text-[#5A6578] relative z-10">
                  <strong className="font-bold text-[#161C2D]">
                    {item.boldText}
                  </strong>
                  {item.regularText}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
