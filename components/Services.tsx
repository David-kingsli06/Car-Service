"use client";

import React from "react";
import { DETAILING_PACKAGES } from "@/data/scenes";
import { Check, Sparkles, Clock, ArrowRight } from "lucide-react";

export function Services() {
  return (
    <section id="services" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#050608] border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Formulations
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-6">
            Studio Treatment Packages
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Every vehicle has distinct paint composition, hardness, and road exposure history. Choose an uncompromising tier or consult our master technicians for custom specifications.
          </p>
        </div>

        {/* Pricing & Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DETAILING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col justify-between rounded-xl p-8 transition-all duration-300 ${
                pkg.recommended
                  ? "bg-gradient-to-b from-neutral-900/90 to-neutral-950 border-2 border-amber-500/50 shadow-2xl shadow-amber-500/10 -translate-y-2"
                  : "bg-neutral-900/40 border border-white/10 hover:border-white/20 hover:bg-neutral-900/60"
              }`}
            >
              {pkg.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-[10px] font-mono uppercase tracking-widest text-black font-bold shadow-lg">
                  Most Requested
                </div>
              )}

              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                  <span>{pkg.category}</span>
                  <span className="flex items-center gap-1 text-neutral-300">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {pkg.turnaround}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-3">
                  {pkg.name}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  {pkg.tagline}
                </p>

                <div className="flex items-baseline gap-2 pb-6 border-b border-white/10 mb-6">
                  <span className="text-4xl sm:text-5xl font-black text-white">
                    {pkg.price}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">/ base estimate</span>
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 mb-8">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                      <div className="mt-0.5 rounded-full p-0.5 bg-amber-400/20 text-amber-400">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <a
                href="#contact"
                className={`w-full py-3.5 rounded-lg flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                  pkg.recommended
                    ? "bg-amber-400 text-black hover:bg-amber-300 shadow-lg shadow-amber-400/20"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                }`}
              >
                <span>Reserve Package</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
