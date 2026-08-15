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
    description: "Via the form above"
  },
  {
    icon: Mail,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    title: "Email",
    description: "hello@fastrasuite.com"
  },
  {
    icon: MessageCircle,
    iconColor: "text-green-500",
    iconBg: "bg-green-50",
    title: "WhatsApp",
    description: "+234 1800 123 4567"
  }
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
          {contactMethods.map((method, idx) => (
            <FadeIn key={idx} delay={0.15 + (idx * 0.1)} distance={20} direction="up" className="w-full">
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}
                transition={{ duration: 0.3, ease: EASING.smooth }}
                className="bg-[#F9FAFB] border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full transition-colors hover:bg-white"
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
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
