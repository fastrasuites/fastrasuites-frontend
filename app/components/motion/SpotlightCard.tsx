"use client";

import React, { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface SpotlightCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
  spotlightAlpha?: number;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "59, 130, 246", // Brand Blue rgb
  spotlightSize = 340,
  spotlightAlpha = 0.08,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition(null);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Subtle Radial Cursor Spotlight Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ease-out"
        style={{
          opacity: isHovered && mousePosition ? 1 : 0,
          background: mousePosition
            ? `radial-gradient(${spotlightSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${spotlightColor}, ${spotlightAlpha}), transparent 75%)`
            : "none",
        }}
      />
      {children}
    </motion.div>
  );
}
