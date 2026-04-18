"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Phone, MessageSquare, Shield, Zap, Sparkles, 
  CheckCircle2, Play, Users, Star, Smartphone, Wifi, Battery,
  Video, MicOff, UserPlus, PhoneOff, Grip
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const FloatingCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, rotateX: 15 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`absolute backdrop-blur-3xl bg-white/70 border border-white/40 shadow-xl sm:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] p-3 sm:p-6 z-20 ${className}`}
  >
    {children}
  </motion.div>
);

const chatMessages = [
  { id: 1, role: "patient", text: "Hi, I'd like to book a physio session for tomorrow." },
  { id: 2, role: "ai", text: "Of course! We have 2 PM or 4 PM available. Which works best?" },
  { id: 3, role: "patient", text: "4 PM please. Do you take health insurance?" },
  { id: 4, role: "ai", text: "Yes, we accept all major providers. Your 4 PM is booked! ✅" },
];

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let isCancelled = false;
    const sequence = async () => {
      if (isCancelled) return;
      setVisibleMessages(0);
      await new Promise(r => setTimeout(r, 1000));
      
      for (let i = 1; i <= chatMessages.length; i++) {
        if (isCancelled) return;
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 1200));
        if (isCancelled) return;
        setIsTyping(false);
        setVisibleMessages(i);
        await new Promise(r => setTimeout(r, 800));
      }
      
      await new Promise(r => setTimeout(r, 4000));
      if (!isCancelled) sequence();
    };
    sequence();
    return () => { isCancelled = true; };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative flex flex-col items-center justify-center pt-20 md:pt-24 pb-12 md:pb-16 px-4 md:px-8 overflow-hidden bg-white min-h-[85vh]"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,rgba(0,102,204,0.04)_0%,transparent_70%)] blur-[100px]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.03)_0%,transparent_70%)] blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10">
        
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-8 md:space-y-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-blue-50/50 border border-blue-100/50 text-[#0066cc] text-[11px] font-black tracking-[0.4em] uppercase"
          >
            <Zap size={14} className="fill-blue-500" /> The Future of Reception
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-bold text-[#151515] leading-[0.9] tracking-tight"
          >
            The Voice <br /> <span className="text-[#0066cc]">of Growth.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-base md:text-xl text-slate-500 font-medium max-w-2xl leading-relaxed"
          >
            Arcline is the AI-first medical receptionist that books patients, answers queries, and integrates with your EHR — all in a natural human voice.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 pt-4 md:pt-6"
          >
            <Link 
              href="#calendar" 
              className="group relative w-full sm:w-auto h-12 md:h-14 px-8 bg-[#151515] text-white rounded-xl md:rounded-2xl font-bold text-sm md:text-base flex items-center justify-center gap-2 hover:bg-black transition-all hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:-translate-y-1"
            >
              Start Free Trial
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#how-it-works" 
              className="group w-full sm:w-auto h-12 md:h-14 px-8 bg-white text-[#151515] border border-slate-200 rounded-xl md:rounded-2xl font-bold text-sm md:text-base flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
            >
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#0066cc] group-hover:scale-110 transition-transform">
                <Play size={12} fill="currentColor" />
              </div>
              See How It Works
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-8 pt-10 border-t border-slate-100"
          >
             <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-sm relative">
                   <Image 
                     src={i % 2 === 0 ? "/testimonial_doctor_1_1776494717981.png" : "/testimonial_doctor_2_1776494742399.png"} 
                     alt="Doctor" 
                     width={48} 
                     height={48} 
                     className="object-cover" 
                   />
                 </div>
               ))}
             </div>
             <div>
               <div className="flex items-center gap-1 mb-1">
                 {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-orange-400 fill-orange-400" />)}
               </div>
               <p className="text-[12px] font-bold text-[#151515]">Trusted by 150+ Clinics</p>
             </div>
          </motion.div>
        </div>

        {/* Right Visuals */}
        <div className="lg:col-span-5 relative perspective-[2500px] mt-8 lg:mt-0">
          {/* Main Realistic Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30, rotateX: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: -15, rotateX: 10 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[280px] sm:max-w-[320px] h-[580px] sm:h-[650px] bg-gradient-to-tr from-slate-800 via-slate-600 to-slate-800 rounded-[3.5rem] sm:rounded-[4rem] p-2 sm:p-2.5 shadow-[0_120px_250px_-60px_rgba(0,102,204,0.4),inset_0_0_8px_rgba(255,255,255,0.3)] ring-2 ring-slate-800/50 mx-auto"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Hardware Buttons */}
            <div className="absolute top-32 -left-[3px] w-[3px] h-8 bg-slate-600 rounded-l-md shadow-[inset_1px_0_2px_rgba(255,255,255,0.4)]" />
            <div className="absolute top-48 -left-[3px] w-[3px] h-14 bg-slate-600 rounded-l-md shadow-[inset_1px_0_2px_rgba(255,255,255,0.4)]" />
            <div className="absolute top-64 -left-[3px] w-[3px] h-14 bg-slate-600 rounded-l-md shadow-[inset_1px_0_2px_rgba(255,255,255,0.4)]" />
            <div className="absolute top-48 -right-[3px] w-[3px] h-20 bg-slate-600 rounded-r-md shadow-[inset_-1px_0_2px_rgba(255,255,255,0.4)]" />

            {/* Inner Bezel */}
            <div className="relative h-full w-full bg-black rounded-[3rem] sm:rounded-[3.5rem] overflow-hidden flex flex-col p-1.5 sm:p-2 shadow-[inset_0_0_0_2px_#000]">
               
               {/* Phone Screen */}
               <div className="relative h-full w-full bg-[#f8fafc] rounded-[2.8rem] sm:rounded-[3.2rem] overflow-hidden flex flex-col">
                 
                 {/* Dynamic Island */}
                 <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-7 bg-black rounded-full z-40 flex items-center justify-end px-2">
                    <div className="w-2 h-2 rounded-full bg-[#0a0a0a] ring-1 ring-white/10" />
                 </div>

                 {/* Status Bar */}
                 <div className="absolute top-0 inset-x-0 h-14 px-8 flex items-center justify-between text-[11px] font-bold text-slate-800 z-30 pt-1">
                    <span>{currentTime}</span>
                    <div className="flex items-center gap-1.5 opacity-90">
                      <Wifi size={12} />
                      <Battery size={14} />
                    </div>
                 </div>

                 {/* Simulated App Header */}
                 <div className="pt-16 pb-4 px-6 sm:px-8 bg-white border-b border-slate-100 flex items-center gap-3 sm:gap-4 relative z-20">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-200 shrink-0">
                      <Smartphone size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] sm:text-[10px] font-black text-blue-500 uppercase tracking-widest">Clinic AI</p>
                      <h3 className="font-bold text-[#151515] text-xs sm:text-sm">Patient Concierge</h3>
                    </div>
                 </div>

                 {/* Stacking Chat Messages */}
                 <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto scrollbar-hide pt-6 relative z-10">
                   <AnimatePresence>
                      {chatMessages.slice(0, visibleMessages).map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 15, scale: 0.9, rotateX: -10 }}
                          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                          className={`p-3 rounded-2xl shadow-lg text-[11px] sm:text-[12px] font-semibold leading-relaxed ${
                            msg.role === 'ai' 
                            ? 'bg-blue-600 text-white rounded-tr-none self-end ml-4 sm:ml-8' 
                            : 'bg-white text-slate-700 rounded-tl-none border border-slate-100 mr-4 sm:mr-8 shadow-sm'
                          }`}
                        >
                          {msg.text}
                        </motion.div>
                      ))}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="bg-slate-100 px-4 py-2.5 rounded-2xl rounded-tl-none w-16 flex justify-center gap-1 shadow-sm border border-slate-200/50"
                        >
                          <motion.span 
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                            className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-slate-400 rounded-full"
                          />
                          <motion.span 
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-slate-400 rounded-full"
                          />
                          <motion.span 
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-slate-400 rounded-full"
                          />
                        </motion.div>
                      )}
                   </AnimatePresence>
                 </div>

                 {/* Screen Glare Effect */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-30" />
               </div>
            </div>
          </motion.div>

          {/* Asymmetric Floating Cards */}
          <FloatingCard 
            className="top-12 sm:top-20 -left-8 sm:-left-16 md:-left-24 lg:-left-32 w-36 sm:w-52 md:w-60 rounded-[1.5rem] sm:rounded-[2.5rem] rounded-bl-none"
            delay={0.6}
          >
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                <CheckCircle2 size={16} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Efficiency</p>
                <p className="text-xs sm:text-lg font-bold text-[#151515]">100% Capture</p>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard 
            className="bottom-16 sm:bottom-32 -right-8 sm:-right-16 md:-right-24 lg:-right-32 w-40 sm:w-56 md:w-64 rounded-[1.5rem] sm:rounded-[2.5rem] rounded-tr-none"
            delay={0.8}
          >
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0">
                <Users size={16} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth</p>
                <p className="text-xs sm:text-lg font-bold text-[#151515]">24/7 Service</p>
              </div>
            </div>
          </FloatingCard>

          {/* Geometric Bloom Element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -z-10" />
        </div>

      </div>
    </section>
  );
};
