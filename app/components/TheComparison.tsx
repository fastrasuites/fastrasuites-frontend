"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeIn, EASING } from "./motion/MotionWrappers";

interface ComparisonRow {
  oldWay: string;
  fastraSuite: string;
}

const COMPARISONS: ComparisonRow[] = [
  {
    oldWay: "Approvals happen over WhatsApp",
    fastraSuite:
      "Structured approval queue, checked against budget automatically",
  },
  {
    oldWay:
      "Budgets live in someone's Excel file, updated whenever someone remembers",
    fastraSuite:
      "Live budget, updated in real time as requests, purchases, and payments happen",
  },
  {
    oldWay:
      "Receipts sit in a truck dashboard until someone remembers to submit them",
    fastraSuite:
      "Digital record, attached and tracked from the moment a request is raised",
  },
  {
    oldWay: "Stock levels are a guess until someone does a physical count",
    fastraSuite:
      "Real-time inventory, updated on every delivery and every consumption",
  },
  {
    oldWay: "Vendor payments tracked across spreadsheets and memory",
    fastraSuite: "One Payment Queue, sorted by what's actually due",
  },
];

export default function TheComparison() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: EASING.smooth,
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-white px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Category Pill */}
        <FadeIn delay={0.05} distance={15}>
          <div className="inline-flex items-center justify-center bg-[#DBEAFE]/70 text-[#3B7CED] text-[13px] font-medium px-4 py-1 rounded-full mb-4">
            The Comparison
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.12} distance={18}>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#161C2D] tracking-tight mb-12 sm:mb-16 text-center leading-tight">
            The old way vs FastraSuite
          </h2>
        </FadeIn>

        {/* Comparison Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASING.smooth }}
          className="w-full max-w-[1040px] bg-white border border-gray-200 rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.03)]"
        >
          {/* Desktop Header Row (Hidden on mobile) */}
          <div className="hidden md:grid grid-cols-2 border-b border-gray-150">
            <div className="px-6 sm:px-8 py-4.5 text-[14px] font-bold text-[#5A6578] bg-[#F9FAFB] border-r border-gray-150">
              The Old Way
            </div>
            <div className="px-6 sm:px-8 py-4.5 text-[14px] font-bold text-[#3B7CED] bg-white">
              FastraSuite
            </div>
          </div>

          {/* Comparison Rows */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="divide-y divide-gray-150"
          >
            {COMPARISONS.map((row, idx) => (
              <motion.div
                key={idx}
                variants={rowVariants}
                className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 group hover:bg-blue-50/20 transition-colors"
              >
                {/* The Old Way Cell */}
                <div className="px-5 sm:px-8 py-4 sm:py-5 flex flex-col md:flex-row items-start gap-2.5 sm:gap-3.5 bg-[#F9FAFB]/60 md:border-r border-gray-150">
                  {/* Mobile Badge */}
                  <span className="inline-flex md:hidden text-[10px] uppercase font-bold text-[#EF4444] bg-red-50 px-2 py-0.5 rounded-full mb-1">
                    The Old Way
                  </span>
                  <div className="flex items-start gap-3 w-full">
                    <motion.svg
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                      className="w-4 h-4 text-[#F87171] shrink-0 mt-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </motion.svg>
                    <span className="text-[13px] sm:text-[14px] text-[#5A6578] leading-relaxed">
                      {row.oldWay}
                    </span>
                  </div>
                </div>

                {/* FastraSuite Cell */}
                <div className="px-5 sm:px-8 py-4 sm:py-5 flex flex-col md:flex-row items-start gap-2.5 sm:gap-3.5 bg-white group-hover:bg-blue-50/10 transition-colors">
                  {/* Mobile Badge */}
                  <span className="inline-flex md:hidden text-[10px] uppercase font-bold text-[#3B7CED] bg-blue-50 px-2 py-0.5 rounded-full mb-1">
                    FastraSuite
                  </span>
                  <div className="flex items-start gap-3 w-full">
                    <motion.svg
                      whileHover={{ scale: 1.25 }}
                      transition={{ duration: 0.2 }}
                      className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </motion.svg>
                    <span className="text-[13px] sm:text-[14px] text-[#161C2D] font-normal leading-relaxed">
                      {row.fastraSuite}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
