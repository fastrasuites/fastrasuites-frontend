import React from "react";
import SmoothScrollProvider from "../components/motion/SmoothScrollProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PricingHero from "../components/pricing/PricingHero";
import PricingCards from "../components/pricing/PricingCards";
import PricingEveryPlan from "../components/pricing/PricingEveryPlan";
import PricingAdvisor from "../components/pricing/PricingAdvisor";
import PricingAnnualSavings from "../components/pricing/PricingAnnualSavings";
import PricingComparisonTable from "../components/pricing/PricingComparisonTable";

export const metadata = {
  title: "Pricing | FastraSuite",
  description:
    "Two ways to run FastraSuite, both cover the full spending loop. Simple, transparent pricing that scales with your business.",
};

export default function PricingPage() {
  return (
    <SmoothScrollProvider>
      <Header />
      <main className="min-h-screen bg-white">
        <PricingHero />
        <PricingCards />
        <PricingEveryPlan />
        <PricingAdvisor />
        <PricingAnnualSavings />
        <PricingComparisonTable />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
