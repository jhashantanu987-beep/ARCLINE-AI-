"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneOutgoing, Calendar, MessageSquare, Clock, CheckCircle2, Zap, ArrowRight, Sparkles } from "lucide-react";

const patients = [
  { name: "Sarah M.", status: "Booked", icon: Calendar, color: "#10b981", id: "sarah" },
  { name: "James C.", status: "Voicemail", icon: MessageSquare, color: "#f59e0b", id: "james" },
  { name: "David P.", status: "Callback", icon: Clock, color: "#00a3ff", id: "david" },
  { name: "Lisa R.", status: "Booked", icon: Calendar, color: "#10b981", id: "lisa" },
];

export const Outbound = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 px-8 bg-white relative">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Testimonials Button */}
        <div className="flex justify-center mb-16">
          <button className="bg-[#00a3ff] text-white px-8 py-2.5 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg hover:bg-[#0088cc] transition-all">
            Show all testimonials <ArrowRight size={16} className="rotate-90" />
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-[#08101e] rounded-[2rem] p-8 lg:p-12 relative overflow-hidden shadow-2xl h-[480px] flex flex-col justify-center border border-white/5"
        >
          {/* Faint Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,163,255,0.06)_0%,transparent_70%)]"></div>
          
          <div className="grid grid-cols-12 relative z-10 h-full items-center">
            
            {/* Left Content (5 Columns) */}
            <div className="col-span-5 space-y-6 pl-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 text-[#00a3ff] text-[8px] font-bold tracking-[0.2em] uppercase border border-blue-500/20 w-fit">
                <PhoneOutgoing size={10} /> NEW FEATURE
              </div>
              
              <div className="space-y-3">
                <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                  Arcline Outbound
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                  Arcline proactively calls patients to recover follow-ups and reschedule entire clinic days when a practitioner is unavailable.
                </p>
              </div>

              <button className="bg-[#00a3ff] text-white px-7 py-3 rounded-full font-bold text-sm flex items-center gap-2.5 shadow-[0_10px_25px_rgba(0,163,255,0.25)] hover:shadow-[0_15px_35px_rgba(0,163,255,0.35)] transition-all">
                <Sparkles size={14} /> Book A Demo Call
              </button>
            </div>

            {/* Animation Space (7 Columns) */}
            <div className="col-span-7 relative h-full">
              
               {/* Center Hub - Positioned at 20% from left of this container */}
               <div className="absolute left-[20%] top-1/2 -translate-y-1/2 z-20">
                 <div className="relative">
                   {/* Ripple */}
                   <motion.div animate={{ scale: [1, 1.4], opacity: [0.4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-[#00a3ff] rounded-full blur-md" />
                   
                   <div className="w-14 h-14 rounded-full bg-[#00a3ff] flex items-center justify-center relative shadow-[0_0_30px_rgba(0,163,255,0.3)]">
                     <PhoneOutgoing size={20} className="text-white" />
                   </div>
                   
                   <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-xl border border-white/10 bg-[#08101e]/80 backdrop-blur-sm">
                     <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">OUTBOUND CAMPAIGN</span>
                   </div>
                 </div>
               </div>

               {/* Laser Lines */}
               <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-10">
                 {patients.map((p, i) => {
                   const isProcessed = activeStep > i;
                   const isCurrent = activeStep === i;
                   
                   const x1 = "calc(20% + 28px)";
                   const y1 = "50%";
                   const x2 = "calc(100% - 140px)";
                   const y2 = `${10 + (i * 26.6)}%`;

                   return (
                     <g key={p.id}>
                       <motion.line 
                         x1={x1} y1={y1} 
                         x2={x2} y2={y2}
                         stroke={p.color}
                         strokeWidth="0.8"
                         strokeLinecap="round"
                         initial={{ pathLength: 0, opacity: 0 }}
                         animate={{ 
                           pathLength: isProcessed || isCurrent ? 1 : 0,
                           opacity: isProcessed || isCurrent ? 0.2 : 0
                         }}
                         transition={{ duration: 1 }}
                       />
                       {isCurrent && (
                         <motion.circle 
                           r="1.5" fill={p.color}
                           animate={{ cx: [x1, x2], cy: [y1, y2] }}
                           transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                         />
                       )}
                     </g>
                   );
                 })}
               </svg>

               {/* Right List */}
               <div className="absolute right-0 inset-y-0 flex flex-col justify-between py-6 z-20 w-[150px]">
                 {patients.map((p, i) => {
                   const isProcessed = activeStep > i;
                   return (
                     <div key={p.id} className="flex items-center gap-3 group">
                       <div className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-500`} style={{ borderColor: isProcessed ? p.color : 'rgba(255,255,255,0.1)' }}>
                         <p.icon size={14} className={`transition-all duration-500 ${isProcessed ? '' : 'text-slate-700'}`} style={{ color: isProcessed ? p.color : '' }} />
                       </div>
                       <div className="flex flex-col">
                        <h4 className={`text-[11px] font-bold transition-all duration-500 ${isProcessed ? 'text-white' : 'text-slate-700'}`}>{p.name}</h4>
                        {isProcessed && (
                          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[7px] font-bold uppercase tracking-widest" style={{ color: p.color }}>
                            {p.status}
                          </motion.span>
                        )}
                       </div>
                     </div>
                   );
                 })}
               </div>

               {/* Centered Stats Bar at bottom of RIGHT AREA */}
               <div className="absolute bottom-0 left-[20%] -translate-x-1/2 flex flex-col items-center gap-3 z-30">
                  <div className="flex items-center gap-2 bg-[#0d1626] border border-white/5 px-3 py-1 rounded-full">
                    <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">{Math.min(activeStep, 4)}/4 completed</span>
                  </div>

                  <div className="flex items-center gap-6 bg-[#0d1626] border border-white/5 rounded-xl px-7 py-2.5 shadow-2xl">
                    <div className="flex flex-col items-center">
                       <span className="text-xs font-bold text-white">{Math.min(activeStep, 3)}</span>
                       <span className="text-[6px] font-bold text-slate-700 uppercase tracking-widest">Calls</span>
                    </div>
                    <div className="w-[1px] h-3 bg-white/5"></div>
                    <div className="flex flex-col items-center">
                       <span className="text-xs font-bold text-[#00a3ff]">{activeStep >= 5 ? 2 : activeStep >= 1 ? 1 : 0}</span>
                       <span className="text-[6px] font-bold text-slate-700 uppercase tracking-widest">Booked</span>
                    </div>
                    <div className="w-[1px] h-3 bg-white/5"></div>
                    <div className="flex flex-col items-center">
                       <span className="text-xs font-bold text-white">45%</span>
                       <span className="text-[6px] font-bold text-slate-700 uppercase tracking-widest">Rate</span>
                    </div>
                    <div className="w-[1px] h-3 bg-white/5"></div>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-500/10 rounded-md border border-blue-500/20">
                       <Zap size={8} className="text-[#00a3ff] fill-[#00a3ff]" />
                       <span className="text-[7px] font-bold text-[#00a3ff] uppercase tracking-widest">Auto</span>
                    </div>
                  </div>
               </div>

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
