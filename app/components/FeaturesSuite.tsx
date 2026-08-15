"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FadeIn, EASING } from "./motion/MotionWrappers";

interface ScenarioStep {
  title: string;
  description: string;
  iconBg: string;
  iconSrc: string;
  activeColor: string;
}

const SCENARIO_STEPS: ScenarioStep[] = [
  {
    title: "Submit",
    description:
      "A site supervisor needs 40 bags of cement before tomorrow's pour. She opens FastraSuite on her phone, submits the request, and sees the available budget before she even finishes typing.",
    iconBg: "bg-[#FDE8E8]",
    iconSrc: "/icons/scenario_phone.png",
    activeColor: "#EF4444",
  },
  {
    title: "Check & Approve",
    description:
      "The system checks it against the live project budget instantly — no waiting for someone back at the office to open a spreadsheet. It's approved before she's left the site.",
    iconBg: "bg-[#DBEAFE]",
    iconSrc: "/icons/scenario_check.png",
    activeColor: "#3B82F6",
  },
  {
    title: "Receive",
    description:
      "By the time the cement arrives, the delivery is confirmed against the order. The vendor bill is flagged for a price difference nobody would have caught by hand.",
    iconBg: "bg-[#FEF3C7]",
    iconSrc: "/icons/scenario_truck.png",
    activeColor: "#F59E0B",
  },
  {
    title: "Pay",
    description:
      "Finance pays it from a queue sorted by what's due first. Nobody re-typed a single number.",
    iconBg: "bg-[#D1FAE5]",
    iconSrc: "/icons/scenario_card.png",
    activeColor: "#10B981",
  },
];

function TimelineStepItem({
  step,
  idx,
  isLast,
}: {
  step: ScenarioStep;
  idx: number;
  isLast: boolean;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: false, amount: 0.4 });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: idx * 0.12, ease: EASING.smooth }}
      className="relative flex items-start gap-5 group cursor-default"
    >
      {/* Icon Column (w-12 = 48px) */}
      <div className="relative flex flex-col items-center shrink-0">
        <motion.div
          animate={{
            scale: isInView ? 1.05 : 1,
            boxShadow: isInView
              ? "0 10px 25px -4px rgba(0, 0, 0, 0.12)"
              : "0 2px 6px rgba(0, 0, 0, 0.04)",
          }}
          whileHover={{ scale: 1.1, rotate: [0, -4, 4, 0] }}
          transition={{ duration: 0.25 }}
          className={`w-12 h-12 rounded-[14px] ${step.iconBg} flex items-center justify-center p-2 relative z-10 border border-black/5 transition-all`}
        >
          <Image
            src={step.iconSrc}
            alt={step.title}
            width={26}
            height={26}
            className="object-contain"
          />
          {/* Subtle active glow halo */}
          {isInView && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-[14px] -z-10 blur-sm"
              style={{ backgroundColor: step.activeColor }}
            />
          )}
        </motion.div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col pt-0.5 z-10 pb-2">
        <h4
          className={`font-bold text-[16px] tracking-tight mb-1.5 transition-colors duration-300 ${
            isInView ? "text-[#161C2D]" : "text-[#5A6578]"
          }`}
        >
          {step.title}
        </h4>
        <p className="text-[#5A6578] text-[13.5px] sm:text-[14px] leading-[1.6] font-normal">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function FeaturesSuite() {
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineContainerRef,
    offset: ["start 75%", "end 60%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-16 md:py-24 bg-white px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Category Pill */}
        <FadeIn delay={0.05} distance={15}>
          <div className="inline-flex items-center justify-center bg-[#E2F7EB] text-[#2F9E66] text-[13px] font-medium px-4 py-1 rounded-full mb-4">
            Example scenario
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.12} distance={18}>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#161C2D] tracking-tight mb-14 sm:mb-16 text-center leading-tight">
            What this actually looks like
          </h2>
        </FadeIn>

        {/* 2-Column Content: Photo on Left, Vertical Timeline on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center w-full max-w-[1040px]">
          {/* Left Column: Photo with subtle parallax float */}
          <FadeIn
            delay={0.2}
            direction="left"
            distance={25}
            className="lg:col-span-6 flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.015, y: -4 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-[460px] h-[380px] sm:h-[450px] md:h-[480px] rounded-[24px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-100 transition-shadow duration-300"
            >
              <Image
                src="/example_scenario_photo.png"
                alt="Construction professional using FastraSuite on laptop"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </FadeIn>

          {/* Right Column: Vertical Timeline with Mathematically Centered Line */}
          <div
            ref={timelineContainerRef}
            className="lg:col-span-6 flex flex-col gap-8 sm:gap-9 relative"
          >
            {/* Background Line Track: Center of 48px icon is precisely at 24px */}
            <div className="absolute left-[24px] top-[24px] bottom-[36px] w-[2px] -translate-x-1/2 bg-gray-100 z-0" />

            {/* Scroll-Progressive Active Gradient Line: Perfectly Centered at 24px */}
            <motion.div
              style={{
                height: lineHeight,
                background:
                  "linear-gradient(180deg, #F87171 0%, #60A5FA 35%, #FBBF24 70%, #34D399 100%)",
              }}
              className="absolute left-[24px] top-[24px] max-h-[calc(100%-60px)] w-[2px] -translate-x-1/2 z-0 origin-top shadow-[0_0_8px_rgba(59,130,246,0.5)]"
            />

            {SCENARIO_STEPS.map((step, idx) => (
              <TimelineStepItem
                key={idx}
                step={step}
                idx={idx}
                isLast={idx === SCENARIO_STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
