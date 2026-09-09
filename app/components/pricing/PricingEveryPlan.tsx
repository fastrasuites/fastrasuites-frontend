"use client";

import React from "react";
import { FadeIn } from "../motion/MotionWrappers";
import { Check } from "lucide-react";

export default function PricingEveryPlan() {
  const features = [
    // Row 1
    {
      title: "Secure cloud access",
      desc: "Access your platform securely from the web.",
    },
    {
      title: "Secure cloud access",
      desc: "Access your platform securely from the web.",
    },
    {
      title: "Invoicing",
      desc: "Manage client and vendor invoice workflows.",
    },
    // Row 2
    {
      title: "Automatic updates",
      desc: "Stay on the latest version without managing software updates.",
    },
    {
      title: "Automatic updates",
      desc: "Stay on the latest version without managing software updates.",
    },
    {
      title: "Data backup",
      desc: "Your business data is backed up as part of the hosted platform.",
    },
    // Row 3
    {
      title: "Project and budget management",
      desc: "Keep project activities, budgets, and spending connected.",
    },
    {
      title: "Project and budget management",
      desc: "Keep project activities, budgets, and spending connected.",
    },
    {
      title: "No per-transaction fees",
      desc: "Use the platform without additional charges based on transaction volume.",
    },
  ];

  return (
    <section className="bg-[#0B2046] text-white py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <FadeIn delay={0.05} distance={15}>
          <h2 className="text-base sm:text-lg md:text-[19px] font-bold uppercase tracking-[0.08em] text-[#6B93D6] text-center mb-14 sm:mb-20">
            WHAT&apos;S INCLUDED IN EVERY PLAN?
          </h2>
        </FadeIn>

        {/* 3x3 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 sm:gap-y-12 gap-x-10 lg:gap-x-14 w-full">
          {features.map((item, idx) => (
            <FadeIn
              key={idx}
              delay={0.08 + (idx % 3) * 0.06}
              distance={12}
              direction="up"
              className="flex items-start gap-3.5"
            >
              {/* Blue solid check badge */}
              <div className="w-5 h-5 sm:w-[22px] sm:h-[22px] rounded-full bg-[#1E60D5] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white stroke-[3]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-[15px] sm:text-[16px] leading-snug mb-1">
                  {item.title}
                </h3>
                <p className="text-[#9BB1D0] sm:text-[#A3B8D8] text-[13px] sm:text-[13.5px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
