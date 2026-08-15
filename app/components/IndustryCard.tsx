"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconProps } from "./Icons";
import SpotlightCard from "./motion/SpotlightCard";

export interface IndustryCardProps {
  name: string;
  icon: React.ComponentType<IconProps>;
  className?: string;
}

export default function IndustryCard({
  name,
  icon: IconComponent,
  className = "",
}: IndustryCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 18, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className="w-full h-full"
    >
      <SpotlightCard
        whileHover={{
          y: -4,
          scale: 1.02,
          boxShadow: "0 12px 28px -6px rgba(59, 124, 237, 0.16)",
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        spotlightColor="59, 124, 237"
        spotlightSize={260}
        spotlightAlpha={0.15}
        className={`bg-[#3B7CED29] hover:bg-[#3B7CED38] transition-colors duration-200 rounded-xl p-5 sm:py-6 sm:px-4 flex flex-col items-center justify-center gap-3.5 min-h-32 sm:min-h-33.75 cursor-default select-none border border-blue-500/10 ${className}`}
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: [0, -4, 4, 0] }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center relative z-10"
        >
          <IconComponent />
        </motion.div>
        <span className="font-semibold text-[13px] sm:text-[14px] text-[#161C2D] tracking-tight text-center relative z-10">
          {name}
        </span>
      </SpotlightCard>
    </motion.div>
  );
}
