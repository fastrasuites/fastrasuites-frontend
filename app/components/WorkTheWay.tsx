"use client";

import React from "react";
import { FadeIn } from "./motion/MotionWrappers";

export default function WorkTheWay() {
  return (
    <section className="py-12 md:py-28 bg-[#F9FAFB] px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Category Pill */}
        <FadeIn delay={0.05} distance={15}>
          <div className="inline-flex items-center justify-center bg-[#E0E7FF] text-[#4F46E5] text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
            ADOPT
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.1} distance={20}>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#161C2D] tracking-tight leading-[1.18] mb-5">
            Work the way your team actually works,<br className="hidden sm:inline" /> wherever they are
          </h2>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.15} distance={20}>
          <p className="text-gray-500 text-[15px] sm:text-[16px] max-w-2xl mx-auto leading-relaxed mb-16">
            Swap the clutter of 3 different systems with one simple platform. From your project 
            site to your corporate office, FastraSuite brings teams, budget, and data across different offices.
          </p>
        </FadeIn>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 w-full">
          
          {/* Column 1 */}
          <FadeIn delay={0.2} distance={20} direction="up">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-[16px] font-bold text-[#161C2D] mb-2">Rugged devices</h4>
              <p className="text-[14px] text-gray-500 leading-relaxed max-w-[240px]">
                Built for field crews with varying tech literacy
              </p>
            </div>
          </FadeIn>

          {/* Column 2 */}
          <FadeIn delay={0.3} distance={20} direction="up">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-[16px] font-bold text-[#161C2D] mb-2">Anywhere access</h4>
              <p className="text-[14px] text-gray-500 leading-relaxed max-w-[240px]">
                Manage project approvals on the go
              </p>
            </div>
          </FadeIn>

          {/* Column 3 */}
          <FadeIn delay={0.4} distance={20} direction="up">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h4 className="text-[16px] font-bold text-[#161C2D] mb-2">High adoption</h4>
              <p className="text-[14px] text-gray-500 leading-relaxed max-w-[240px]">
                A tool built to be used, not just bought
              </p>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
