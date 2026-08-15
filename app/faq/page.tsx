import React from "react";
import SmoothScrollProvider from "../components/motion/SmoothScrollProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FAQHero from "../components/faq/FAQHero";
import FAQList from "../components/faq/FAQList";

export const metadata = {
  title: "FAQ | FastraSuite",
  description: "Frequently asked questions about FastraSuite. Everything you need to know before getting started.",
};

export default function FAQPage() {
  return (
    <SmoothScrollProvider>
      <main className="flex min-h-screen flex-col">
        <Header />
        
        <FAQHero />
        <FAQList />

        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
