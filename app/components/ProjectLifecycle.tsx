"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn, EASING } from "./motion/MotionWrappers";

const ALL_STEPS = [
  { num: 1, label: "Planning" },
  { num: 2, label: "Budget" },
  { num: 3, label: "Request" },
  { num: 4, label: "Approval" },
  { num: 5, label: "Purchase" },
  { num: 6, label: "Receive" },
  { num: 7, label: "Consume" },
  { num: 8, label: "Pay" },
  { num: 9, label: "Reporting" },
];

const ROW_1_STEPS = ALL_STEPS.slice(0, 5);
const ROW_2_STEPS = ALL_STEPS.slice(5);

export default function ProjectLifecycle() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const ArrowIcon = () => (
    <div className="flex items-center justify-center text-white/50 shrink-0 mb-6 px-1 sm:px-2">
      <motion.svg
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </motion.svg>
    </div>
  );

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: EASING.smooth,
      },
    },
  };

  return (
    <section className="py-20 md:py-28 bg-[#0D3B8E] px-4 sm:px-6 md:px-12 text-white overflow-hidden relative">
      {/* Subtle decorative background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
        {/* Category Pill */}
        <FadeIn delay={0.05} distance={15}>
          <div className="inline-flex items-center justify-center bg-white/15 text-white/90 text-[13px] font-medium px-4 py-1 rounded-full mb-4 backdrop-blur-sm border border-white/20">
            The project lifecycle
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.12} distance={18}>
          <h2 className="text-3xl sm:text-4xl lg:text-[38px] font-semibold text-white tracking-tight text-center max-w-3xl leading-tight mb-14 sm:mb-16">
            Built around how a project actually runs, not how software wants it to run
          </h2>
        </FadeIn>

        {/* Mobile 3x3 Grid (<640px) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:hidden grid-cols-3 gap-y-7 gap-x-2 w-full max-w-[340px] mb-8"
        >
          {ALL_STEPS.map((step) => {
            const isHovered = hoveredStep === step.num;
            return (
              <motion.div
                key={step.num}
                variants={stepVariants}
                onClick={() => setHoveredStep(isHovered ? null : step.num)}
                className="flex flex-col items-center cursor-pointer select-none"
              >
                <div className="w-11 h-11 rounded-full border border-white/50 bg-white/10 flex items-center justify-center text-white font-semibold text-[15px] shadow-sm">
                  {step.num}
                </div>
                <span className="text-[12px] font-medium mt-1.5 text-center text-white/90">
                  {step.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Tablet and Desktop Steps Diagram Container (640px+) */}
        <div className="hidden sm:flex flex-col gap-8 sm:gap-10 items-center w-full max-w-3xl">
          {/* Row 1: Steps 1 to 5 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 w-full"
          >
            {ROW_1_STEPS.map((step, idx) => {
              const isHovered = hoveredStep === step.num;
              return (
                <React.Fragment key={step.num}>
                  <motion.div
                    variants={stepVariants}
                    whileHover={{ y: -4, scale: 1.05 }}
                    onMouseEnter={() => setHoveredStep(step.num)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className="flex flex-col items-center cursor-pointer group relative select-none"
                  >
                    <div className="relative flex items-center justify-center">
                      {isHovered && (
                        <motion.svg
                          initial={{ opacity: 0, rotate: 0 }}
                          animate={{ opacity: 1, rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          className="absolute -inset-1.5 w-[60px] h-[60px] pointer-events-none"
                          viewBox="0 0 60 60"
                        >
                          <circle
                            cx="30"
                            cy="30"
                            r="28"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.4)"
                            strokeWidth="1.5"
                            strokeDasharray="16 8"
                          />
                        </motion.svg>
                      )}

                      {isHovered && (
                        <motion.div
                          initial={{ scale: 1, opacity: 0.6 }}
                          animate={{ scale: 1.45, opacity: 0 }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                          className="absolute inset-0 rounded-full bg-white/20 pointer-events-none"
                        />
                      )}

                      <motion.div
                        animate={{
                          backgroundColor: isHovered
                            ? "rgba(255, 255, 255, 0.28)"
                            : "rgba(255, 255, 255, 0.1)",
                          boxShadow: isHovered
                            ? "0 0 25px rgba(255, 255, 255, 0.35)"
                            : "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                        className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center text-white font-semibold text-[16px] shadow-sm transition-all duration-300 relative z-10"
                      >
                        {step.num}
                      </motion.div>
                    </div>

                    <span
                      className={`text-[13.5px] sm:text-[14px] font-medium mt-2 text-center transition-colors duration-200 ${
                        isHovered ? "text-white font-semibold" : "text-white/85"
                      }`}
                    >
                      {step.label}
                    </span>
                  </motion.div>

                  {idx < ROW_1_STEPS.length - 1 && <ArrowIcon />}
                </React.Fragment>
              );
            })}
          </motion.div>

          {/* Row 2: Leading Arrow + Steps 6 to 9 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 w-full"
          >
            <ArrowIcon />

            {ROW_2_STEPS.map((step, idx) => {
              const isHovered = hoveredStep === step.num;
              return (
                <React.Fragment key={step.num}>
                  <motion.div
                    variants={stepVariants}
                    whileHover={{ y: -4, scale: 1.05 }}
                    onMouseEnter={() => setHoveredStep(step.num)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className="flex flex-col items-center cursor-pointer group relative select-none"
                  >
                    <div className="relative flex items-center justify-center">
                      {isHovered && (
                        <motion.svg
                          initial={{ opacity: 0, rotate: 0 }}
                          animate={{ opacity: 1, rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          className="absolute -inset-1.5 w-[60px] h-[60px] pointer-events-none"
                          viewBox="0 0 60 60"
                        >
                          <circle
                            cx="30"
                            cy="30"
                            r="28"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.4)"
                            strokeWidth="1.5"
                            strokeDasharray="16 8"
                          />
                        </motion.svg>
                      )}

                      {isHovered && (
                        <motion.div
                          initial={{ scale: 1, opacity: 0.6 }}
                          animate={{ scale: 1.45, opacity: 0 }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                          className="absolute inset-0 rounded-full bg-white/20 pointer-events-none"
                        />
                      )}

                      <motion.div
                        animate={{
                          backgroundColor: isHovered
                            ? "rgba(255, 255, 255, 0.28)"
                            : "rgba(255, 255, 255, 0.1)",
                          boxShadow: isHovered
                            ? "0 0 25px rgba(255, 255, 255, 0.35)"
                            : "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                        className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center text-white font-semibold text-[16px] shadow-sm transition-all duration-300 relative z-10"
                      >
                        {step.num}
                      </motion.div>
                    </div>

                    <span
                      className={`text-[13.5px] sm:text-[14px] font-medium mt-2 text-center transition-colors duration-200 ${
                        isHovered ? "text-white font-semibold" : "text-white/85"
                      }`}
                    >
                      {step.label}
                    </span>
                  </motion.div>

                  {idx < ROW_2_STEPS.length - 1 && <ArrowIcon />}
                </React.Fragment>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Explanatory Paragraph */}
        <FadeIn delay={0.25} distance={18}>
          <p className="text-white/75 text-[14px] sm:text-[15px] max-w-2xl mx-auto text-center leading-relaxed mt-10 sm:mt-16 font-normal">
            Set your budget once, by typing it in or importing it from Excel. Every request, delivery, and payment that follows is checked against that same live number, from the first phase to project closeout.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
