import React from "react";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#030406] border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8 text-neutral-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/5">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 p-[1px]">
            <div className="w-full h-full bg-[#050608] rounded-full flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </div>
          <div>
            <span className="font-extrabold tracking-[0.2em] text-sm text-white uppercase block">
              APEX ATELIER
            </span>
            <span className="text-[10px] tracking-[0.2em] text-neutral-500 font-mono">
              AUTOMOTIVE ARTISANS
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-mono uppercase tracking-wider text-neutral-400">
          <a href="#story" className="hover:text-amber-400 transition-colors">
            Process
          </a>
          <a href="#services" className="hover:text-amber-400 transition-colors">
            Treatments
          </a>
          <a href="#about" className="hover:text-amber-400 transition-colors">
            Philosophy
          </a>
          <a href="#contact" className="hover:text-amber-400 transition-colors">
            Allocation
          </a>
        </div>

        {/* Socials / Direct links */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <a
            href="#"
            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-amber-400/40 hover:text-amber-400 transition-colors"
          >
            INSTAGRAM
          </a>
          <a
            href="#"
            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-amber-400/40 hover:text-amber-400 transition-colors"
          >
            YOUTUBE
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-600 gap-4">
        <div>
          &copy; {new Date().getFullYear()} APEX ATELIER LABS. ALL RIGHTS RESERVED.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-neutral-400">Privacy Policy</a>
          <a href="#" className="hover:text-neutral-400">Terms of Service</a>
          <a href="#" className="hover:text-neutral-400">Studio Accreditation</a>
        </div>
      </div>
    </footer>
  );
}
