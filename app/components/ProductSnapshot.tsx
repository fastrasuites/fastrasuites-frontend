"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeIn, EASING } from "./motion/MotionWrappers";

function AnimatedCountNumber({
  value,
  prefix = "",
  suffix = "",
  formatComma = false,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  formatComma?: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(value * eased);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(update);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {formatComma ? displayValue.toLocaleString() : displayValue}
      {suffix}
    </span>
  );
}

export default function ProductSnapshot() {
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  const categorySpendData = [
    { name: "Labor (20%)", color: "#16284F", d: "M 50 50 L 50 5 A 45 45 0 0 1 92.8 36.1 Z", moveX: 2, moveY: -2 },
    { name: "Material (20%)", color: "#0047BA", d: "M 50 50 L 92.8 36.1 A 45 45 0 0 1 76.45 86.41 Z", moveX: 3, moveY: 1 },
    { name: "Purchase (30%)", color: "#89CFF0", d: "M 50 50 L 76.45 86.41 A 45 45 0 0 1 7.2 63.91 Z", moveX: -1, moveY: 3 },
    { name: "Petty cash (14%)", color: "#0284C7", d: "M 50 50 L 7.2 63.91 A 45 45 0 0 1 12.0 25.89 Z", moveX: -3, moveY: -1 },
    { name: "Subcontractor (16%)", color: "#0A577F", d: "M 50 50 L 12.0 25.89 A 45 45 0 0 1 50 5 Z", moveX: -1, moveY: -3 },
  ];

  return (
    <section className="py-12 md:py-24 bg-white px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Heading & Copy */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left">
          {/* Category Pill */}
          <FadeIn delay={0.05} distance={15}>
            <div className="inline-flex items-center justify-center bg-[#E2F7EB] text-[#2F9E66] text-[13px] font-medium px-3.5 py-1 rounded-full w-fit mb-4">
              Product snapshot
            </div>
          </FadeIn>

          {/* Heading */}
          <FadeIn delay={0.12} distance={20}>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#161C2D] leading-[1.18] tracking-tight">
              See the whole project,
              <br className="hidden sm:inline" />
              not just the invoices.
            </h2>
          </FadeIn>

          {/* Paragraph */}
          <FadeIn delay={0.18} distance={20}>
            <p className="text-[#5A6578] text-[14.5px] sm:text-[16px] leading-[1.65] font-normal mt-4 max-w-[480px]">
              A request submitted on-site becomes a checked budget line, an
              approval, a purchase order, a confirmed delivery, and a payment —
              without anyone re-entering the same information twice.
            </p>
          </FadeIn>
        </div>

        {/* Right Column: Layered Dashboard Cards (Fluid Responsive Cascade on Mobile) */}
        <div className="lg:col-span-7 flex justify-center lg:justify-start lg:pl-2 w-full">
          {/* Mobile Stacked Cascade (<640px) */}
          <div className="flex sm:hidden flex-col gap-4 w-full max-w-[360px]">
            {/* Card 1: Pending Requests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASING.smooth }}
              className="w-full bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-150"
            >
              <h4 className="text-[14px] font-semibold text-[#3B7CED] mb-2.5">
                Pending Requests
              </h4>
              <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 mb-2.5">
                <span className="text-[11px] text-gray-400 font-normal">
                  Awaiting Approval
                </span>
                <span className="text-[24px] font-bold text-[#161C2D] leading-tight">
                  <AnimatedCountNumber value={12} />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-400 font-normal">
                  Total Value
                </span>
                <span className="text-[17px] font-bold text-[#161C2D] leading-tight">
                  <AnimatedCountNumber value={245000} prefix="N" formatComma />
                </span>
              </div>
            </motion.div>

            {/* Card 2: Budget Utilization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASING.smooth }}
              className="w-full bg-white rounded-[20px] p-5 shadow-[0_6px_24px_rgba(0,0,0,0.06)] border border-gray-150"
            >
              <div className="flex flex-col gap-1 mb-3">
                <h4 className="text-[14px] font-semibold text-[#3B7CED]">
                  Budget Utilization
                </h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-gray-500 font-normal">
                      Budget Health:
                    </span>
                    <span className="bg-[#FFF8E6] text-[#D97706] text-[9.5px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
                      At Risk
                    </span>
                  </div>
                  <span className="text-[9.5px] text-gray-400 font-normal">
                    $4,100,000 / $5,000,000 (82%)
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-5 bg-[#F1F3F5] rounded-[6px] overflow-hidden flex mb-3">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "65%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: EASING.smooth }}
                  className="h-full bg-[#3B7CED]"
                />
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "17%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: EASING.smooth }}
                  className="h-full bg-[#89CFF0]"
                />
                <div className="h-full bg-[#F1F3F5] w-[18%]" />
              </div>

              {/* Legend */}
              <div className="flex justify-between items-center text-[10px] text-gray-500 font-normal">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#3B7CED] rounded-xs" />
                  <span>Actual (65%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#89CFF0] rounded-xs" />
                  <span>Committed (17%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#E5E7EB] rounded-xs" />
                  <span>Available (18%)</span>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Spend by category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASING.smooth }}
              className="w-full bg-white rounded-[20px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-150"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[14px] font-semibold text-[#3B7CED]">
                  Spend by category
                </h4>
                {hoveredSlice !== null && (
                  <span className="text-[10px] font-bold text-[#161C2D] bg-blue-50 px-2 py-0.5 rounded-full">
                    {categorySpendData[hoveredSlice].name}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="relative w-[110px] h-[110px] shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {categorySpendData.map((slice, i) => (
                      <motion.path
                        key={i}
                        d={slice.d}
                        fill={slice.color}
                        animate={{
                          scale: hoveredSlice === i ? 1.08 : 1,
                          x: hoveredSlice === i ? slice.moveX : 0,
                          y: hoveredSlice === i ? slice.moveY : 0,
                        }}
                        onClick={() => setHoveredSlice(hoveredSlice === i ? null : i)}
                        style={{ originX: "50px", originY: "50px" }}
                        className="cursor-pointer"
                      />
                    ))}
                  </svg>
                </div>

                <div className="flex flex-col gap-1.5 flex-1">
                  {categorySpendData.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => setHoveredSlice(hoveredSlice === i ? null : i)}
                      className={`flex items-center gap-1.5 text-[10.5px] cursor-pointer rounded px-1 py-0.5 ${
                        hoveredSlice === i ? "bg-blue-50 font-bold text-gray-900" : "text-gray-500"
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-[2px] shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="truncate">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Desktop & Tablet Layered 3D Cards Layout (sm: 640px+) */}
          <div className="hidden sm:block relative w-full max-w-[540px] md:max-w-[590px] h-[440px]">
            {/* Card 1: Pending Requests (Top Left) */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: 0.1, ease: EASING.smooth }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="absolute top-0 left-0 w-[340px] md:w-[400px] bg-white rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] border border-gray-100/90 z-10 transition-shadow duration-300"
            >
              <h4 className="text-[14px] font-semibold text-[#3B7CED] mb-2.5">
                Pending Requests
              </h4>
              <div className="flex flex-col gap-0.5 border-b border-gray-100 pb-2.5 mb-2.5 max-w-[180px]">
                <span className="text-[11px] text-gray-400 font-normal">
                  Awaiting Approval
                </span>
                <span className="text-[28px] font-bold text-[#161C2D] leading-tight">
                  <AnimatedCountNumber value={12} />
                </span>
              </div>
              <div className="flex flex-col gap-0.5 max-w-[180px]">
                <span className="text-[11px] text-gray-400 font-normal">
                  Total Value
                </span>
                <span className="text-[18px] font-bold text-[#161C2D] leading-tight">
                  <AnimatedCountNumber value={245000} prefix="N" formatComma />
                </span>
              </div>
            </motion.div>

            {/* Card 3: Spend by category (Underlaps Budget Utilization - Bottom Left) */}
            <motion.div
              initial={{ opacity: 0, x: -25, y: 35 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASING.smooth }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="absolute -bottom-4 left-4 md:left-6 w-[380px] md:w-[450px] bg-white rounded-[20px] p-5 sm:p-6 shadow-[0_14px_40px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.11)] border border-gray-100/90 z-20 transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[14px] font-semibold text-[#3B7CED]">
                  Spend by category
                </h4>
                {hoveredSlice !== null && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[11px] font-bold text-[#161C2D] bg-blue-50 px-2 py-0.5 rounded-full"
                  >
                    {categorySpendData[hoveredSlice].name}
                  </motion.span>
                )}
              </div>

              <div className="flex items-center gap-5 sm:gap-7">
                <div className="relative w-[140px] h-[140px] sm:w-[155px] sm:h-[155px] shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {categorySpendData.map((slice, i) => {
                      const isHovered = hoveredSlice === i;
                      return (
                        <motion.path
                          key={i}
                          d={slice.d}
                          fill={slice.color}
                          initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
                          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          animate={{
                            scale: isHovered ? 1.08 : 1,
                            x: isHovered ? slice.moveX : 0,
                            y: isHovered ? slice.moveY : 0,
                            filter: isHovered ? "drop-shadow(0 4px 10px rgba(0,0,0,0.25))" : "none",
                          }}
                          onMouseEnter={() => setHoveredSlice(i)}
                          onMouseLeave={() => setHoveredSlice(null)}
                          transition={{
                            duration: isHovered ? 0.2 : 0.6,
                            delay: isHovered ? 0 : 0.35 + i * 0.1,
                            ease: EASING.smooth,
                          }}
                          style={{ originX: "50px", originY: "50px" }}
                          className="cursor-pointer transition-opacity"
                        />
                      );
                    })}
                  </svg>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  {categorySpendData.map((item, i) => {
                    const isHovered = hoveredSlice === i;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.45 + i * 0.08 }}
                        onMouseEnter={() => setHoveredSlice(i)}
                        onMouseLeave={() => setHoveredSlice(null)}
                        className={`flex items-center gap-2 text-[11px] font-normal cursor-pointer transition-all duration-200 rounded-md px-1.5 py-0.5 ${
                          isHovered
                            ? "bg-blue-50/80 text-gray-900 font-semibold translate-x-1"
                            : "text-gray-500 hover:text-gray-800"
                        }`}
                      >
                        <motion.span
                          animate={{ scale: isHovered ? 1.3 : 1 }}
                          className="w-2.5 h-2.5 rounded-[2px] shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Card 2: Budget Utilization (Foreground Layer) */}
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, delay: 0.4, ease: EASING.smooth }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="absolute top-8 sm:top-20 right-0 sm:left-[180px] md:left-[215px] w-[320px] md:w-[365px] bg-white rounded-[20px] p-4.5 sm:p-5.5 shadow-[0_16px_45px_rgba(0,0,0,0.1)] hover:shadow-[0_24px_55px_rgba(0,0,0,0.14)] border border-gray-100/90 z-30 transition-shadow duration-300"
            >
              <div className="flex flex-col gap-1 mb-2.5">
                <h4 className="text-[14px] font-semibold text-[#3B7CED]">
                  Budget Utilization
                </h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-gray-500 font-normal">
                      Budget Health:
                    </span>
                    <motion.span
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: [0.8, 1.1, 1] }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7, duration: 0.4 }}
                      className="bg-[#FFF8E6] text-[#D97706] text-[9.5px] font-semibold px-2 py-0.5 rounded-full shadow-xs"
                    >
                      At Risk
                    </motion.span>
                  </div>
                  <span className="text-[9.5px] text-gray-400 font-normal">
                    $4,100,000 / $5,000,000(82.0%)
                  </span>
                </div>
              </div>

              <div className="w-full h-6 bg-[#F1F3F5] rounded-[6px] overflow-hidden flex mb-3.5">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "65%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.5, ease: EASING.smooth }}
                  className="h-full bg-[#3B7CED]"
                />
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "17%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.85, ease: EASING.smooth }}
                  className="h-full bg-[#89CFF0]"
                />
                <div
                  className="h-full bg-[#F1F3F5]"
                  style={{ width: "18%" }}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] text-gray-500 font-normal">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#3B7CED] rounded-sm" />
                  <span>Actual (65.0%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#89CFF0] rounded-sm" />
                  <span>Committed (17.0%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#E5E7EB] rounded-sm" />
                  <span>Available (18.0%)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
