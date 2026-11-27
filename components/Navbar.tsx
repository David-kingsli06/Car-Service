"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Shield, Phone, Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050608]/95 border-b border-white/10 py-3.5 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 flex items-center justify-center p-[1px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#050608] rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-[0.25em] text-sm text-white uppercase group-hover:text-amber-300 transition-colors">
              APEX ATELIER
            </span>
            <span className="text-[10px] tracking-[0.2em] text-neutral-400 font-mono">
              BESPOKE AUTOMOTIVE DETAIL
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.18em] uppercase text-neutral-300 font-medium">
          <a
            href="#story"
            className="hover:text-amber-400 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-amber-400 hover:after:w-full after:transition-all"
          >
            The Process
          </a>
          <a
            href="#services"
            className="hover:text-amber-400 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-amber-400 hover:after:w-full after:transition-all"
          >
            Treatments
          </a>
          <a
            href="#about"
            className="hover:text-amber-400 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-amber-400 hover:after:w-full after:transition-all"
          >
            Standards
          </a>
          <a
            href="#contact"
            className="hover:text-amber-400 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-amber-400 hover:after:w-full after:transition-all"
          >
            Studio Booking
          </a>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className="relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-sm group bg-neutral-900 border border-white/20 hover:border-amber-400/80 text-white"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-500/20 to-amber-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-2 text-neutral-200 group-hover:text-amber-300">
              <Shield className="w-3.5 h-3.5" />
              Reserve Slot
            </span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050608]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 transition-all animate-fadeIn">
          <div className="flex flex-col space-y-4 text-xs uppercase tracking-widest">
            <a
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-amber-400 py-2 border-b border-white/5"
            >
              The Process
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-amber-400 py-2 border-b border-white/5"
            >
              Treatments
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-amber-400 py-2 border-b border-white/5"
            >
              Standards
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-amber-400 py-2"
            >
              Studio Booking
            </a>
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500/20 border border-amber-400/40 text-amber-300 font-semibold rounded-sm"
              >
                <Phone className="w-4 h-4" />
                Book Consultation
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
