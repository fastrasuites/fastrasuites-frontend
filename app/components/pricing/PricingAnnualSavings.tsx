"use client";

import React from "react";
import Image from "next/image";
import { FadeIn } from "../motion/MotionWrappers";
import Link from "next/link";

export default function PricingAnnualSavings() {
  const plans = [
    {
      plan: "Starter",
      monthly: "₦49,000 / month",
      yearly: "₦490,000 / year",
    },
    {
      plan: "Professional",
      monthly: "₦149,000 / month",
      yearly: "₦1,490,000 / year",
    },
    {
      plan: "Enterprise",
      monthly: "₦399,000 / month",
      yearly: "₦3,990,000 / year",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/cta_workers_clean.png"
          alt="Team collaboration in warehouse and office"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark Navy Overlay */}
        <div className="absolute inset-0 bg-[#0A1628]/90 backdrop-blur-xs" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full">
        <FadeIn delay={0.05} distance={15}>
          <h2 className="text-3xl sm:text-4xl md:text-[40px] font-bold text-white tracking-tight mb-2">
            Save with annual billing
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} distance={15}>
          <p className="text-base sm:text-lg text-blue-400 font-semibold mb-1">
            Pay annually and get 2 months free
          </p>
        </FadeIn>

        <FadeIn delay={0.15} distance={15}>
          <p className="text-gray-400 text-xs sm:text-sm mb-10">
            Discount automatically applied at checkout
          </p>
        </FadeIn>

        {/* Pricing Comparison Table Card */}
        <FadeIn delay={0.2} distance={20} className="w-full max-w-3xl">
          <div className="w-full overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-md shadow-2xl">
            <div className="grid grid-cols-3 bg-white/[0.06] border-b border-white/10 text-xs sm:text-sm font-bold text-gray-200 uppercase tracking-wider py-4 px-4 sm:px-8">
              <div className="text-left">Plan</div>
              <div className="text-center">Monthly</div>
              <div className="text-right">Yearly</div>
            </div>

            <div className="divide-y divide-white/10">
              {plans.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-3 py-4 sm:py-5 px-4 sm:px-8 text-xs sm:text-sm font-medium items-center hover:bg-white/[0.02] transition-colors"
                >
                  <div className="text-left font-bold text-white">{item.plan}</div>
                  <div className="text-center text-gray-300">{item.monthly}</div>
                  <div className="text-right text-blue-300 font-semibold">{item.yearly}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.25} distance={15}>
          <p className="text-gray-400 text-xs sm:text-sm mt-8">
            Contact us for custom enterprise pricing with dedicated support & SLA agreements{" "}
            <Link href="/contact" className="text-blue-400 hover:underline ml-1">
              Contact Sales →
            </Link>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
