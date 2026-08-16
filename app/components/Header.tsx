"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { EASING } from "./motion/MotionWrappers";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Product", href: "/product" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: EASING.smooth,
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      height: "calc(100vh - 72px)",
      transition: {
        duration: 0.4,
        ease: EASING.smooth,
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, x: -16 },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: EASING.smooth },
    },
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-[#0c1524]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/25 py-3.5 sm:py-4"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="relative h-8 sm:h-9 w-28 sm:w-32 flex items-center group transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Image
            src="/fastrasuite-logo.png"
            alt="FastraSuite Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" &&
                pathname?.startsWith(item.href) &&
                !item.href.includes("#"));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm font-medium transition-colors py-1 group ${
                  isActive ? "text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                {item.name}
                {/* Subtle dynamic underline glow */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#3b82f6] transition-all duration-200 ease-out rounded-full opacity-90 shadow-[0_0_8px_#3b82f6] ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="https://fastra-suite-new.vercel.app/"
            className="text-sm font-medium text-white hover:text-gray-200 transition-colors px-2 py-1 hover:opacity-90 active:scale-95"
          >
            Log in
          </Link>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="https://fastra-suite-new.vercel.app/"
              className="inline-block bg-[#3b82f6] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-colors shadow-md shadow-blue-500/20 hover:shadow-blue-500/35"
            >
              Start Free Trial
            </Link>
          </motion.div>
        </div>

        {/* Mobile Actions: CTA + Animated Hamburger */}
        <div className="flex md:hidden items-center gap-2.5">
          <Link
            href="https://fastra-suite-new.vercel.app/"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-[#3b82f6] text-white text-xs font-bold px-3.5 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-xs"
          >
            Trial
          </Link>

          {/* Hamburger / Close Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-hidden hover:bg-white/10 active:scale-95 transition-all"
          >
            <motion.span
              animate={
                mobileMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.25 }}
              className="w-5 h-[2px] bg-white rounded-full origin-center"
            />
            <motion.span
              animate={
                mobileMenuOpen
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.2 }}
              className="w-5 h-[2px] bg-white rounded-full"
            />
            <motion.span
              animate={
                mobileMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.25 }}
              className="w-5 h-[2px] bg-white rounded-full origin-center"
            />
          </button>
        </div>
      </div>

      {/* World-Class Mobile Navigation Drawer (Stripe / Linear style) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden fixed top-[60px] sm:top-[68px] inset-x-0 bg-[#0c1524]/98 backdrop-blur-2xl border-b border-white/10 overflow-y-auto px-6 py-8 flex flex-col justify-between"
          >
            {/* Links List */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-2">
                Navigation
              </span>
              {NAV_LINKS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" &&
                    pathname?.startsWith(item.href) &&
                    !item.href.includes("#"));
                return (
                  <motion.div key={item.name} variants={linkVariants}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between text-[17px] font-medium px-3 py-3.5 rounded-xl transition-all active:scale-[0.98] ${
                        isActive
                          ? "text-white bg-white/10"
                          : "text-gray-200 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{item.name}</span>
                      <svg
                        className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-500"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Bottom Actions */}
            <motion.div
              variants={linkVariants}
              className="flex flex-col gap-3 pt-8 border-t border-white/10 mt-6"
            >
              <Link
                href="https://fastra-suite-new.vercel.app/"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-sm font-semibold text-gray-300 hover:text-white py-3 rounded-xl border border-white/15 bg-white/5 active:scale-[0.98] transition-all"
              >
                Log in
              </Link>
              <Link
                href="https://fastra-suite-new.vercel.app/"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-sm font-bold text-white bg-[#3b82f6] hover:bg-blue-600 py-3.5 rounded-xl shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all"
              >
                Start Free 14-Day Trial
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
