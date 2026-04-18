"use client";

import React from "react";
import { motion } from "framer-motion";

export const Explainer = () => {
  return (
    <section className="py-16 md:py-24 px-8 bg-white overflow-hidden" id="demo">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#151515] leading-tight">
              See Arcline <br /> <span className="text-[#0066cc]">in action.</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Watch how Arcline intelligently handles clinical enquiries, manages bookings, and seamlessly integrates with your existing workflows to save your team hours every week.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0066cc]/10 flex items-center justify-center text-[#0066cc]">
                  <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                </div>
                <span className="font-bold text-[#151515]">Human-like Intelligence</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0066cc]/10 flex items-center justify-center text-[#0066cc]">
                  <span className="material-symbols-outlined text-[20px]">verified_user</span>
                </div>
                <span className="font-bold text-[#151515]">Medically Compliant</span>
              </div>
            </div>
          </motion.div>

          {/* Video Animation Area - YouTube Embed */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 group">
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/523VhrnYWG0?autoplay=0&controls=1&rel=0" 
                title="Arcline Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
              
              {/* Overlay Glare (Pointer events none to allow clicking video) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* Floating Label */}
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#0066cc]">
                <span className="material-symbols-outlined">play_circle</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Live Demo</p>
                <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Click to play</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
