"use client";

import React from "react";
import { FadeIn, EASING } from "../motion/MotionWrappers";
import { motion } from "framer-motion";
import { ClipboardList, Mail, MessageCircle } from "lucide-react";

const contactMethods = [
  {
    icon: ClipboardList,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    title: "Book a demo",
    description: "Via the form above",
  },
  {
    icon: Mail,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    title: "Email",
    description: "info@fastrasuite.com",
    href: "mailto:info@fastrasuite.com",
  },
  {
    icon: MessageCircle,
    iconColor: "text-green-500",
    iconBg: "bg-green-50",
    title: "WhatsApp",
    description: "+234 808 989 2733",
    href: "https://wa.me/2348089892733",
  },
];

export default function ContactCards() {
  return (
    <section className="py-20 md:py-32 bg-white px-4 sm:px-6 md:px-12">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        <FadeIn delay={0.1} distance={20}>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#161C2D] tracking-tight mb-12">
            Ways to reach us
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          {contactMethods.map((method, idx) => {
            const CardWrapper = method.href ? motion.a : motion.div;
            return (
              <FadeIn key={idx} delay={0.15 + (idx * 0.1)} distance={20} direction="up" className="w-full">
                <CardWrapper
                  {...(method.href
                    ? {
                        href: method.href,
                        target: method.href.startsWith("http") ? "_blank" : undefined,
                        rel: method.href.startsWith("http") ? "noopener noreferrer" : undefined,
                      }
                    : {})}
                  whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}
                  transition={{ duration: 0.3, ease: EASING.smooth }}
                  className={`bg-[#F9FAFB] border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full transition-colors hover:bg-white block ${
                    method.href ? "cursor-pointer" : ""
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${method.iconBg}`}>
                    <method.icon className={`w-6 h-6 ${method.iconColor}`} strokeWidth={2} />
                  </div>
                  
                  <h3 className="text-[16px] font-semibold text-[#161C2D] mb-2">
                    {method.title}
                  </h3>
                  <p className="text-[13px] text-gray-500">
                    {method.description}
                  </p>
                </CardWrapper>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
