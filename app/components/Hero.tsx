"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import HeroParticles from "./motion/HeroParticles";
import { EASING } from "./motion/MotionWrappers";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  // Mouse position values for 3D parallax tilt (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D rotations and depth translations for product mockup layer
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);
  const mockupTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);
  const mockupTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [-6, 6]);

  // Subtle Aurora Parallax
  const aurora1X = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);
  const aurora1Y = useTransform(smoothMouseY, [-0.5, 0.5], [-8, 8]);
  const aurora2X = useTransform(smoothMouseX, [-0.5, 0.5], [14, -14]);
  const aurora2Y = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);

  // Living Product Demonstration: simulated subtle live activity
  const [livePulseIndex, setLivePulseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLivePulseIndex((prev) => (prev + 1) % 3);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Staggered entrance variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: EASING.smooth,
      },
    },
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[#0c1524] text-white pt-28 sm:pt-36 md:pt-40 pb-0 overflow-hidden pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-12 md:pr-12 lg:pl-12 lg:pr-0 min-h-[620px] sm:min-h-[680px] lg:min-h-[680px] flex items-end"
    >
      {/* 1. Desktop Exact Background Image Layer (lg: 1024px+ - 100% UNCHANGED) */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="hidden lg:block absolute inset-0 bg-cover bg-no-repeat bg-right-top pointer-events-none z-0 opacity-70"
        style={{
          backgroundImage: `linear-gradient(to right, #0c1524 35%, rgba(12, 21, 36, 0.6) 65%, rgba(12, 21, 36, 0.25) 90%), url('/hero_bg.jpg')`,
          backgroundPosition: "right -300px top 50%",
        }}
      />

      {/* 1b. Mobile & Tablet Background Image Layer (< 1024px - Seamless with zero split) */}
      <div className="block lg:hidden absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/hero_bg.jpg"
          alt="Engineering and Project background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70 sm:opacity-80"
        />
        {/* Seamless full gradient veil for zero split on mobile/tablet */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1524] via-[#0c1524]/80 to-[#0c1524]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0c1524_88%)]" />
      </div>

      {/* 2. Dimmed Soft Ambient Aurora Mesh Glows (Subtle, Elegant Lighting) */}
      <motion.div
        style={{ x: aurora1X, y: aurora1Y }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.16, 0.24, 0.16],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-[5%] sm:right-[8%] w-[320px] sm:w-[500px] lg:w-[620px] h-[320px] sm:h-[420px] lg:h-[480px] bg-gradient-to-tr from-[#1e3a8a]/30 via-[#2563eb]/20 to-transparent rounded-full blur-[100px] sm:blur-[150px] pointer-events-none z-0"
      />

      <motion.div
        style={{ x: aurora2X, y: aurora2Y }}
        animate={{
          scale: [1, 1.04, 1],
          opacity: [0.10, 0.18, 0.10],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute top-16 sm:top-20 left-[2%] sm:left-[5%] w-[280px] sm:w-[400px] lg:w-[480px] h-[280px] sm:h-[340px] lg:h-[380px] bg-gradient-to-br from-[#1d4ed8]/20 via-[#3b82f6]/10 to-transparent rounded-full blur-[90px] sm:blur-[140px] pointer-events-none z-0"
      />

      {/* 3. Atmospheric Living Data Flow & 3D Spherical Particle Globe */}
      <HeroParticles />

      {/* 4. Ultra-Subtle High-Tech Grid Overlay with Smooth Radial Vignette Mask */}
      <div
        className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] sm:bg-[size:3.5rem_3.5rem] pointer-events-none z-0"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 80%)",
        }}
      />

      {/* Top & Bottom Seamless Edge Blends */}
      <div className="absolute inset-x-0 top-0 h-24 sm:h-28 bg-gradient-to-b from-[#0c1524]/80 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-[#0c1524] to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl ml-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-end relative z-10">
        {/* Left Column: Headline and Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 flex flex-col gap-5 sm:gap-7 pb-8 sm:pb-12 md:pb-20 lg:pb-24 pr-0 sm:pr-4 md:pr-8 lg:pr-0 text-left"
        >
          {/* Pill Badge with Living Pulse */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 sm:gap-2.5 bg-blue-500/10 border border-blue-500/30 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold text-blue-400 w-fit tracking-wide shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:border-blue-500/50 transition-colors backdrop-blur-xs">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <span className="truncate">The operating system for project-based businesses</span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-[32px] xs:text-[36px] sm:text-[44px] md:text-[50px] lg:text-[54px] font-black tracking-tight leading-[1.12] sm:leading-[1.1]"
          >
            Nothing moves on your <br className="hidden xs:inline" />
            project without <span className="text-[#3b82f6]">your</span> <br className="hidden xs:inline" />
            <span className="text-[#3b82f6]">budget knowing</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-[14px] sm:text-[15px] md:text-[16.5px] leading-relaxed max-w-xl"
          >
            FastraSuite checks every field request against your live budget
            before it&apos;s approved, then carries it through purchasing and payment
            automatically, mobile-first, for teams who aren&apos;t sitting at a desk.
          </motion.p>

          {/* Buttons: Full Width on Mobile, Original Style on Desktop */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.025, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-[#3b82f6] text-white font-extrabold text-[14.5px] sm:text-[15px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl sm:rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 cursor-pointer text-center"
            >
              Start Free 14-Day Trial
              <svg
                className="w-4 h-4 stroke-[3] transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.025, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto border border-white/25 hover:border-white/50 text-white font-extrabold text-[14.5px] sm:text-[15px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl sm:rounded-lg bg-black/10 hover:bg-white/5 transition-all cursor-pointer text-center"
            >
              Book a 15-Minute Demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Column: Living Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASING.smooth }}
          className="lg:col-span-6 relative flex justify-center lg:justify-end items-end h-[280px] xs:h-[340px] sm:h-[420px] md:h-[480px] lg:h-[530px] w-full overflow-hidden"
          style={{ perspective: 1200 }}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              x: mockupTranslateX,
              y: mockupTranslateY,
              transformStyle: "preserve-3d",
            }}
            animate={{
              y: [-3, 3, -3],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full h-full flex justify-center lg:justify-end items-end"
          >
            <Image
              src="/hero_mockup.png"
              alt="Project Costing and Purchase Request Mockup"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
              className="object-contain object-bottom drop-shadow-2xl"
              priority
              unoptimized
            />

            {/* Simulated Live Telemetry Activity Badge Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute top-4 sm:top-10 md:top-12 left-2 sm:left-6 md:left-12 bg-[#0c1524]/92 backdrop-blur-md border border-blue-500/30 rounded-xl px-3 py-1.5 sm:px-3.5 sm:py-2 shadow-xl shadow-black/40 flex items-center gap-2 sm:gap-2.5 z-20"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <div className="flex flex-col">
                <span className="text-[9px] sm:text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                  Live Budget Sync
                </span>
                <span className="text-[10.5px] sm:text-[11.5px] font-bold text-white leading-tight">
                  {livePulseIndex === 0 && "Checking request #402..."}
                  {livePulseIndex === 1 && "Budget verified ✓"}
                  {livePulseIndex === 2 && "Real-time ledger synced"}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
