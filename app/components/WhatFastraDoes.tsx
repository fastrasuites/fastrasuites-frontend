"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn, EASING } from "./motion/MotionWrappers";
import SpotlightCard from "./motion/SpotlightCard";

interface FeatureCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function WhatFastraDoes() {
  const row1Cards: FeatureCard[] = [
    {
      title: "Control every naira spent on site.",
      description:
        "Live Budget vs Actual, budget check on every request before approval.",
      icon: (
        <Image
          src="/icons/money_bag.png"
          alt="Money bag"
          width={36}
          height={36}
          className="object-contain"
        />
      ),
    },
    {
      title: "Keep every request connected to the right project activity.",
      description:
        "WBS-tagged requests, mobile-first submission from any phone.",
      icon: (
        <Image
          src="/icons/chain_link.png"
          alt="Chain link"
          width={36}
          height={36}
          className="object-contain"
        />
      ),
    },
    {
      title: "Know what's on site before ordering more.",
      description:
        "Real-time stock levels, low stock alerts, delivery confirmations.",
      icon: (
        <Image
          src="/icons/parcel_box.png"
          alt="Parcel box"
          width={36}
          height={36}
          className="object-contain"
        />
      ),
    },
  ];

  const row2Cards: FeatureCard[] = [
    {
      title: "Approve faster without losing control.",
      description:
        "Budget-checked approval queue, over-budget flagging before it's too late.",
      icon: (
        <Image
          src="/icons/check_green.png"
          alt="Green checkmark"
          width={32}
          height={32}
          className="object-contain"
        />
      ),
    },
    {
      title: "Reduce paperwork between the field and finance.",
      description:
        "Purchase Orders, Vendor Bills, Payment Queue, tracked start to finish.",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <path
            d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
            fill="#38BDF8"
          />
          <path d="M14 2V8H20L14 2Z" fill="#BAE6FD" />
          <line
            x1="8"
            y1="12"
            x2="16"
            y2="12"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="8"
            y1="16"
            x2="14"
            y2="16"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
            What FastraSuite actually does for you
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.12} distance={18}>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#161C2D] tracking-tight mb-14 sm:mb-16 text-center leading-tight">
            What FastraSuite actually does for you
          </h2>
        </FadeIn>

        {/* Cards Layout: 3 in Row 1, 2 Centered in Row 2 */}
        <div className="flex flex-col gap-6 w-full max-w-[1140px] items-center">
          {/* Row 1: 3 Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
          >
            {row1Cards.map((card, idx) => (
              <motion.div key={idx} variants={cardVariants} className="w-full h-full">
                <SpotlightCard
                  whileHover={{
                    y: -5,
                    scale: 1.015,
                    boxShadow: "0 14px 32px -4px rgba(0,0,0,0.07)",
                  }}
                  transition={{ duration: 0.25 }}
                  spotlightColor="59, 124, 237"
                  spotlightSize={320}
                  spotlightAlpha={0.09}
                  className="bg-white border border-gray-200 rounded-[20px] p-7 flex flex-col justify-start min-h-[220px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-gray-300 transition-colors cursor-default group"
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.3 }}
                    className="h-10 flex items-center justify-start mb-5 relative z-10"
                  >
                    {card.icon}
                  </motion.div>

                  {/* Title */}
                  <h4 className="font-bold text-[16px] text-[#161C2D] tracking-tight mb-2.5 leading-snug group-hover:text-[#3B7CED] transition-colors relative z-10">
                    {card.title}
                  </h4>

                  {/* Description */}
                  <p className="text-[#5A6578] text-[13.5px] leading-[1.6] font-normal relative z-10">
                    {card.description}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Row 2: 2 Cards Centered */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[760px]"
          >
            {row2Cards.map((card, idx) => (
              <motion.div key={idx} variants={cardVariants} className="w-full h-full">
                <SpotlightCard
                  whileHover={{
                    y: -5,
                    scale: 1.015,
                    boxShadow: "0 14px 32px -4px rgba(0,0,0,0.07)",
                  }}
                  transition={{ duration: 0.25 }}
                  spotlightColor="59, 124, 237"
                  spotlightSize={320}
                  spotlightAlpha={0.09}
                  className="bg-white border border-gray-200 rounded-[20px] p-7 flex flex-col justify-start min-h-[220px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-gray-300 transition-colors cursor-default group"
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.3 }}
                    className="h-10 flex items-center justify-start mb-5 relative z-10"
                  >
                    {card.icon}
                  </motion.div>

                  {/* Title */}
                  <h4 className="font-bold text-[16px] text-[#161C2D] tracking-tight mb-2.5 leading-snug group-hover:text-[#3B7CED] transition-colors relative z-10">
                    {card.title}
                  </h4>

                  {/* Description */}
                  <p className="text-[#5A6578] text-[13.5px] leading-[1.6] font-normal relative z-10">
                    {card.description}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
