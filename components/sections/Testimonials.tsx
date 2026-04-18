"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Quote, ShieldCheck, CheckCircle2, TrendingUp, Users } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Dr. Alana Thompson",
    role: "Clinical Director, Thompson Physio",
    content: "Arcline didn't just save us money; it saved our culture. My reception team is no longer stressed by ringing phones and can actually focus on the patients in the room.",
    image: "/testimonial_doctor_1_1776494717981.png",
    metric: "12hr/week saved",
    clinic: "Physiotherapy"
  },
  {
    name: "Mark Harrison",
    role: "Owner, City Dental Group",
    content: "We were losing roughly 15 calls a day after hours. Arcline now books those appointments instantly. Our ROI was positive within the first two weeks.",
    image: "/testimonial_doctor_2_1776494742399.png",
    metric: "24% revenue lift",
    clinic: "Dental"
  },
  {
    name: "Sarah Chen",
    role: "Practice Manager, Zenith Health",
    content: "The natural voice is what sold us. Patients have no idea they are talking to an AI. It's incredibly polite, accurate, and integrated perfectly with Cliniko.",
    image: "/medical_professional_portraits_1776494692600.png",
    metric: "100% call capture",
    clinic: "Allied Health"
  }
];

export const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={containerRef} className="py-16 md:py-24 px-8 bg-white relative overflow-hidden" id="testimonials">
      {/* Premium Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] border border-[#0066cc] rounded-full" />
        <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] border border-[#0066cc] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24 space-y-6">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#0066cc] text-[10px] font-bold tracking-[0.2em] uppercase border border-blue-100"
           >
             The Verdict
           </motion.div>
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#151515] tracking-tight leading-[1.1]"
           >
             Trusted by the <br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066cc] to-blue-400">Medical Community.</span>
           </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.21, 0.45, 0.32, 0.9] }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[3rem] border border-slate-100 relative group hover:shadow-[0_40px_80px_-20px_rgba(0,102,204,0.15)] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-[#0066cc] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(star => <Star key={star} size={14} className="fill-[#0066cc] text-[#0066cc]" />)}
                  </div>
                  <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border border-green-100">
                    {t.metric}
                  </div>
                </div>
                
                <p className="text-slate-700 text-lg leading-relaxed font-medium">
                  "{t.content}"
                </p>

                <div className="pt-8 border-t border-slate-100 flex items-center gap-5">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 ring-4 ring-slate-50 group-hover:ring-blue-50 transition-all shadow-md">
                    <Image 
                      src={t.image} 
                      alt={t.name} 
                      width={64}
                      height={64}
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#151515] text-base">{t.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Trust Bar */}
        <motion.div 
          style={{ y: y1 }}
          className="mt-32 pt-20 border-t border-slate-100"
        >
          <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-12">
            Integrated with your preferred CMS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="font-black text-2xl tracking-tighter text-slate-900">CLINIKO</div>
             <div className="font-black text-2xl tracking-tighter text-slate-900">HALAXY</div>
             <div className="font-black text-2xl tracking-tighter text-slate-900">POWERDIARY</div>
             <div className="font-black text-2xl tracking-tighter text-slate-900">JANE.APP</div>
             <div className="font-black text-2xl tracking-tighter text-slate-900">COREPLUS</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const TrustedBy = () => {
  return (
    <div className="py-24 bg-white border-y border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,102,204,0.03)_0%,transparent_100%)]" />
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xs">
            <h3 className="text-2xl font-bold text-[#151515] leading-tight">Empowering clinics across Australasia.</h3>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-20 hover:opacity-100 transition-opacity duration-1000">
             <div className="flex items-center justify-center font-black text-2xl text-[#151515]">MEDTECH</div>
             <div className="flex items-center justify-center font-black text-2xl text-[#151515]">GENTU</div>
             <div className="flex items-center justify-center font-black text-2xl text-[#151515]">GENIE</div>
             <div className="flex items-center justify-center font-black text-2xl text-[#151515]">BESTPRACTICE</div>
          </div>
        </div>
      </div>
    </div>
  );
};
