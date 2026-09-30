"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "./motion/MotionWrappers";

const logos = [
  { src: "/logos/alkaisar.jpeg", alt: "Al Kaisar" },
  {
    src: "/logos/businesscontractinglimited.jpeg",
    alt: "Business Contracting Limited",
  },
  {
    src: "/logos/hjubranintegratedservices.jpeg",
    alt: "H Jubran Integrated Services",
  },
  { src: "/logos/rosettee.jpeg", alt: "Rosette" },
];

export default function TrustLogos() {
  return (
    <section className="py-12 sm:py-16 bg-white px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-5 sm:gap-8 text-center">
        <FadeIn delay={0.05} distance={15}>
          <p className="text-[12.5px] sm:text-[13px] text-[#5A6578] font-normal tracking-normal">
            Trusted by construction and project teams
          </p>
        </FadeIn>

        <FadeIn delay={0.15} distance={18}>
          <div className="flex items-center justify-center gap-6 sm:gap-12 md:gap-20 opacity-75 hover:opacity-100 transition-opacity">
            {logos.map((logo, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.08 }}
                className="relative h-14 sm:h-20 md:h-24 w-24 sm:w-36 md:w-48 shrink-0"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 144px, 192px"
                  className="object-contain"
                />
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
