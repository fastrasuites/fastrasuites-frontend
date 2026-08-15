"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeIn, EASING } from "../motion/MotionWrappers";
import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingCards() {
  const coreFeatures = [
    "Project Request Module",
    "Project Costing Module",
    "Invoice Module",
    "Inventory Module",
  ];

  const enterpriseFeatures = [
    "everything in Core",
    "multi purchase requests, routing and vendor management",
    "billings and claims, quotations, and sales orders",
    "HR management",
    "Asset Management",
  ];

  return (
    <section className="py-12 md:py-32 bg-white px-4 sm:px-6 md:px-12 relative z-10 -mt-8 sm:-mt-24">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        
        {/* Core Card */}
        <FadeIn delay={0.2} distance={20} direction="up" className="h-full">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: EASING.smooth }}
            className="bg-white rounded-3xl p-8 sm:p-10 flex flex-col h-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-gray-100 relative"
          >
            <h3 className="text-2xl font-bold text-[#161C2D] mb-3">Core</h3>
            <p className="text-gray-500 text-[14px] leading-relaxed mb-6 min-h-[48px] sm:min-h-[40px]">
              Perfect for single site, self-managed projects, starting out.
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 mb-8">
              <span className="text-4xl font-bold text-[#161C2D]">Free</span>
              <span className="text-gray-400 text-[13px] sm:text-sm">* up to 5 users, then contact us</span>
            </div>

            <motion.div
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mb-10"
            >
              <Link
                href="#signup"
                className="w-full flex items-center justify-center bg-[#4285F4] hover:bg-[#3367D6] text-white font-medium text-[15px] px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
              >
                Start Free 14-Day Trial
              </Link>
            </motion.div>

            <div className="flex flex-col gap-4 flex-grow mb-10">
              {coreFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-green-600" strokeWidth={3} />
                  </div>
                  <span className="text-[14.5px] text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-[13px] text-gray-600 leading-relaxed">
              <strong>Best for:</strong> Teams who need full visibility from field request to payment, without procurement complexity across and multi-entity boxing.
            </div>
          </motion.div>
        </FadeIn>

        {/* Enterprise Card */}
        <FadeIn delay={0.3} distance={20} direction="up" className="h-full">
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 25px 60px rgba(59,130,246,0.2)" }}
            transition={{ duration: 0.3, ease: EASING.smooth }}
            className="bg-white rounded-3xl p-8 sm:p-10 flex flex-col h-full shadow-[0_20px_50px_rgba(59,130,246,0.12)] border-2 border-blue-500 relative"
          >
            {/* Ambient subtle background glow for Enterprise */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full pointer-events-none" />

            <h3 className="text-2xl font-bold text-[#161C2D] mb-3 relative z-10">Enterprise</h3>
            <p className="text-gray-500 text-[14px] leading-relaxed mb-6 min-h-[48px] sm:min-h-[40px] relative z-10">
              For large scale with multi-procurement, presets, and custom configurations.
            </p>
            
            <div className="flex items-baseline gap-2 mb-8 relative z-10">
              <span className="text-3xl font-bold text-[#161C2D]">Contact us</span>
            </div>

            <motion.div
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mb-10 relative z-10"
            >
              <Link
                href="#contact"
                className="w-full flex items-center justify-center bg-[#4285F4] hover:bg-[#3367D6] text-white font-medium text-[15px] px-6 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-200"
              >
                Contact Sales
              </Link>
            </motion.div>

            <div className="flex flex-col gap-4 flex-grow mb-10">
              {enterpriseFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-green-600" strokeWidth={3} />
                  </div>
                  <span className="text-[14.5px] text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="bg-blue-50/60 rounded-2xl p-5 border border-blue-100 text-[13px] text-gray-700 leading-relaxed">
              <strong>Best for:</strong> Companies running on multiple sites where managing assigned funds, tracking company assets, to executing all levels of inventory cycle and management need their own dedicated platform.
            </div>
          </motion.div>
        </FadeIn>

      </div>
    </section>
  );
}
