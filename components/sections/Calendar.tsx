"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CalendarDays, CheckCircle2, ArrowRight, Zap, Clock, Shield, Star
} from "lucide-react";
import Link from "next/link";

const benefits = [
  "Direct integration with Cliniko, Halaxy, & Jane",
  "Automated SMS & Email reminders",
  "Zero double-bookings guaranteed",
];

const stats = [
  { value: "30s", label: "Average booking time" },
  { value: "60%", label: "Fewer no-shows" },
  { value: "24/7", label: "Always available" },
];

export const InteractiveCalendar = () => {
  return (
    <section id="calendar" className="py-16 md:py-24 px-8 bg-slate-50 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0066cc]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066cc]/10 text-[#0066cc] rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
                <CalendarDays size={12} /> Live Booking System
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#151515] leading-tight tracking-tight mb-6">
                Let patients book<br />
                <span className="text-[#0066cc]">instantly.</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed max-w-md font-medium">
                Arcline syncs with your practice management software to show real-time openings. No more back-and-forth phone calls.
              </p>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="space-y-4"
            >
              {benefits.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066cc] shrink-0">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link
                href="/book"
                className="inline-flex items-center gap-2 h-14 px-8 bg-[#0066cc] text-white rounded-2xl font-bold text-base hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/25 active:scale-[0.98] transition-all group"
              >
                Book a Demo Session
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 h-14 px-8 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-base hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                Start Free Trial
              </Link>
            </motion.div>
          </div>

          {/* Right: Premium Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,102,204,0.15)] border border-slate-100 overflow-hidden">

              {/* Card Header */}
              <div className="bg-[#151515] px-8 py-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white font-bold text-sm">Booking System — Live</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
              </div>

              {/* Stat Row */}
              <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
                {stats.map((stat, i) => (
                  <div key={i} className="py-6 text-center">
                    <div className="text-2xl font-bold text-[#151515]">{stat.value}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Feature List */}
              <div className="p-8 space-y-4">
                {[
                  { icon: CalendarDays, color: "text-[#0066cc]", bg: "bg-blue-50", label: "Smart date & time picker", sub: "Synced with your real calendar" },
                  { icon: Clock, color: "text-purple-600", bg: "bg-purple-50", label: "Instant slot availability", sub: "No double-bookings, ever" },
                  { icon: Shield, color: "text-green-600", bg: "bg-green-50", label: "Confirmation emails", sub: "Automated via Resend" },
                  { icon: Zap, color: "text-orange-500", bg: "bg-orange-50", label: "Real-time database sync", sub: "Powered by Neon PostgreSQL" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group"
                  >
                    <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <item.icon size={18} className={item.color} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.label}</p>
                      <p className="text-xs font-medium text-slate-400">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Bottom */}
              <div className="px-8 pb-8">
                <Link
                  href="/book"
                  className="w-full h-14 bg-[#0066cc] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/20 transition-all group"
                >
                  Try the Live Booking System
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Footer badge */}
              <div className="px-8 pb-6 flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Real system · Real database · Zero fake data
                </span>
              </div>
            </div>

            {/* Background glow */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-200 rounded-full blur-[100px] opacity-30 -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
