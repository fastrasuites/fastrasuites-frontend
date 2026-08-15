import React from "react";
import SmoothScrollProvider from "../components/motion/SmoothScrollProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";
import ContactCards from "../components/contact/ContactCards";

export const metadata = {
  title: "Contact Us | FastraSuite",
  description: "Get in touch with the FastraSuite team. Prefer a guided walkthrough first? Book a demo today.",
};

export default function ContactPage() {
  return (
    <SmoothScrollProvider>
      <main className="flex min-h-screen flex-col bg-white">
        <Header />
        
        <ContactHero />
        <ContactForm />
        <ContactCards />

        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
