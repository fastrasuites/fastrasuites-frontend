"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeIn, EASING } from "./motion/MotionWrappers";
import SpotlightCard from "./motion/SpotlightCard";

interface SecurityCardItem {
  title: string;
  description: string;
  cardBg: string;
  borderColor: string;
  iconBg: string;
  icon: React.ReactNode;
  rgbColor: string;
}

const SECURITY_CARDS: SecurityCardItem[] = [
  {
    title: "Every company's data is fully isolated.",
    description:
      "No cross-company access, ever, enforced at the database level, not just the interface.",
    cardBg: "bg-[#FFF5F5]",
    borderColor: "border-[#FEE2E2]",
    iconBg: "bg-[#FDE8E8]",
    rgbColor: "239, 68, 68",
    icon: (
      <svg
        className="w-5 h-5 text-[#E02424]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Every action is logged, permanently.",
    description:
      "Approvals, overrides, budget changes, payments — all timestamped, all traceable to a name.",
    cardBg: "bg-[#F5FDF8]",
    borderColor: "border-[#DCFCE7]",
    iconBg: "bg-[#D1FAE5]",
    rgbColor: "16, 185, 129",
    icon: (
      <svg
        className="w-5 h-5 text-[#059669]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M9 12h6M9 16h6" />
      </svg>
    ),
  },
  {
    title: "Role-based access, not open access.",
    description: "Someone sees only what their permissions allow, nothing more.",
    cardBg: "bg-[#FFFDF2]",
    borderColor: "border-[#FEF3C7]",
    iconBg: "bg-[#FEF3C7]",
    rgbColor: "217, 119, 6",
    icon: (
      <svg
        className="w-5 h-5 text-[#D97706]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "All data encrypted, in transit and at rest.",
    description: "Not an add-on — the baseline.",
    cardBg: "bg-[#F5F9FF]",
    borderColor: "border-[#DBEAFE]",
    iconBg: "bg-[#DBEAFE]",
    rgbColor: "37, 99, 235",
    icon: (
      <svg
        className="w-5 h-5 text-[#2563EB]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
    ),
  },
];

export default function SecurityTrust() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 22 },
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
            Security & trust
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.12} distance={18}>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#161C2D] tracking-tight mb-14 sm:mb-16 text-center max-w-3xl leading-tight">
            Not just a workflow tool, a system built to be trusted with money
          </h2>
        </FadeIn>

        {/* 4 Cards Grid with Cursor Spotlight */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 w-full max-w-[1140px]"
        >
          {SECURITY_CARDS.map((card, idx) => (
            <motion.div key={idx} variants={cardVariants} className="w-full h-full">
              <SpotlightCard
                whileHover={{
                  y: -5,
                  scale: 1.015,
                  boxShadow: "0 14px 30px -4px rgba(0,0,0,0.08)",
                }}
                transition={{ duration: 0.25 }}
                spotlightColor={card.rgbColor}
                spotlightSize={300}
                spotlightAlpha={0.12}
                className={`${card.cardBg} border ${card.borderColor} rounded-[20px] p-6 sm:p-7 flex flex-col justify-start min-h-[280px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] cursor-default`}
              >
                {/* Icon Box */}
                <motion.div
                  whileHover={{ scale: 1.12, rotate: [0, -6, 6, 0] }}
                  transition={{ duration: 0.3 }}
                  className={`w-12 h-12 rounded-[14px] ${card.iconBg} flex items-center justify-center mb-6 shrink-0 shadow-xs relative z-10`}
                >
                  {card.icon}
                </motion.div>

                {/* Title */}
                <h4 className="font-bold text-[16px] text-[#161C2D] tracking-tight mb-2.5 leading-snug relative z-10">
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
    </section>
  );
}
