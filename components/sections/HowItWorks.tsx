"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Zap, Calendar, Users, ChevronLeft, Info, Sparkles, ShieldCheck, ArrowRight, Wifi, Battery } from "lucide-react";

const FeatureTile = ({ icon: Icon, title, description, side, delay }: { icon: any, title: string, description: string, side: "left" | "right", delay: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className={`relative group flex flex-col ${side === "left" ? "lg:items-end lg:text-right" : "lg:items-start lg:text-left"} gap-8`}
    >
      <div className={`w-20 h-20 bg-white border border-slate-100 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] flex items-center justify-center text-[#0066cc] group-hover:bg-[#151515] group-hover:text-white transition-all duration-700 group-hover:-translate-y-3
        ${side === "left" ? "rounded-[2rem] rounded-tr-none" : "rounded-[2rem] rounded-tl-none"}
      `}>
        <Icon size={32} />
      </div>
      <div className="space-y-4">
        <h3 className="text-3xl font-bold text-[#151515] tracking-tight leading-tight">{title}</h3>
        <p className="text-slate-500 leading-relaxed text-lg lg:max-w-xs font-medium opacity-80 group-hover:opacity-100 transition-opacity">
          {description}
        </p>
      </div>

      {/* Futuristic Connector Node */}
      <div className={`hidden lg:block absolute top-10 ${side === 'left' ? '-right-12' : '-left-12'} w-4 h-4 rounded-full border-2 border-blue-100 bg-white group-hover:bg-[#0066cc] group-hover:scale-150 transition-all duration-500`}>
         <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-0 group-hover:opacity-40" />
      </div>
    </motion.div>
  );
};

const chatMessages = [
  { id: 1, role: "patient", text: "Hi, I have a session at 2 PM. Where can I park?" },
  { id: 2, role: "ai", text: "Hello! We have free parking right behind the clinic entrance on High Street. See you at 2:00 PM! 👋" },
  { id: 3, role: "patient", text: "Great, thank you so much!" },
  { id: 4, role: "ai", text: "You're very welcome! Let me know if you need anything else. 😊" },
];

export const HowItWorks = () => {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

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
      await new Promise(r => setTimeout(r, 1500));
      
      for (let i = 1; i <= chatMessages.length; i++) {
        if (isCancelled) return;
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 1800));
        if (isCancelled) return;
        setIsTyping(false);
        setVisibleMessages(i);
        await new Promise(r => setTimeout(r, 1200));
      }
      
      await new Promise(r => setTimeout(r, 5000));
      if (!isCancelled) sequence();
    };
    sequence();
    return () => { isCancelled = true; };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleMessages, isTyping]);

  return (
    <section className="py-56 px-8 bg-[#fcfcfc] relative overflow-hidden" id="how-it-works">
      {/* High-End Background Elements */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(0,102,204,0.03)_0%,transparent_70%)]" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-40 space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-blue-50 text-[#0066cc] text-[11px] font-black tracking-[0.3em] uppercase border border-blue-100/50"
          >
            <Sparkles size={14} className="animate-pulse" /> The Core Protocol
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-[#151515] leading-[0.95] tracking-tight">
            The end of <br /><span className="text-[#0066cc]">unanswered calls.</span>
          </h2>
          <p className="text-slate-500 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
            Arcline handles the heavy lifting so your medical team can focus on what matters: delivering world-class patient care.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Intelligence Tiles */}
          <div className="lg:col-span-4 space-y-32 order-2 lg:order-1">
            <FeatureTile 
              side="left"
              delay={0}
              icon={MessageSquare}
              title="Answers Enquiries"
              description="Instantly handles FAQs, from parking details to procedure information, using your clinic's own knowledge."
            />
            <FeatureTile 
              side="left"
              delay={0.2}
              icon={Zap}
              title="Human Tone"
              description="Zero robotic voices. Arcline talks conversationally, with natural empathy, making patients feel heard."
            />
          </div>

          {/* Center: 3D Phone Mockup with Perspective */}
          <div className="lg:col-span-4 relative flex justify-center order-1 lg:order-2 perspective-[2500px]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.85, rotateX: 20 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 10 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative w-[320px] h-[660px] bg-[#0a0a0a] rounded-[4rem] p-3 shadow-[0_120px_250px_-60px_rgba(0,102,204,0.3)] ring-1 ring-white/10"
              style={{ transformStyle: "preserve-3d", transform: "rotateY(-10deg) rotateX(10deg)" }}
            >
              <div className="relative h-full w-full bg-[#fcfcfc] rounded-[3.2rem] overflow-hidden flex flex-col">
                {/* Status Bar */}
                <div className="absolute top-0 inset-x-0 h-10 px-8 flex items-center justify-between text-[10px] font-bold text-slate-800 z-30">
                  <span>{currentTime}</span>
                  <div className="flex items-center gap-1">
                    <Wifi size={10} />
                    <Battery size={12} />
                  </div>
                </div>

                {/* Modern App Header */}
                <div className="pt-12 pb-5 px-8 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center gap-4 z-20">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-xl shadow-blue-500/20">A</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-[13px] tracking-tight">Clinic Concierge</h3>
                    <div className="flex items-center gap-1.5">
                       <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                       <p className="text-[8px] text-green-600 font-bold uppercase tracking-[0.2em]">Live Sync</p>
                    </div>
                  </div>
                </div>

                {/* Smooth Chat Flow */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scroll-smooth pb-20 scrollbar-hide pt-10">
                  <AnimatePresence>
                    {chatMessages.slice(0, visibleMessages).map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 15, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`p-4 rounded-[1.5rem] shadow-lg text-[12px] font-semibold leading-relaxed ${
                          msg.role === 'ai' 
                          ? 'bg-blue-600 text-white rounded-tr-none self-end ml-8' 
                          : 'bg-white text-slate-700 rounded-tl-none border border-slate-100 mr-8 shadow-sm'
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
                        className="bg-slate-100 px-5 py-3 rounded-2xl rounded-tl-none w-18 flex justify-center gap-1.5 shadow-sm border border-slate-200/50"
                      >
                        <motion.span 
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                          className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                        />
                        <motion.span 
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                        />
                        <motion.span 
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Background Shape Blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
          </div>

          {/* Right Side: Execution Tiles */}
          <div className="lg:col-span-4 space-y-32 order-3 lg:order-3">
            <FeatureTile 
              side="right"
              delay={0.4}
              icon={Calendar}
              title="Smart Booking"
              description="Deep integration with Cliniko & Halaxy. Arcline books or reschedules appointments in real-time."
            />
            <FeatureTile 
              side="right"
              delay={0.6}
              icon={Users}
              title="Intelligent Handoff"
              description="When a clinical triage is needed, Arcline seamlessly loops in your team with instant summaries."
            />
          </div>

        </div>
      </div>
    </section>
  );
};
