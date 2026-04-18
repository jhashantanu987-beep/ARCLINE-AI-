"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone, Shield, Clock, Users, Calendar, BarChart3,
  ArrowRight, X, CheckCircle2, Zap, Star, Sparkles
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    id: "receptionist",
    icon: Smartphone,
    className: "lg:col-span-2 lg:row-span-2 rounded-[3.5rem] rounded-tr-[10rem]",
    color: "bg-[#151515]",
    textColor: "text-white",
    tag: "Primary System",
    title: "AI Phone Receptionist",
    short: "Answer every call 24/7 with a human-like AI voice — never miss a patient again.",
    detail: {
      headline: "Your clinic never sleeps.",
      body: "Arcline's AI receptionist answers every inbound call with natural, human-like empathy. It introduces itself as your clinic's own staff, handles FAQs, and books appointments.",
      points: ["Answers in under 2 rings", "Trained on your clinic's FAQ", "Unlimited concurrent calls"],
      stat: { value: "98%", label: "Satisfaction" },
    },
  },
  {
    id: "booking",
    icon: Calendar,
    className: "lg:col-span-1 lg:row-span-1 rounded-[3.5rem]",
    color: "bg-[#0066cc]",
    textColor: "text-white",
    tag: "Integration",
    title: "Smart Booking",
    short: "Direct EHR integration books appointments instantly.",
    detail: {
      headline: "Zero friction.",
      body: "Arcline connects directly to your practice management software and books appointments in real time.",
      points: ["Cliniko, Halaxy & more", "Real-time checking"],
      stat: { value: "3min", label: "Saved/Call" },
    },
  },
  {
    id: "analytics",
    icon: BarChart3,
    className: "lg:col-span-1 lg:row-span-2 rounded-[3.5rem] rounded-br-[10rem]",
    color: "bg-slate-50",
    textColor: "text-[#151515]",
    tag: "Intelligence",
    title: "Deep Analytics",
    short: "Real-time call volume, conversion rates, and ROI tracking.",
    detail: {
      headline: "Full Visibility.",
      body: "Your dashboard gives you a live command centre for all AI activity and performance metrics.",
      points: ["Revenue tracking", "Weekly reports"],
      stat: { value: "45%", label: "ROI Lift" },
    },
  },
  {
    id: "security",
    icon: Shield,
    className: "lg:col-span-1 lg:row-span-1 rounded-[3.5rem]",
    color: "bg-white",
    textColor: "text-[#151515]",
    tag: "Security",
    title: "HIPAA Secure",
    short: "Enterprise-grade encryption, built-in.",
    detail: {
      headline: "Secure by design.",
      body: "Arcline is built on enterprise-grade infrastructure with full HIPAA readiness.",
      points: ["End-to-end encryption", "Full audit trail"],
      stat: { value: "100%", label: "Compliant" },
    },
  },
  {
    id: "multilingual",
    icon: Users,
    className: "lg:col-span-1 lg:row-span-1 rounded-[3.5rem] rounded-bl-[8rem]",
    color: "bg-blue-50",
    textColor: "text-[#0066cc]",
    tag: "Global",
    title: "Multilingual",
    short: "Serve every patient in their preferred language.",
    detail: {
      headline: "No patient left behind.",
      body: "Arcline automatically detects the caller's language and switches to it seamlessly.",
      points: ["30+ languages", "Auto-detection"],
      stat: { value: "30+", label: "Languages" },
    },
  },
];

function DetailPanel({ feature, onClose }: { feature: typeof features[0]; onClose: () => void }) {
  const Icon = feature.icon;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        className="relative w-full max-w-xl bg-white rounded-[4rem] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-12 space-y-10">
           <div className="flex justify-between items-start">
              <div className="flex items-center gap-5">
                 <div className="w-16 h-16 bg-blue-50 rounded-[1.5rem] flex items-center justify-center text-[#0066cc] shadow-sm">
                    <Icon size={32} />
                 </div>
                 <div>
                    <p className="text-[11px] font-black text-blue-500 uppercase tracking-[0.3em] mb-1">{feature.tag}</p>
                    <h3 className="text-3xl font-bold text-[#151515] tracking-tight">{feature.title}</h3>
                 </div>
              </div>
              <button onClick={onClose} className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-[#151515] transition-all">
                 <X size={24} />
              </button>
           </div>
           
           <div className="space-y-6">
              <h4 className="text-2xl font-bold text-[#151515] tracking-tight">{feature.detail.headline}</h4>
              <p className="text-slate-500 font-medium text-lg leading-relaxed">{feature.detail.body}</p>
           </div>

           <div className="grid grid-cols-2 gap-6">
              <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100/50">
                 <p className="text-4xl font-bold text-[#0066cc] mb-2 tracking-tighter">{feature.detail.stat.value}</p>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{feature.detail.stat.label}</p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                 {feature.detail.points.map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <div className="w-5 h-5 bg-green-500/10 rounded-full flex items-center justify-center">
                          <CheckCircle2 size={12} className="text-green-500" />
                       </div>
                       <span className="text-sm font-bold text-slate-700">{p}</span>
                    </div>
                 ))}
              </div>
           </div>

           <button className="w-full h-18 bg-[#151515] text-white rounded-[1.5rem] font-bold text-lg hover:bg-black transition-all hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1 flex items-center justify-center gap-3">
              Book a Strategy Session <ArrowRight size={20} />
           </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export const Features = () => {
  const [active, setActive] = useState<typeof features[0] | null>(null);

  return (
    <>
      <section id="features" className="py-56 px-8 bg-white relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-50/40 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-36 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-blue-50 text-[#0066cc] text-[11px] font-black tracking-[0.4em] uppercase border border-blue-100/50"
            >
              <Zap size={14} className="fill-blue-500" /> The Intelligence Suite
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-bold text-[#151515] tracking-tight leading-[0.8] text-center">
              The Front Desk. <br /> <span className="text-[#0066cc]">Evolved.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed pt-4">
              Arcline isn't just a bot. It's a highly-integrated, clinically-aware extension of your medical team.
            </p>
          </div>

          {/* Clean Bento Grid with Refined Geometry */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-[340px]">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActive(f)}
                  className={`group cursor-pointer relative p-12 border border-slate-100 overflow-hidden flex flex-col justify-between hover:shadow-[0_80px_160px_-40px_rgba(0,102,204,0.12)] transition-all duration-700 hover:-translate-y-4 ${f.className} ${f.color}`}
                >
                  <div className="relative z-10">
                     <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ${f.textColor === 'text-white' ? 'bg-white/10 text-white' : 'bg-white text-[#0066cc]'}`}>
                        <Icon size={32} />
                     </div>
                     <span className={`text-[11px] font-black uppercase tracking-[0.3em] opacity-50 ${f.textColor}`}>
                        {f.tag}
                     </span>
                     <h3 className={`text-3xl font-bold mt-4 leading-tight tracking-tight ${f.textColor}`}>
                        {f.title}
                     </h3>
                  </div>

                  <div className="relative z-10">
                     <p className={`text-base font-medium leading-relaxed opacity-0 group-hover:opacity-80 transition-all duration-500 group-hover:translate-y-0 translate-y-4 ${f.textColor}`}>
                        {f.short}
                     </p>
                     <div className={`flex items-center gap-3 font-bold text-sm mt-8 ${f.textColor} group-hover:translate-x-1 transition-transform`}>
                        Platform Intel <ArrowRight size={18} />
                     </div>
                  </div>

                  {/* Glassmorphic Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-tr from-white via-transparent to-transparent pointer-events-none" />
                </motion.div>
              );
            })}

            {/* Premium CTA Box */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               className="lg:col-span-1 lg:row-span-1 bg-blue-50/50 rounded-[3.5rem] p-12 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-blue-50 transition-all border border-blue-100/30"
            >
               <div className="w-20 h-20 rounded-full bg-[#151515] flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-1000 shadow-2xl">
                  <Sparkles size={36} className="text-[#0066cc]" />
               </div>
               <h4 className="text-[#151515] font-bold text-xl mb-4 tracking-tight">Ready for Scale?</h4>
               <Link href="/book" className="inline-flex items-center gap-2 text-[#0066cc] text-[11px] font-black uppercase tracking-[0.2em] border-b-2 border-[#0066cc]/30 pb-1 hover:border-[#0066cc] transition-all">
                  Book Demo Call <ArrowRight size={14} />
               </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active && <DetailPanel feature={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  );
};
