"use client";

import React from "react";
import { Award, Microscope, Droplets, Gauge, Sparkles } from "lucide-react";

export function About() {
  const pillars = [
    {
      icon: Microscope,
      title: "Micro-Scale Inspection",
      desc: "We analyze clear coat density with high-frequency ultrasound meters down to single microns, ensuring paint thickness is never compromised during correction."
    },
    {
      icon: Droplets,
      title: "De-ionized Reverse Osmosis",
      desc: "Zero TDS (Total Dissolved Solids) pure water filtration guarantees absolute spot-free washing with zero mineral etchings left behind."
    },
    {
      icon: Gauge,
      title: "Controlled Curing Bays",
      desc: "Our detailing suites maintain strict 21°C temperature and 45% relative humidity, paired with shortwave infrared lamps for optimal ceramic bond strength."
    },
    {
      icon: Award,
      title: "Master Detailer Certified",
      desc: "IDA Certified Master Technicians with over a decade of experience detailing supercars, classics, and bespoke coachbuilds."
    }
  ];

  return (
    <section id="about" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#090b10] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Intro Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              The Apex Standard
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Obsession is not a slogan. <br />
              <span className="text-gradient-gold">It is our operating principle.</span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Standard commercial car washes use harsh caustic soaps and recycled abrasive water that mar, swirl, and slowly degrade automotive clear coat. 
            </p>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Apex Atelier treats every vehicle as fine mechanical sculpture. By controlling every variable &mdash; water purity, microfiber thread density, compound abrasiveness, and infrared curing schedules &mdash; we deliver a finish that surpasses factory delivery.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl p-8 bg-neutral-900/60 border border-white/10 backdrop-blur-xl">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="p-6 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-4xl sm:text-5xl font-black text-amber-400 font-mono mb-2">
                    99.4%
                  </div>
                  <div className="text-xs uppercase font-mono tracking-widest text-neutral-400">
                    Average Swirl Removal
                  </div>
                </div>
                <div className="p-6 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-4xl sm:text-5xl font-black text-white font-mono mb-2">
                    10H
                  </div>
                  <div className="text-xs uppercase font-mono tracking-widest text-neutral-400">
                    Hardness Certified
                  </div>
                </div>
                <div className="p-6 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-4xl sm:text-5xl font-black text-white font-mono mb-2">
                    0 ppm
                  </div>
                  <div className="text-xs uppercase font-mono tracking-widest text-neutral-400">
                    TDS Filtered Rinse
                  </div>
                </div>
                <div className="p-6 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-4xl sm:text-5xl font-black text-amber-400 font-mono mb-2">
                    1,200+
                  </div>
                  <div className="text-xs uppercase font-mono tracking-widest text-neutral-400">
                    Vehicles Perfected
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-neutral-900/40 border border-white/5 hover:border-amber-400/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 group-hover:bg-amber-400/10 transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold uppercase tracking-tight text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
