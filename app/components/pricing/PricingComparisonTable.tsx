"use client";

import React from "react";
import { Check, Minus } from "lucide-react";
import { FadeIn } from "../motion/MotionWrappers";

type FeatureRow = {
  name: string;
  starter: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
};

export default function PricingComparisonTable() {
  const comparisonRows: FeatureRow[] = [
    {
      name: "Project access",
      starter: "1",
      pro: "5",
      enterprise: "Unlimited",
    },
    {
      name: "Users",
      starter: "5",
      pro: "25",
      enterprise: "Unlimited",
    },
    {
      name: "Approval flows",
      starter: "Basic",
      pro: "Advanced",
      enterprise: "Custom",
    },
    {
      name: "Real-time spend tracking",
      starter: true,
      pro: true,
      enterprise: true,
    },
    {
      name: "Automated approvals",
      starter: false,
      pro: true,
      enterprise: true,
    },
    {
      name: "Audit trail",
      starter: true,
      pro: true,
      enterprise: true,
    },
    {
      name: "Multi-currency",
      starter: "1 currency",
      pro: "Multi-currency",
      enterprise: "Multi-currency",
    },
    {
      name: "Reports & analytics",
      starter: "Standard",
      pro: "Advanced",
      enterprise: "Custom",
    },
    {
      name: "Dedicated support",
      starter: "Standard",
      pro: "Priority",
      enterprise: "Dedicated",
    },
    {
      name: "Multi-company management",
      starter: false,
      pro: false,
      enterprise: true,
    },
    {
      name: "ERP integrations",
      starter: false,
      pro: false,
      enterprise: true,
    },
    {
      name: "Custom workflows",
      starter: false,
      pro: false,
      enterprise: true,
    },
    {
      name: "Payment processing",
      starter: "Standard",
      pro: "Volume discount",
      enterprise: "Custom",
    },
  ];

  const renderCell = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <div className="flex justify-center items-center">
          <Check className="w-5 h-5 text-[#2563EB]" strokeWidth={2.5} />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Minus className="w-4 h-4 text-gray-300" strokeWidth={2} />
        </div>
      );
    }
    return (
      <span className="text-sm font-medium text-gray-800">
        {value}
      </span>
    );
  };

  return (
    <section className="py-20 md:py-28 bg-white px-4 sm:px-6 md:px-12">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Section Headings */}
        <FadeIn delay={0.05} distance={15}>
          <h2 className="text-3xl sm:text-4xl md:text-[38px] font-bold text-[#111827] tracking-tight mb-3 text-center">
            Compare Plans
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} distance={15}>
          <p className="text-base text-gray-600 text-center mb-1">
            Find the right plan for your team and business
          </p>
        </FadeIn>

        <FadeIn delay={0.15} distance={15}>
          <p className="text-sm text-gray-400 text-center mb-12">
            Here&apos;s a breakdown of what you get with each plan:
          </p>
        </FadeIn>

        {/* Table Container */}
        <FadeIn delay={0.2} distance={20} className="w-full">
          <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 shadow-xs bg-white">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200">
                  <th className="py-4.5 px-6 font-bold text-gray-900 text-[13px] uppercase tracking-wider w-[40%]">
                    Features
                  </th>
                  <th className="py-4.5 px-6 font-bold text-gray-900 text-[13px] uppercase tracking-wider text-center w-[20%]">
                    Starter
                  </th>
                  <th className="py-4.5 px-6 font-bold text-gray-900 text-[13px] uppercase tracking-wider text-center w-[20%]">
                    Professional
                  </th>
                  <th className="py-4.5 px-6 font-bold text-gray-900 text-[13px] uppercase tracking-wider text-center w-[20%]">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-blue-50/20 transition-colors"
                  >
                    <td className="py-4 px-6 text-sm font-medium text-gray-700">
                      {row.name}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {renderCell(row.starter)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {renderCell(row.pro)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {renderCell(row.enterprise)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
