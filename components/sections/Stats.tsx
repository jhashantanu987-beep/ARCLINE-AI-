"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Activity, Zap, TrendingUp, Users, Target, ShieldCheck } from "lucide-react";

const StatBox = ({ 
  value, 
  label, 
  prefix = "", 
  suffix = "", 
  delay = 0,
  isLive = false,
  icon: Icon,
  shapeClass = ""
}: { 
  value: number; 
  label: string; 
  prefix?: string; 
  suffix?: string; 
  delay?: number;
  isLive?: boolean;
  icon: any;
  shapeClass?: string;
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [displayValue, setDisplayValue] = useState(0);
  const currentValRef = useRef(0);

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        let start = 0;
        const end = value;
        const duration = 2500;
        const frameRate = 1000 / 60;
        const totalFrames = Math.round(duration / frameRate);
        let frame = 0;

        const timer = setInterval(() => {
          frame++;
          const progress = frame / totalFrames;
          const currentCount = end * (1 - Math.pow(2, -12 * progress));
          
          if (frame === totalFrames) {
            currentValRef.current = end;
            setDisplayValue(end);
            clearInterval(timer);
          } else {
            const val = Math.floor(currentCount);
            currentValRef.current = val;
            setDisplayValue(val);
          }
        }, frameRate);
      }, delay);
    }
  }, [inView, value, delay]);

  useEffect(() => {
    if (isLive && displayValue >= value) {
      const liveTimer = setInterval(() => {
        const increment = Math.floor(Math.random() * 3) + 1;
        currentValRef.current += increment;
        setDisplayValue(currentValRef.current);
      }, 3000 + Math.random() * 2000);
      return () => clearInterval(liveTimer);
    }
  }, [isLive, displayValue, value]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className={`relative group h-full ${shapeClass}`}
    >
      <div className={`h-full bg-white p-10 md:p-14 border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_50px_100px_-20px_rgba(0,102,204,0.15)] transition-all duration-700 hover:-translate-y-4 flex flex-col items-center justify-center text-center overflow-hidden ${shapeClass}`}>
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),rgba(0,102,204,0.05)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative z-10 space-y-6">
          <div className="w-20 h-20 rounded-[2rem] bg-slate-50 text-slate-400 group-hover:bg-[#151515] group-hover:text-white flex items-center justify-center transition-all duration-700 mb-4 mx-auto rotate-3 group-hover:rotate-0 shadow-lg">
             <Icon size={36} />
          </div>
          
          <div className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#151515] tracking-tighter tabular-nums leading-none">
            {prefix}{displayValue.toLocaleString()}{suffix}
          </div>
          
          <div className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] opacity-60 group-hover:text-[#0066cc] group-hover:opacity-100 transition-all">
            {label}
          </div>
        </div>

        {isLive && (
          <div className="absolute top-10 right-10 flex items-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]"></div>
             <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">Live Terminal</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const Stats = () => {
  return (
    <section className="py-20 md:py-32 px-6 bg-white overflow-hidden relative">
      {/* Background Polish */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(0,102,204,0.02)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        
        <div className="text-center mb-48 space-y-10">
           <motion.div 
             initial={{ opacity: 0, y: 10 }} 
             whileInView={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-blue-50 text-[#0066cc] text-[12px] font-black tracking-[0.4em] uppercase border border-blue-100/50"
           >
             <Zap size={14} className="fill-blue-500" /> Performance Matrix
           </motion.div>
           <h2 className="text-5xl md:text-6xl lg:text-[7rem] font-bold text-[#151515] tracking-tight leading-[0.85]">
             Proven. <br /><span className="text-[#0066cc]">At Scale.</span>
           </h2>
        </div>

        {/* Premium Asymmetric Pyramid Layout */}
        <div className="w-full flex flex-col items-center gap-10">
          
          {/* TOP: 1 Box */}
          <div className="w-full max-w-[500px]">
             <StatBox icon={Users} value={125432} label="Patients Assisted" suffix="+" delay={0} isLive={true} shapeClass="rounded-[4rem] rounded-tr-[12rem]" />
          </div>

          {/* MIDDLE: 2 Boxes */}
          <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-10">
             <StatBox icon={TrendingUp} value={45} label="Avg Revenue Lift" suffix="%" delay={150} shapeClass="rounded-[3rem] rounded-bl-[10rem]" />
             <StatBox icon={Activity} value={24} label="24/7 AI Availability" suffix="/7" delay={300} shapeClass="rounded-[3rem] rounded-tr-[10rem]" />
          </div>

          {/* BASE: 3 Boxes */}
          <div className="w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-3 gap-10">
             <StatBox icon={Target} value={99} label="Response Accuracy" suffix="%" delay={450} shapeClass="rounded-[3rem] rounded-tl-[8rem]" />
             <StatBox icon={Zap} value={1248900} label="Calls Handled" delay={600} isLive={true} shapeClass="rounded-[3rem]" />
             <StatBox icon={ShieldCheck} value={152} label="Clinics Onboarded" suffix="+" delay={750} shapeClass="rounded-[3rem] rounded-br-[8rem]" />
          </div>

        </div>
      </div>
    </section>
  );
};
