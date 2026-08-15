"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, EASING } from "../motion/MotionWrappers";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do I need a card to start my trial?",
    a: "No. Sign up and you can start free for 14 days, no card required."
  },
  {
    q: "What happens when my trial ends?",
    a: "You'll be asked to choose a plan. If you choose enterprise you'll be invoiced before continuing. If you don't subscribe, your account is set to run out on read only; you won't lose your data, but you won't be able to add records."
  },
  {
    q: "Can I switch from Core to Enterprise later?",
    a: "Yes, anytime. All your data carries over — nothing is lost or has to be rebuilt."
  },
  {
    q: "Do I need Enterprise if I only have one or two regular vendors?",
    a: "Probably not yet. Core already includes full vendor management for payments. Enterprise vendor module is for companies sourcing across many vendors across sites, and asset management tools are for owner ready to run more of their business inside FastraSuite."
  }
];

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-28 bg-[#F0F4F8] px-4 sm:px-6 md:px-12">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        
        <FadeIn delay={0.1} distance={20}>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#161C2D] tracking-tight mb-12">
            Common questions
          </h2>
        </FadeIn>

        <div className="w-full flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <FadeIn key={idx} delay={0.15 + (idx * 0.05)} distance={20} direction="up" className="w-full">
                <div 
                  className={`w-full rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen ? "bg-[#E2EDF8] shadow-md" : "bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => toggleOpen(idx)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[14.5px] font-semibold text-[#161C2D] pr-4 leading-snug">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: EASING.smooth }}
                      className="shrink-0 text-blue-600"
                    >
                      <ChevronDown className="w-5 h-5" />
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
                        <div className="px-5 sm:px-6 pb-6 pt-0 text-[14px] text-gray-700 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}
