"use client";

import React from "react";
import SmoothScrollProvider from "./components/motion/SmoothScrollProvider";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BuiltForProjects from "./components/BuiltForProjects";
import ProductSnapshot from "./components/ProductSnapshot";
import HowItWorks from "./components/HowItWorks";
import FeaturesSuite from "./components/FeaturesSuite";
import SecurityTrust from "./components/SecurityTrust";
import ProjectLifecycle from "./components/ProjectLifecycle";
import WhatFastraDoes from "./components/WhatFastraDoes";
import WhyFastraSuite from "./components/WhyFastraSuite";
import TheComparison from "./components/TheComparison";
import StartFreeCTA from "./components/StartFreeCTA";
import AssessmentTool from "./components/AssessmentTool";
import TrustLogos from "./components/TrustLogos";
import GrowingBanner from "./components/GrowingBanner";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden">
        {/* Navigation Header */}
        <Header />

        {/* Main Sections */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero />

          {/* Built For Project-Based Businesses Grid */}
          <BuiltForProjects />

          {/* Product Snapshot / Dashboards */}
          <ProductSnapshot />

          {/* How It Works Flow */}
          <HowItWorks />

          {/* Example Scenario (What this actually looks like) */}
          <FeaturesSuite />

          {/* Security & Trust */}
          <SecurityTrust />

          {/* The Project Lifecycle */}
          <ProjectLifecycle />

          {/* What FastraSuite actually does for you */}
          <WhatFastraDoes />

          {/* Why FastraSuite */}
          <WhyFastraSuite />

          {/* The Comparison */}
          <TheComparison />

          {/* Start Free CTA */}
          <StartFreeCTA />

          {/* Free Assessment Tool */}
          <AssessmentTool />

          {/* Trusted By Logos */}
          <TrustLogos />

          {/* Final Photo CTA */}
          <FinalCTA />

          {/* FastraSuite Is Growing Banner */}
          <GrowingBanner />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
