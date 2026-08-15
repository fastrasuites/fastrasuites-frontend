"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, EASING } from "../motion/MotionWrappers";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What kind of businesses is FastraSuite built for?",
    a: "FastraSuite is built for project-based businesses that need to track spending against a project budget, from the first field request through final payment. Construction is our primary launch market, but the platform fits any organization structured around projects and site or field activity: engineering, infrastructure, EPC, facilities management, consulting, and more."
  },
  {
    q: "Do I need a developer or IT team to set this up?",
    a: "No. FastraSuite is a web app your admin sets up directly, no installation, no server, and no technical support needed to get started."
  },
  {
    q: "Can my site workers use this without a computer?",
    a: "Yes. FastraSuite is fully responsive and designed specifically for mobile use in the field. Site workers can submit requests, view approvals, and manage their assigned tasks entirely from their smartphones."
  },
  {
    q: "Is my company's data visible to other companies using FastraSuite?",
    a: "Absolutely not. All data is strictly isolated per company and encrypted at rest and in transit. No other organization can access or view your project data, budgets, or vendor information."
  },
  {
    q: "What happens if I lose internet connection while filling out a request?",
    a: "FastraSuite caches your inputs locally. If you lose connection, you won't lose your work. Once you regain signal, the app will automatically sync your request to the cloud."
  },
  {
    q: "Can I import my existing project budgets?",
    a: "Yes. FastraSuite supports bulk CSV imports, allowing you to easily bring in your existing project budgets, vendor lists, and initial cost structures."
  },
  {
    q: "Do I need a card to try FastraSuite?",
    a: "No. Sign up and you can start free for 14 days, no credit card required. You only pay when you're ready to upgrade to a full plan."
  }
];

export default function FAQList() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-32 bg-white px-4 sm:px-6 md:px-12 relative z-10 -mt-16 sm:-mt-24">
      <div className="max-w-4xl mx-auto flex flex-col gap-5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <FadeIn key={idx} delay={0.1 + (idx * 0.05)} distance={20} direction="up" className="w-full">
              <motion.div 
                className={`w-full rounded-2xl overflow-hidden transition-all duration-300 border ${
                  isOpen ? "border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]" : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                }`}
              >
                <button
                  onClick={() => toggleOpen(idx)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-[16px] sm:text-[18px] pr-6 leading-snug transition-all ${
                    isOpen ? "font-bold text-[#161C2D]" : "font-semibold text-gray-800"
                  }`}>
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: EASING.smooth }}
                    className="shrink-0 w-8 h-8 rounded-full bg-[#4285F4] flex items-center justify-center text-white"
                  >
                    <ChevronDown className="w-4 h-4" strokeWidth={3} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASING.smooth }}
                    >
                      <div className="px-6 sm:px-8 pb-8 pt-2">
                        {/* Divider */}
                        <div className="w-full h-[1px] bg-gray-100 mb-6" />
                        
                        <p className="text-[15px] sm:text-[15.5px] text-gray-500 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
