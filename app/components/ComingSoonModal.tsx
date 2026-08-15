"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASING } from "./motion/MotionWrappers";
import { Sparkles, X } from "lucide-react";

export default function ComingSoonModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#signup" || hash === "#login" || hash === "#demo") {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Check on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    
    // Hijack clicks for smoother SPA experience without strict hash jumping
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (link) {
        const href = link.getAttribute("href");
        if (href === "#signup" || href === "#login" || href === "#demo") {
          e.preventDefault();
          window.location.hash = href;
          setIsOpen(true);
        } else if (href === "#" && (link.textContent?.toLowerCase().includes("log in") || link.textContent?.toLowerCase().includes("login"))) {
          e.preventDefault();
          window.location.hash = "login";
          setIsOpen(true);
        }
      }
    };
    
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const close = () => {
    setIsOpen(false);
    // Remove hash without scrolling
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-[#0c1524]/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300, ease: EASING.smooth }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-10 text-center"
          >
            {/* Close Button */}
            <button
              onClick={close}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon */}
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-500 shadow-inner">
              <Sparkles className="w-8 h-8" strokeWidth={2} />
            </div>

            {/* Text */}
            <h3 className="text-2xl font-bold text-[#161C2D] mb-3">
              Coming Soon
            </h3>
            <p className="text-[15px] text-gray-500 leading-relaxed mb-8">
              We&apos;re putting the finishing touches on this feature. FastraSuite is launching soon—stay tuned!
            </p>

            {/* Button */}
            <button
              onClick={close}
              className="w-full py-3.5 bg-[#4285F4] hover:bg-[#3367D6] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 active:scale-[0.98] focus:outline-none"
            >
              Got it, thanks!
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
