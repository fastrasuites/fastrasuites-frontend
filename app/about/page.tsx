import React from "react";
import SmoothScrollProvider from "../components/motion/SmoothScrollProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FinalCTA from "../components/FinalCTA";
import AboutHero from "../components/about/AboutHero";
import AboutWhyExists from "../components/about/AboutWhyExists";
import AboutMission from "../components/about/AboutMission";
import AboutBeliefs from "../components/about/AboutBeliefs";

export const metadata = {
  title: "About FastraSuite | Built for project-based work",
  description: "FastraSuite was built for the request happening on-site right now, checked against a live budget before it's approved.",
};

export default function AboutPage() {
  return (
    <SmoothScrollProvider>
      <Header />
      <main className="min-h-screen bg-white">
        <AboutHero />
        <AboutWhyExists />
        <AboutMission />
        <AboutBeliefs />
        <FinalCTA />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
