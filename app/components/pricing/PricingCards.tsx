"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, EASING } from "../motion/MotionWrappers";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

type FeatureItem = {
  text: string;
  bold?: boolean;
  highlight?: string;
};

export default function PricingCards() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const starterFeatures: FeatureItem[] = [
    { text: "Up to 3 active projects", highlight: "3 active projects" },
    { text: "Up to 5 users", highlight: "5 users" },
    { text: "1 warehouse" },
    { text: "Project & budget management" },
    { text: "Budget revisions and project costing" },
    { text: "Material, labour, expense, and other project requests" },
    { text: "Procurement and inventory management" },
    { text: "Material issue and returns" },
    { text: "Client invoicing" },
    { text: "Budget vs Actual and project profitability" },
    { text: "Standard reports" },
    { text: "Email and in-app support" },
  ];

  const proFeatures: FeatureItem[] = [
    { text: "Everything in Starter", bold: true },
    { text: "Up to 15 active projects", highlight: "15 active projects" },
    { text: "Up to 25 users", highlight: "25 users" },
    { text: "Up to 3 warehouses" },
    { text: "Advanced approval workflows" },
    { text: "Advanced procurement and inventory" },
    { text: "Labour and equipment costing" },
    { text: "Project cost ledger and cost forecasting" },
    { text: "Advanced Budget vs Actual and profitability" },
    { text: "Advanced reports and dashboards" },
    { text: "Advanced user permissions" },
    { text: "Priority support and guided onboarding" },
  ];

  const enterpriseFeatures: FeatureItem[] = [
    { text: "Everything in Professional", bold: true },
    { text: "Unlimited projects", bold: true },
    { text: "50+ users", bold: true },
    { text: "Multiple warehouses" },
    { text: "Multi-company management" },
    { text: "Custom approval workflows" },
    { text: "Advanced roles and permissions" },
    { text: "Custom reports and dashboards" },
    { text: "API and system integrations" },
    { text: "Advanced data migration" },
    { text: "Custom workflows" },
    { text: "Dedicated onboarding and account management" },
    { text: "Priority technical support" },
    { text: "Enterprise security and audit controls" },
  ];

  const renderFeatureText = (item: FeatureItem) => {
    if (item.bold) {
      return <strong className="text-gray-900 font-bold">{item.text}</strong>;
    }
    if (item.highlight) {
      const parts = item.text.split(item.highlight);
      return (
        <span>
          {parts[0]}
          <strong className="text-gray-900 font-bold">{item.highlight}</strong>
          {parts[1]}
        </span>
      );
    }
    return <span>{item.text}</span>;
  };

  return (
    <section className="py-20 md:py-28 bg-white px-4 sm:px-6 md:px-12 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Pill Tag */}
        <FadeIn delay={0.05} distance={15}>
          <div className="inline-flex items-center justify-center bg-blue-100/70 text-[#2563EB] text-[12.5px] font-semibold px-4 py-1 rounded-full mb-4 shadow-xs">
            Pricing
          </div>
        </FadeIn>

        {/* Section Heading */}
        <FadeIn delay={0.1} distance={15}>
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-semibold text-[#111827] tracking-tight mb-5 text-center leading-[1.15]">
            Simple, transparent pricing
          </h2>
        </FadeIn>

        {/* Description */}
        <FadeIn delay={0.15} distance={15}>
          <div className="text-gray-500 text-[14.5px] sm:text-[15.5px] leading-relaxed max-w-3xl mx-auto text-center mb-3 text-balance font-normal">
            <p className="mb-1">
              Choose the plan that fits your projects. Upgrade as you grow. Manage your projects, costs,
              people, procurement, and inventory from one connected platform.
            </p>
            <p>
              Start with the plan that fits your business today and move to a higher plan as your projects
              and team grow.
            </p>
          </div>
        </FadeIn>

        {/* Guarantee line */}
        <FadeIn delay={0.2} distance={15}>
          <p className="text-center text-sm sm:text-[15px] font-bold text-gray-800 tracking-tight mb-10">
            No setup fee. No long-term commitment. Cancel anytime.
          </p>
        </FadeIn>

        {/* Monthly / Yearly Toggle */}
        <FadeIn delay={0.25} distance={15}>
          <div className="flex items-center justify-center gap-3.5 mb-16">
            <span
              className={`text-sm font-semibold transition-colors cursor-pointer select-none ${
                billingCycle === "monthly" ? "text-[#2563EB]" : "text-gray-400 hover:text-gray-600"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="w-13 h-7 rounded-full p-0.5 border-2 border-[#2563EB] flex items-center transition-colors focus:outline-hidden cursor-pointer relative bg-white shadow-xs"
              aria-label="Toggle billing cycle"
            >
              <motion.div
                animate={{ x: billingCycle === "yearly" ? 22 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className="w-4.5 h-4.5 bg-[#2563EB] rounded-full shadow-sm"
              />
            </button>
            <span
              className={`text-sm font-semibold transition-colors cursor-pointer select-none ${
                billingCycle === "yearly" ? "text-[#2563EB]" : "text-gray-400 hover:text-gray-600"
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
            </span>
          </div>
        </FadeIn>

        {/* 3 Pricing Cards Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Card 1: Starter */}
          <FadeIn delay={0.2} distance={20} direction="up" className="h-full">
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: EASING.smooth }}
              className="bg-white rounded-[28px] p-7 sm:p-8 flex flex-col h-full border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all relative"
            >
              <h3 className="text-xl font-bold text-[#111827] mb-1">Starter</h3>
              <p className="text-gray-500 text-[13px] leading-relaxed mb-6 min-h-[38px]">
                For small contractors managing a few projects
              </p>

              {/* Price display with animated flip */}
              <div className="flex items-baseline gap-1.5 mb-7 h-10">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={billingCycle}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="text-3xl sm:text-[34px] font-extrabold text-[#111827] tracking-tight"
                  >
                    {billingCycle === "monthly" ? "₦49,000" : "₦490,000"}
                  </motion.span>
                </AnimatePresence>
                <span className="text-gray-500 text-sm font-normal">
                  {billingCycle === "monthly" ? "/month" : "/year"}
                </span>
              </div>

              <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                <Link
                  href="https://app.fastrasuite.com/"
                  className="block w-full py-3.5 px-4 rounded-xl text-[14.5px] font-semibold text-center bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-all shadow-md shadow-blue-500/20 active:scale-[0.98] mb-8"
                >
                  Start Free 14-Day Trial
                </Link>
              </motion.div>

              <div className="flex flex-col gap-3.5 flex-grow">
                {starterFeatures.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-4.5 h-4.5 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-[13px] text-gray-600 leading-snug">
                      {renderFeatureText(item)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </FadeIn>

          {/* Card 2: Professional (Featured) */}
          <FadeIn delay={0.3} distance={20} direction="up" className="h-full">
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25, ease: EASING.smooth }}
              className="bg-white rounded-[28px] p-7 sm:p-8 flex flex-col h-full border border-[#2563EB] shadow-lg shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/20 transition-all relative"
            >
              {/* Coming Soon Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-[11px] font-bold px-4 py-1 rounded-full shadow-md tracking-wider uppercase">
                Coming Soon
              </div>

              <h3 className="text-xl font-bold text-[#111827] mb-1 mt-1">Professional</h3>
              <p className="text-gray-500 text-[13px] leading-relaxed mb-6 min-h-[38px]">
                For growing contractors managing multiple projects
              </p>

              {/* Price display with animated flip */}
              <div className="flex items-baseline gap-1.5 mb-7 h-10">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={billingCycle}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="text-3xl sm:text-[34px] font-extrabold text-[#111827] tracking-tight"
                  >
                    {billingCycle === "monthly" ? "₦149,000" : "₦1,490,000"}
                  </motion.span>
                </AnimatePresence>
                <span className="text-gray-500 text-sm font-normal">
                  {billingCycle === "monthly" ? "/month" : "/year"}
                </span>
              </div>

              <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                <Link
                  href="/contact"
                  className="block w-full py-3.5 px-4 rounded-xl text-[14.5px] font-semibold text-center bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-all shadow-md shadow-blue-500/30 hover:shadow-blue-500/50 active:scale-[0.98] mb-8"
                >
                  Coming Soon
                </Link>
              </motion.div>

              <div className="flex flex-col gap-3.5 flex-grow">
                {proFeatures.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-4.5 h-4.5 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-[13px] text-gray-600 leading-snug">
                      {renderFeatureText(item)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </FadeIn>

          {/* Card 3: Enterprise */}
          <FadeIn delay={0.4} distance={20} direction="up" className="h-full">
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: EASING.smooth }}
              className="bg-white rounded-[28px] p-7 sm:p-8 flex flex-col h-full border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all relative"
            >
              {/* Coming Soon Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-[11px] font-bold px-4 py-1 rounded-full shadow-md tracking-wider uppercase">
                Coming Soon
              </div>

              <h3 className="text-xl font-bold text-[#111827] mb-1 mt-1">Enterprise</h3>
              <p className="text-gray-500 text-[13px] leading-relaxed mb-6 min-h-[38px]">
                For large contractors and organizations with complex project operations
              </p>

              {/* Price display with animated flip */}
              <div className="flex items-baseline gap-1.5 mb-7 h-10">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={billingCycle}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="text-3xl sm:text-[34px] font-extrabold text-[#111827] tracking-tight"
                  >
                    {billingCycle === "monthly" ? "₦399,000" : "₦3,990,000"}
                  </motion.span>
                </AnimatePresence>
                <span className="text-gray-500 text-sm font-normal">
                  {billingCycle === "monthly" ? "/month" : "/year"}
                </span>
              </div>

              <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                <Link
                  href="/contact"
                  className="block w-full py-3.5 px-4 rounded-xl text-[14.5px] font-semibold text-center bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-all shadow-md shadow-blue-500/20 active:scale-[0.98] mb-8"
                >
                  Coming Soon
                </Link>
              </motion.div>

              <div className="flex flex-col gap-3.5 flex-grow">
                {enterpriseFeatures.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-4.5 h-4.5 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-[13px] text-gray-600 leading-snug">
                      {renderFeatureText(item)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </FadeIn>
        </div>

        {/* Two Horizontal Cards Below Pricing Tiers */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-7 mt-16">
          {/* Card Left: Need More Capacity? */}
          <FadeIn delay={0.2} distance={15} direction="up">
            <motion.div
              whileHover={{ y: -4, borderColor: "#93C5FD" }}
              transition={{ duration: 0.2 }}
              className="h-full bg-white border border-gray-200/90 rounded-2xl p-7 sm:p-9 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="inline-block text-[11px] font-bold text-[#2563EB] uppercase tracking-wider mb-3">
                  NEED MORE CAPACITY?
                </span>
                <h4 className="text-lg sm:text-[21px] font-bold text-gray-900 mb-3 leading-snug">
                  Your business can grow without outgrowing the platform.
                </h4>
                <p className="text-gray-500 text-[13.5px] leading-relaxed mb-6">
                  If you need more users, projects or operational capacity than your current plan provides, you can upgrade to the next plan or contact us for additional capacity.
                </p>
              </div>
              <Link
                href="/contact"
                className="text-[#2563EB] font-semibold text-sm hover:underline inline-flex items-center gap-1.5 w-fit"
              >
                <span>Contact us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </FadeIn>

          {/* Card Right: No Per-Transaction Fees */}
          <FadeIn delay={0.3} distance={15} direction="up">
            <motion.div
              whileHover={{ y: -4, borderColor: "#93C5FD" }}
              transition={{ duration: 0.2 }}
              className="h-full bg-white border border-gray-200/90 rounded-2xl p-7 sm:p-9 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-[11px] font-bold text-[#2563EB] uppercase tracking-wider mb-3">
                  NO PER-TRANSACTION FEES
                </span>
                <h4 className="text-lg sm:text-[21px] font-bold text-gray-900 mb-3 leading-snug">
                  We don&apos;t charge you for every transaction.
                </h4>
                <p className="text-gray-500 text-[13.5px] leading-relaxed">
                  Create more requests. Process more materials. Manage more costs. Use the platform without worrying about per-transaction charges.
                </p>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
