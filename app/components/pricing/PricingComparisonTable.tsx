"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { FadeIn } from "../motion/MotionWrappers";

export default function PricingComparisonTable() {
  const features = [
    { name: "Project Request Module", core: true, enterprise: true },
    { name: "Project Costing Module", core: true, enterprise: true },
    { name: "Invoice Module", core: true, enterprise: true },
    { name: "Inventory Module", core: true, enterprise: true },
    { name: "Purchase Request routing, vendor sourcing", core: false, enterprise: true },
    { name: "Sales orders", core: false, enterprise: true },
    { name: "HR Management", core: false, enterprise: true },
    { name: "Asset Management", core: false, enterprise: true },
    { name: "Upgrade anytime, no data loss", core: true, enterprise: false },
  ];

  return (
    <section className="py-12 md:py-28 bg-white px-4 sm:px-6 md:px-12">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        <FadeIn delay={0.1} distance={15}>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#161C2D] tracking-tight mb-12">
            Feature comparison
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} distance={20} className="w-full">
          <div className="w-full overflow-x-auto pb-4">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-4 sm:px-6 font-semibold text-gray-900 text-sm w-1/2">Feature</th>
                  <th className="py-4 px-4 sm:px-6 font-semibold text-gray-900 text-sm text-center w-1/4">Core</th>
                  <th className="py-4 px-4 sm:px-6 font-semibold text-blue-600 text-sm text-center w-1/4">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => (
                  <motion.tr 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-4 sm:px-6 text-sm text-gray-700">
                      {feature.name}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <div className="flex justify-center">
                        {feature.core ? (
                          <Check className="w-4 h-4 text-green-500" strokeWidth={3} />
                        ) : (
                          <Minus className="w-4 h-4 text-gray-300" strokeWidth={2} />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <div className="flex justify-center">
                        {feature.enterprise ? (
                          <Check className="w-4 h-4 text-blue-500" strokeWidth={3} />
                        ) : (
                          <Minus className="w-4 h-4 text-gray-300" strokeWidth={2} />
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
