"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "./motion/MotionWrappers";

export default function Footer() {
  return (
    <footer className="bg-[#071325] text-white py-12 sm:py-16 px-4 sm:px-6 md:px-12 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 border-b border-gray-800 pb-10 sm:pb-12 mb-6 sm:mb-8">
        {/* Left Column: Branding, Address & Contacts */}
        <FadeIn delay={0.05} distance={18} className="lg:col-span-5 flex flex-col gap-5 sm:gap-6 text-left">
          <Link href="/" className="relative h-8 sm:h-9 w-28 sm:w-32 flex items-center group transition-transform hover:scale-[1.02]">
            <Image
              src="/fastrasuite-logo.png"
              alt="FastraSuite Logo"
              fill
              className="object-contain object-left"
            />
          </Link>

          <div className="flex flex-col gap-1 text-xs md:text-sm text-gray-400">
            <span className="font-extrabold text-white text-[11px] sm:text-[12px] uppercase tracking-wider">
              Address:
            </span>
            <span>Level 1, 12 Sample St, Sydney NSW 2000</span>
          </div>

          <div className="flex flex-col gap-1 text-xs md:text-sm text-gray-400">
            <span className="font-extrabold text-white text-[11px] sm:text-[12px] uppercase tracking-wider">
              Contact:
            </span>
            <Link
              href="tel:18001234567"
              className="hover:text-white hover:underline transition-all"
            >
              1800 123 4567
            </Link>
            <Link
              href="mailto:email@example.com"
              className="hover:text-white hover:underline transition-all"
            >
              email@example.com
            </Link>
          </div>

          {/* Social Icons Row */}
          <div className="flex items-center gap-4 text-gray-400 mt-1">
            {/* Facebook */}
            <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link href="#" className="hover:text-white transition-colors block p-1">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </Link>
            </motion.div>
            {/* Instagram */}
            <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link href="#" className="hover:text-white transition-colors block p-1">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </Link>
            </motion.div>
            {/* X (Twitter) */}
            <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link href="#" className="hover:text-white transition-colors block p-1">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
            </motion.div>
            {/* LinkedIn */}
            <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link href="#" className="hover:text-white transition-colors block p-1">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            </motion.div>
            {/* YouTube */}
            <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link href="#" className="hover:text-white transition-colors block p-1">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </FadeIn>

        {/* Right Columns: Footer links */}
        <FadeIn delay={0.15} distance={18} className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {/* Product Column */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <span className="text-xs uppercase font-extrabold tracking-wider text-white">
              Product
            </span>
            <ul className="flex flex-col gap-2.5 sm:gap-3 text-xs md:text-sm text-gray-400 font-medium">
              {[
                { name: "Project Request", href: "#" },
                { name: "Project Costing", href: "#" },
                { name: "Invoice", href: "#" },
                { name: "Inventory", href: "#" },
                { name: "Pricing", href: "/pricing" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white hover:translate-x-1 inline-block transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <span className="text-xs uppercase font-extrabold tracking-wider text-white">
              Company
            </span>
            <ul className="flex flex-col gap-2.5 sm:gap-3 text-xs md:text-sm text-gray-400 font-medium">
              {[
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white hover:translate-x-1 inline-block transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started Column */}
          <div className="flex flex-col gap-3 sm:gap-4 col-span-2 sm:col-span-1">
            <span className="text-xs uppercase font-extrabold tracking-wider text-white">
              Get Started
            </span>
            <ul className="flex flex-col gap-2.5 sm:gap-3 text-xs md:text-sm text-gray-400 font-medium">
              {[
                { name: "Start Free Trial", href: "#signup" },
                { name: "Book a Demo", href: "#demo" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white hover:translate-x-1 inline-block transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>

      {/* Footer Bottom Row */}
      <FadeIn delay={0.2} distance={10}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-[11px] md:text-xs text-gray-400 font-medium text-center md:text-left">
          <span>© 2026 FastraSuite. All rights reserved.</span>
          <span>
            All data is isolated per company and encrypted at rest and in transit.
          </span>
        </div>
      </FadeIn>
    </footer>
  );
}
