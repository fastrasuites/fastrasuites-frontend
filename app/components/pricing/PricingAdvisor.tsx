"use client";

import React from "react";
import { FadeIn } from "../motion/MotionWrappers";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PricingAdvisor() {
  const scenarios = [
    {
      title: "Managing a single project with a small team?",
      desc: "The Starter plan gives you all the core spend controls you need to manage budgets, track expenses, and approve spending for one active project without unnecessary complexity.",
      linkText: "Read on to find out",
      href: "https://app.fastrasuite.com/",
    },
    {
      title: "Managing multiple projects and direct costs?",
      desc: "Professional is designed for growing contractors and businesses running up to 5 sites with multi-level approval hierarchies, inventory tracking, and direct costing.",
      linkText: "Read on to find out",
      href: "/contact",
    },
    {
      title: "Managing a large organization with complex operations?",
      desc: "Enterprise provides unlimited projects, multi-entity support, custom ERP integrations, and dedicated account management for large-scale operations across Nigeria.",
      linkText: "Read on to find out",
      href: "/contact",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white px-4 sm:px-6 md:px-12 border-b border-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <FadeIn delay={0.05} distance={15}>
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-[#111827] tracking-tight mb-12 sm:mb-16 text-center">
            Not sure which plan is right for you?
          </h2>
        </FadeIn>

        {/* 3 Scenario Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 w-full">
          {scenarios.map((item, idx) => (
            <FadeIn
              key={idx}
              delay={0.1 + idx * 0.1}
              distance={15}
              direction="up"
              className="flex flex-col justify-between h-full bg-white p-2"
            >
              <div>
                <h3 className="text-lg sm:text-[19px] font-bold text-[#111827] mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-[13.5px] sm:text-[14px] leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>
              <div>
                <Link
                  href={item.href}
                  className="text-[#2563EB] font-semibold text-sm hover:underline inline-flex items-center gap-1 group"
                >
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
