"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ConstructionIcon,
  EngineeringIcon,
  InfrastructureIcon,
  FacilitiesMgmtIcon,
  EPCContractorsIcon,
  ConsultingIcon,
  ProfessionalServicesIcon,
  RenewableEnergyIcon,
  FieldServicesIcon,
} from "./Icons";
import IndustryCard, { IndustryCardProps } from "./IndustryCard";
import { FadeIn } from "./motion/MotionWrappers";

const ALL_INDUSTRIES: IndustryCardProps[] = [
  { name: "Construction", icon: ConstructionIcon },
  { name: "Engineering", icon: EngineeringIcon },
  { name: "Infrastructure", icon: InfrastructureIcon },
  { name: "Facilities Mgmt", icon: FacilitiesMgmtIcon },
  { name: "EPC Contractors", icon: EPCContractorsIcon },
  { name: "Consulting", icon: ConsultingIcon },
  { name: "Professional Services", icon: ProfessionalServicesIcon },
  { name: "Renewable Energy", icon: RenewableEnergyIcon },
  { name: "Field Services", icon: FieldServicesIcon },
];

export default function BuiltForProjects() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section className="py-16 md:py-20 bg-white text-center px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Category Pill */}
        <FadeIn delay={0.05} direction="up" distance={15}>
          <div className="inline-flex items-center justify-center bg-[#DBEAFE]/70 text-[#3B7CED] text-[13px] font-medium px-4 py-1 rounded-full mb-4">
            Who it&apos;s for
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.12} direction="up" distance={18}>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#161C2D] tracking-tight mb-4 text-center leading-tight">
            Built for Project-Based Businesses
          </h2>
        </FadeIn>

        {/* Subtext */}
        <FadeIn delay={0.18} direction="up" distance={18}>
          <p className="text-[#5A6578] max-w-[680px] text-[14.5px] sm:text-[16px] leading-[1.65] font-normal mb-6 sm:mb-8 text-center">
            If your work is organized around projects, budgets, and site or field
            activities, FastraSuite fits the way you operate. The platform is
            built for any project-driven business.
          </p>
        </FadeIn>

        {/* Unified Responsive Grid (Mobile: 2 cols with centered 9th item, Tablet: 3x3, Desktop: 5+4 centered) */}
        {/* Mobile & Tablet Grid (below lg: 1024px) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid lg:hidden grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-[720px]"
        >
          {ALL_INDUSTRIES.map((item, idx) => (
            <div
              key={item.name}
              className={idx === 8 ? "col-span-2 sm:col-span-1 flex justify-center" : ""}
            >
              <IndustryCard {...item} className={idx === 8 ? "max-w-[280px] sm:max-w-none w-full" : ""} />
            </div>
          ))}
        </motion.div>

        {/* Desktop Grid (lg: 1024px+) */}
        <div className="hidden lg:flex flex-col gap-4 items-center w-full">
          {/* Row 1 (5 items) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-5 gap-4 w-full max-w-[880px]"
          >
            {ALL_INDUSTRIES.slice(0, 5).map((item) => (
              <IndustryCard key={item.name} {...item} />
            ))}
          </motion.div>

          {/* Row 2 (4 items centered) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-4 gap-4 w-full max-w-[704px]"
          >
            {ALL_INDUSTRIES.slice(5).map((item) => (
              <IndustryCard key={item.name} {...item} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
