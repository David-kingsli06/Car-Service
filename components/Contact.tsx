"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Shield, Calendar, Car, Mail, Phone, User } from "lucide-react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    packageChoice: "Signature 2-Stage & Ceramic 10H",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate booking reservation
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#050608] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Studio details & Contact info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400 mb-4">
                <Calendar className="w-3.5 h-3.5" />
                Private Concierge
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
                Schedule Studio Appointment
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Due to our comprehensive multi-day curing processes, we accept a strictly limited allocation of 4 vehicles per week to guarantee uncompromising attention to detail.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10 text-xs font-mono">
              <div className="p-4 rounded-lg bg-neutral-900/50 border border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-bold uppercase tracking-wider">Studio Location</div>
                  <div className="text-neutral-400">Bay 7, Performance Way, Silicon Coast</div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-neutral-900/50 border border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-bold uppercase tracking-wider">Direct Studio Line</div>
                  <div className="text-neutral-400">+1 (800) 555-APEX / concierge@apexatelier.com</div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-neutral-900/50 border border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-bold uppercase tracking-wider">Operating Schedule</div>
                  <div className="text-neutral-400">Monday &ndash; Saturday &bull; By Appointment Only</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-neutral-900/70 border border-white/10 backdrop-blur-xl shadow-2xl">
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
                    Reservation Request Logged
                  </h3>
                  <p className="text-neutral-400 text-sm max-w-md mx-auto">
                    Thank you, {formData.name || "Client"}. Our detailing director will contact you within 2 hours to confirm vehicle inspection time and slot allocation.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-xs uppercase font-mono tracking-widest text-amber-400 underline underline-offset-4 hover:text-amber-300"
                  >
                    Send another reservation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Lord Stirling Moss"
                          className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="client@prestige.com"
                          className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                        Vehicle Make & Model
                      </label>
                      <div className="relative">
                        <Car className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          required
                          value={formData.vehicle}
                          onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                          placeholder="Mercedes-AMG GT Black Series"
                          className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                      Selected Treatment Tier
                    </label>
                    <select
                      value={formData.packageChoice}
                      onChange={(e) => setFormData({ ...formData, packageChoice: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="Signature 2-Stage & Ceramic 10H">Signature 2-Stage & Ceramic 10H ($850)</option>
                      <option value="Ultimate PPF Armor & Studio Suite">Ultimate PPF Armor & Studio Suite ($2,400+)</option>
                      <option value="Preservation Wash & Gloss">Preservation Wash & Gloss ($180)</option>
                      <option value="Custom Bespoke Consultation">Custom Bespoke Consultation (Tailored)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                      Specific Notes & Surface Condition
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Swirl marks on hood, previous ceramic age unknown, track day rubber splatter..."
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all duration-300"
                  >
                    <span>Request Studio Allocation</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
