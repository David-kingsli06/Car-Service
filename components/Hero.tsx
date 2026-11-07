"use client";

import React from "react";
import { ChevronDown, ShieldCheck, Sparkles, Award } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 pt-32 pb-16 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-blue-500/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Top subtle badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md mb-8">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-200">
          The Pinnacle of Surface Restoration
        </span>
      </div>

      {/* Main Title */}
      <h1 className="max-w-5xl text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[0.95] mb-6">
        <span className="block text-gradient-silver">SURFACE ARTISTRY.</span>
        <span className="block text-gradient-gold">ABSOLUTE DEFENSE.</span>
      </h1>

      {/* Subtitle */}
      <p className="max-w-2xl text-neutral-400 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-10">
        Experience cinematic automotive detailing. Scroll down to witness the 5-stage transformation of an AMG GT &mdash; from contactless decontam to 10H diamond ceramic armor.
      </p>

      {/* Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400 font-mono tracking-wider mb-14">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>100% SWIRL REMOVAL</span>
        </div>
        <div className="w-1 h-1 bg-neutral-700 rounded-full" />
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>CERTIFIED CERAMIC PRO & PPF</span>
        </div>
        <div className="w-1 h-1 bg-neutral-700 rounded-full" />
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-bold">118°</span>
          <span>HYDROPHOBIC ANGLE</span>
        </div>
      </div>

      {/* Scroll Prompter */}
      <a
        href="#story"
        className="group inline-flex flex-col items-center gap-2 text-neutral-400 hover:text-amber-400 transition-colors"
      >
        <span className="text-[10px] uppercase font-mono tracking-[0.3em]">
          Scroll to explore the sequence
        </span>
        <div className="w-8 h-12 rounded-full border border-white/20 flex items-start justify-center p-1.5 group-hover:border-amber-400/60 transition-colors">
          <div className="w-1.5 h-2.5 bg-amber-400 rounded-full animate-bounce" />
        </div>
      </a>
    </section>
  );
}
