"use client";

import React, { useState } from "react";
import { FadeIn, EASING } from "../motion/MotionWrappers";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ContactForm() {
  const [preferredMethod, setPreferredMethod] = useState("Email");

  return (
    <section className="py-20 md:py-32 bg-white px-4 sm:px-6 md:px-12 relative z-10 -mt-8 sm:-mt-16">
      <div className="max-w-3xl mx-auto flex flex-col items-center w-full">
        <FadeIn delay={0.1} distance={20} direction="up" className="w-full">
          <form className="w-full flex flex-col gap-6 sm:gap-8">
            
            {/* 2-Column Grid for standard inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName" className="text-[13px] font-semibold text-gray-800">
                  Full name
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="e.g. Jane Doe"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Company Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="companyName" className="text-[13px] font-semibold text-gray-800">
                  Company name
                </label>
                <input
                  type="text"
                  id="companyName"
                  placeholder="e.g. Acme Corp"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[13px] font-semibold text-gray-800">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-[13px] font-semibold text-gray-800">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Company Size */}
              <div className="flex flex-col gap-2">
                <label htmlFor="companySize" className="text-[13px] font-semibold text-gray-800">
                  Company size
                </label>
                <div className="relative">
                  <select
                    id="companySize"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>Select size</option>
                    <option value="1-10">1 - 10 employees</option>
                    <option value="11-50">11 - 50 employees</option>
                    <option value="51-200">51 - 200 employees</option>
                    <option value="201+">201+ employees</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* What are you using today? */}
              <div className="flex flex-col gap-2">
                <label htmlFor="currentSolution" className="text-[13px] font-semibold text-gray-800">
                  What are you using today?
                </label>
                <div className="relative">
                  <select
                    id="currentSolution"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>Select current solution</option>
                    <option value="excel">Excel / Spreadsheets</option>
                    <option value="paper">Paper & Pen</option>
                    <option value="procore">Procore / Other Construction Software</option>
                    <option value="erp">General ERP (NetSuite, etc.)</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Preferred contact method */}
            <div className="flex flex-col gap-3 mt-2">
              <label className="text-[13px] font-semibold text-gray-800">
                Preferred contact method
              </label>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                {["Email", "Phone", "WhatsApp"].map((method) => (
                  <label key={method} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="contactMethod"
                        value={method}
                        checked={preferredMethod === method}
                        onChange={(e) => setPreferredMethod(e.target.value)}
                        className="peer sr-only"
                      />
                      <div className={`w-[18px] h-[18px] rounded-full border-2 transition-all flex items-center justify-center ${
                        preferredMethod === method ? "border-blue-500" : "border-gray-300 group-hover:border-blue-400"
                      }`}>
                        <motion.div 
                          initial={false}
                          animate={{ scale: preferredMethod === method ? 1 : 0 }}
                          className="w-2.5 h-2.5 bg-blue-500 rounded-full"
                        />
                      </div>
                    </div>
                    <span className="text-[14px] text-gray-700">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.01, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6"
            >
              <button
                type="button"
                className="w-full py-4 bg-[#4285F4] hover:bg-[#3367D6] text-white font-medium text-[15px] rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
              >
                Book a demo
              </button>
            </motion.div>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
