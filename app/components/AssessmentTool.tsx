"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, EASING } from "./motion/MotionWrappers";

interface OptionItem {
  text: string;
  score: number;
}

interface QuestionItem {
  id: number;
  question: string;
  options: OptionItem[];
}

const QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    question: "How are purchase requests approved on your site today?",
    options: [
      { text: "WhatsApp or phone call", score: 3 },
      { text: "Paper form or email", score: 2 },
      { text: "Spreadsheet-based system", score: 1 },
      { text: "A dedicated software tool", score: 0 },
    ],
  },
  {
    id: 2,
    question: "How do you currently track petty cash?",
    options: [
      { text: "We don't track it formally", score: 3 },
      { text: "Cash book updated manually", score: 2 },
      { text: "Excel spreadsheet", score: 1 },
      { text: "Software with receipts", score: 0 },
    ],
  },
  {
    id: 3,
    question: "Where do your active project budgets live?",
    options: [
      { text: "In the project manager's head", score: 3 },
      { text: "Excel files updated occasionally", score: 2 },
      { text: "Shared online spreadsheets", score: 1 },
      { text: "A dedicated live database", score: 0 },
    ],
  },
  {
    id: 4,
    question: "How are receipts and delivery notes tracked?",
    options: [
      { text: "Kept in a vehicle dashboard or box", score: 3 },
      { text: "Submitted weekly or monthly", score: 2 },
      { text: "Emailed or messaged as photos", score: 1 },
      { text: "Logged digitally at the site instantly", score: 0 },
    ],
  },
];

interface ResultConfig {
  title: string;
  description: string;
  labelColor: string;
  cardBg: string;
  borderColor: string;
}

const RESULTS: Record<"low" | "moderate" | "high", ResultConfig> = {
  low: {
    title: "Low Risk",
    description:
      "You're doing well — FastraSuite can replace the manual effort and give you real-time visibility you don't have yet.",
    labelColor: "text-[#16A34A]",
    cardBg: "bg-[#DCFCE7]/40",
    borderColor: "border-[#86EFAC]",
  },
  moderate: {
    title: "Moderate Risk",
    description:
      "You have some controls in place, but there are meaningful gaps between your field and finance. FastraSuite connects them.",
    labelColor: "text-[#D97706]",
    cardBg: "bg-[#FEF3C7]/50",
    borderColor: "border-[#FCD34D]",
  },
  high: {
    title: "High Risk",
    description:
      "Your current setup has several gaps where unbudgeted spend can slip through. FastraSuite closes each of them.",
    labelColor: "text-[#DC2626]",
    cardBg: "bg-[#FEE2E2]/50",
    borderColor: "border-[#FCA5A5]",
  },
};

export default function AssessmentTool() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, OptionItem>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelect = (option: OptionItem) => {
    const newAnswers = { ...answers, [currentStep]: option };
    setAnswers(newAnswers);

    if (currentStep < 4) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 220);
    } else {
      setTimeout(() => {
        setIsCompleted(true);
      }, 280);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(1);
    setIsCompleted(false);
  };

  const totalScore = Object.values(answers).reduce(
    (acc, opt) => acc + opt.score,
    0
  );

  let resultKey: "low" | "moderate" | "high" = "moderate";
  if (totalScore <= 3) {
    resultKey = "low";
  } else if (totalScore >= 8) {
    resultKey = "high";
  } else {
    resultKey = "moderate";
  }

  const result = RESULTS[resultKey];
  const currentQ = QUESTIONS[currentStep - 1];

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-[#EDF4FF] px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Category Pill */}
        <FadeIn delay={0.05} distance={15}>
          <div className="inline-flex items-center justify-center bg-[#DBEAFE] text-[#3B7CED] text-[13px] font-medium px-4 py-1 rounded-full mb-4">
            Free tool
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.12} distance={18}>
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-semibold text-[#161C2D] tracking-tight mb-4 text-center max-w-2xl leading-tight">
            How exposed is your current project to unbudgeted spending?
          </h2>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.18} distance={18}>
          <p className="text-[13.5px] sm:text-[14.5px] text-[#5A6578] max-w-2xl mx-auto text-center leading-relaxed mb-8 sm:mb-10">
            A short, honest self-assessment — four questions about how your team
            currently handles requests, budgets, and payments. Get a personalized
            readiness band and a practical checklist.
          </p>
        </FadeIn>

        {/* Assessment Card Container */}
        <div className="w-full max-w-[620px]">
          <AnimatePresence mode="wait">
            {!isCompleted ? (
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: EASING.smooth }}
                className="w-full bg-white rounded-[20px] sm:rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white p-5 sm:p-8 md:p-9 min-h-[350px] sm:min-h-[380px] flex flex-col justify-between"
              >
                {/* Top Progress Tracker */}
                <div>
                  <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-5 sm:mb-6">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className="h-1.5 rounded-full bg-[#E5E7EB] overflow-hidden"
                      >
                        <motion.div
                          className="h-full bg-[#3B7CED]"
                          initial={false}
                          animate={{
                            width: step <= currentStep ? "100%" : "0%",
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    ))}
                  </div>

                  <span className="text-[10.5px] sm:text-[11px] uppercase font-bold text-[#9CA3AF] tracking-wider block mb-2.5 sm:mb-3">
                    Question {currentStep} of 4
                  </span>

                  {/* Question Text */}
                  <h3 className="font-bold text-[16px] sm:text-[19px] text-[#161C2D] tracking-tight mb-5 sm:mb-6 leading-snug">
                    {currentQ.question}
                  </h3>
                </div>

                {/* Options List */}
                <div className="flex flex-col gap-2.5 sm:gap-3">
                  {currentQ.options.map((option, idx) => {
                    const isSelected =
                      answers[currentStep]?.text === option.text;
                    return (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.01, x: 2 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => handleSelect(option)}
                        className={`w-full text-left px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-[14px] border text-[13.5px] sm:text-[14.5px] font-medium transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#3B7CED] bg-blue-50/70 text-[#161C2D] shadow-xs ring-2 ring-blue-500/20"
                            : "border-gray-200 hover:border-blue-400 bg-white text-[#161C2D] hover:bg-blue-50/20"
                        }`}
                      >
                        {option.text}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              /* Result Screen */
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASING.smooth }}
                className={`w-full ${result.cardBg} border ${result.borderColor} rounded-[20px] sm:rounded-[24px] p-6 sm:p-10 flex flex-col items-center text-center justify-center min-h-[290px] shadow-xs`}
              >
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider ${result.labelColor} mb-2 block`}
                >
                  YOUR RESULT
                </motion.span>

                <h3 className="font-bold text-[20px] sm:text-[24px] text-[#161C2D] mb-2.5 sm:mb-3">
                  {result.title}
                </h3>

                <p className="text-[#374151] text-[13.5px] sm:text-[14.5px] max-w-md mx-auto leading-relaxed mb-6 sm:mb-8">
                  {result.description}
                </p>

                {/* Action Buttons: Full Width on Mobile */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                    <Link
                      href="#signup"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#3B7CED] hover:bg-blue-600 text-white font-medium text-[14px] px-6 py-3 sm:py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer text-center"
                    >
                      Start Free Trial
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleReset}
                    className="w-full sm:w-auto bg-transparent border border-[#3B7CED] text-[#3B7CED] hover:bg-blue-50/60 font-medium text-[14px] px-6 py-3 sm:py-2.5 rounded-xl transition-colors cursor-pointer text-center"
                  >
                    Retake
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
