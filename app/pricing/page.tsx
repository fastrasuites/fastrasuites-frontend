import React from "react";
import SmoothScrollProvider from "../components/motion/SmoothScrollProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PricingHero from "../components/pricing/PricingHero";
import PricingCards from "../components/pricing/PricingCards";
import PricingCTA from "../components/pricing/PricingCTA";
import PricingComparisonTable from "../components/pricing/PricingComparisonTable";
import PricingFAQ from "../components/pricing/PricingFAQ";

export const metadata = {
  title: "Pricing | FastraSuite",
  description: "Two ways to run FastraSuite, both cover the full spending loop. Start free for 14 days, no card required.",
};

export default function PricingPage() {
  return (
    <SmoothScrollProvider>
      <Header />
      <main className="min-h-screen bg-white">
        <PricingHero />
        <PricingCards />
        <PricingCTA />
        <PricingComparisonTable />
        <PricingFAQ />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
