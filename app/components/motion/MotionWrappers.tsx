"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  HTMLMotionProps,
} from "framer-motion";

// Linear & Apple grade standard cubic bezier easings
export const EASING = {
  smooth: [0.16, 1, 0.3, 1] as const,
  gentle: [0.25, 1, 0.5, 1] as const,
  spring: { type: "spring", stiffness: 260, damping: 20 } as const,
  bouncySpring: { type: "spring", stiffness: 400, damping: 15 } as const,
};

// 1. FadeIn Viewport Reveal
interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  className?: string;
  viewportAmount?: number;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.65,
  direction = "up",
  distance = 24,
  className = "",
  viewportAmount = 0.15,
  ...props
}: FadeInProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  return (
    <motion.div
      initial={{ opacity: 0, ...initialPos }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: viewportAmount }}
      transition={{
        duration,
        delay,
        ease: EASING.smooth,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// 2. StaggerContainer & StaggerItem
interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  viewportAmount?: number;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  delayChildren = 0.1,
  className = "",
  viewportAmount = 0.15,
  ...props
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}

export function StaggerItem({
  children,
  className = "",
  distance = 20,
  ...props
}: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: EASING.smooth,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// 3. 3D Tilt Card Component
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scaleOnHover?: number;
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  scaleOnHover = 1.02,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: scaleOnHover }}
      transition={{ duration: 0.2 }}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// 4. Subtle Ambient Floating Element
interface FloatElementProps {
  children: React.ReactNode;
  duration?: number;
  distance?: number;
  className?: string;
}

export function FloatElement({
  children,
  duration = 4.5,
  distance = 8,
  className = "",
}: FloatElementProps) {
  return (
    <motion.div
      animate={{
        y: [-distance / 2, distance / 2, -distance / 2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
