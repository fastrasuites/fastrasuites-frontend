"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeIn, EASING } from "./motion/MotionWrappers";

interface StepItem {
  num: number;
  name: string;
}

const ALL_STEPS: StepItem[] = [
  { num: 1, name: "Field Worker" },
  { num: 2, name: "Project Request" },
  { num: 3, name: "Budget Check" },
  { num: 4, name: "Approval" },
  { num: 5, name: "Purchase Order" },
  { num: 6, name: "Goods Received" },
  { num: 7, name: "Vendor Bill" },
  { num: 8, name: "Payment" },
  { num: 9, name: "Reporting" },
];

const ROW_1_STEPS = ALL_STEPS.slice(0, 5);
const ROW_2_STEPS = ALL_STEPS.slice(5);

function WorkflowArrow({ isHighlighted }: { isHighlighted?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="h-10 sm:h-12 md:h-[52px] flex items-center justify-center px-0.5 sm:px-1 md:px-2 shrink-0 self-start mt-1"
    >
      <motion.svg
        animate={{
          x: isHighlighted ? [0, 3, 0] : [0, 2, 0],
          color: isHighlighted ? "#3B7CED" : "#8A94A6",
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-colors duration-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </motion.svg>
    </motion.div>
  );
}

function WorkflowStep({
  num,
  name,
  isActive,
}: StepItem & { isActive: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const activeOrHovered = isActive || isHovered;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16, scale: 0.92 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: EASING.smooth,
          },
        },
      }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col items-center min-w-[56px] xs:min-w-[68px] sm:min-w-[80px] md:min-w-[96px] cursor-pointer group relative select-none"
    >
      <div className="relative flex items-center justify-center">
        {/* Circular Clockwise Animated Perimeter Progress Ring */}
        {activeOrHovered && (
          <motion.svg
            className="absolute -inset-1 sm:-inset-1.5 w-[46px] h-[46px] sm:w-[56px] sm:h-[56px] md:w-[60px] md:h-[60px] pointer-events-none -rotate-90"
            viewBox="0 0 60 60"
          >
            <motion.circle
              cx="30"
              cy="30"
              r="27"
              fill="none"
              stroke="#3B7CED"
              strokeWidth="2"
              strokeDasharray="170"
              initial={{ strokeDashoffset: 170 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.2, ease: EASING.smooth }}
            />
          </motion.svg>
        )}

        {/* Circular Expanding Ripple Glow */}
        {activeOrHovered && (
          <motion.div
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.35, opacity: 0 }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-blue-400/30 pointer-events-none"
          />
        )}

        {/* Circle Number */}
        <motion.div
          animate={{
            scale: activeOrHovered ? 1.08 : 1,
            boxShadow: activeOrHovered
              ? "0 8px 24px -4px rgba(59, 124, 237, 0.4)"
              : "0 2px 8px rgba(0, 0, 0, 0.04)",
            backgroundColor: activeOrHovered ? "#3B7CED" : "#DBEAFE",
            color: activeOrHovered ? "#FFFFFF" : "#3B7CED",
          }}
          transition={{ duration: 0.25 }}
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-[52px] md:h-[52px] rounded-full font-semibold text-[15px] sm:text-[17px] md:text-[18px] flex items-center justify-center shrink-0 border border-blue-300/40 transition-all duration-300 relative z-10"
        >
          {num}
        </motion.div>
      </div>

      {/* Label */}
      <span
        className={`font-semibold text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] tracking-tight text-center mt-2 whitespace-nowrap transition-colors duration-300 ${
          activeOrHovered ? "text-[#3B7CED]" : "text-[#161C2D]"
        }`}
      >
        {name}
      </span>
    </motion.div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Sequential guided step flow
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % 9);
    }, 1500);

    return () => clearInterval(interval);
  }, [isInView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#F6F6F6] px-3 xs:px-4 sm:px-6 md:px-12 text-center overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Category Pill */}
        <FadeIn delay={0.05} distance={15}>
          <div className="inline-flex items-center justify-center bg-[#DBEAFE]/70 text-[#3B7CED] text-[13px] font-medium px-4 py-1 rounded-full mb-4">
            How it works
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.12} distance={18}>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#161C2D] tracking-tight mb-12 sm:mb-16 leading-tight">
            How a request becomes a payment
          </h2>
        </FadeIn>

        {/* Mobile & Small Screen 3x3 Flow Grid (<640px) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:hidden grid-cols-3 gap-y-8 gap-x-1 w-full max-w-[360px] mb-12"
        >
          {ALL_STEPS.map((step, idx) => (
            <div key={step.num} className="flex justify-center">
              <WorkflowStep
                {...step}
                isActive={activeStepIndex === idx}
              />
            </div>
          ))}
        </motion.div>

        {/* Tablet and Desktop Connected Flow (640px+) */}
        <div className="hidden sm:flex w-full flex-col gap-10 sm:gap-12 items-center mb-14 sm:mb-16">
          {/* Row 1 (Steps 1 to 5) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex items-start justify-center gap-1 sm:gap-2.5 max-w-full"
          >
            {ROW_1_STEPS.map((step, idx) => (
              <React.Fragment key={step.num}>
                <WorkflowStep
                  {...step}
                  isActive={activeStepIndex === idx}
                />
                {idx < ROW_1_STEPS.length - 1 && (
                  <WorkflowArrow isHighlighted={activeStepIndex === idx} />
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Row 2 (Steps 6 to 9 with Leading Arrow) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex items-start justify-center gap-1 sm:gap-2.5 max-w-full"
          >
            <WorkflowArrow isHighlighted={activeStepIndex === 4} />

            {ROW_2_STEPS.map((step, idx) => (
              <React.Fragment key={step.num}>
                <WorkflowStep
                  {...step}
                  isActive={activeStepIndex === idx + 5}
                />
                {idx < ROW_2_STEPS.length - 1 && (
                  <WorkflowArrow isHighlighted={activeStepIndex === idx + 5} />
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* Subtext Paragraph */}
        <FadeIn delay={0.25} distance={18}>
          <p className="text-[#5A6578] max-w-[740px] text-[14px] sm:text-[15.5px] leading-[1.65] font-normal text-center">
            Every step depends on the one before it. A request can&apos;t skip the
            budget check. A payment can&apos;t happen without a verified purchase order
            or confirmed delivery. Nothing between the field and the office goes
            missing — there&apos;s no gap for it to fall into.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
