"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, Globe, Phone, User, Building2, Calendar, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

const STEP_DURATION = 8000; // 8 seconds per slide

const stepsData = [
  {
    id: 0,
    title: "Configure your AI receptionist",
    description: "Choose your features, pick your accent and use our AI to do most of the set up for you.",
  },
  {
    id: 1,
    title: "Choose what Arcline can book",
    description: "Connect your calendar and define exactly which services and practitioners the AI can schedule.",
  },
  {
    id: 2,
    title: "Auto-scan your website for FAQs",
    description: "Our AI reads your website to learn about your clinic, parking, and common patient questions instantly.",
  },
  {
    id: 3,
    title: "Forward calls to your Arcline number",
    description: "Simply divert your calls when you're busy or after hours. Arcline takes over and handles the rest.",
  },
];

// Typewriter Component for the form fields
const TypewriterText = ({ text, delay = 0, speed = 40, active = true }: { text: string, delay?: number, speed?: number, active?: boolean }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplayedText("");
      setIsDone(false);
      return;
    }

    let timeout: NodeJS.Timeout;
    let currentIndex = 0;

    const startTyping = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));
        currentIndex++;
        timeout = setTimeout(startTyping, speed);
      } else {
        setIsDone(true);
      }
    };

    const initialDelay = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(timeout);
    };
  }, [text, delay, speed, active]);

  return (
    <div className="flex items-center">
      <span>{displayedText}</span>
      {active && !isDone && (
        <motion.span 
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="w-[2px] h-[14px] bg-[#0066cc] ml-[1px]"
        />
      )}
    </div>
  );
};

export const Setup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / STEP_DURATION) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        setActiveStep((prev) => (prev + 1) % stepsData.length);
        setProgress(0);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [activeStep]);

  return (
    <section className="py-16 md:py-24 px-8 bg-[#f8fafc]" id="setup">
      <div className="max-w-7xl mx-auto bg-white rounded-[3rem] p-12 lg:p-20 shadow-xl border border-slate-100 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0066cc]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"></div>

        <div className="relative z-10 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 text-[#0066cc] rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6"
            >
              <Zap size={10} fill="#0066cc" /> Setup Guide
            </motion.div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#151515] mb-4">
              Get Setup <br />
              <span className="text-[#0066cc]">In just 30 minutes</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg max-w-md">
              No technical knowledge required. Our onboarding team handles everything end-to-end.
            </p>
          </div>
          <Link
            href="/book"
            className="shrink-0 inline-flex items-center gap-3 h-14 px-8 bg-[#0066cc] text-white rounded-2xl font-bold text-base hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/20 active:scale-[0.98] transition-all group"
          >
            Get Started Free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-4">
            {stepsData.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <div 
                  key={step.id}
                  onClick={() => { setActiveStep(index); setProgress(0); }}
                  className={`group cursor-pointer relative pl-8 py-6 rounded-2xl transition-all duration-500 ${isActive ? 'bg-[#0066cc]/5' : 'hover:bg-slate-50'}`}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-100 rounded-full overflow-hidden">
                    {isActive && (
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${progress}%` }}
                        className="w-full bg-[#0066cc]"
                        transition={{ ease: "linear" }}
                      />
                    )}
                  </div>

                  <div className="flex items-start gap-5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-500 ${isActive ? 'bg-[#0066cc] text-white shadow-lg shadow-[#0066cc]/30' : 'bg-slate-200 text-slate-500'}`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-h-[80px]">
                      <h3 className={`text-lg font-bold mb-2 transition-colors duration-500 ${isActive ? 'text-[#0066cc]' : 'text-slate-400'}`}>
                        {step.title}
                      </h3>
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-slate-500 text-sm leading-relaxed overflow-hidden"
                          >
                            {step.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeStep}
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 max-w-md mx-auto relative overflow-hidden min-h-[500px]"
              >
                <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2 text-sm uppercase tracking-wider">
                    {activeStep === 0 && <><User size={16} className="text-[#0066cc]" /> Basic Information</>}
                    {activeStep === 1 && <><Calendar size={16} className="text-[#0066cc]" /> Booking Config</>}
                    {activeStep === 2 && <><Globe size={16} className="text-[#0066cc]" /> AI Training</>}
                    {activeStep === 3 && <><Phone size={16} className="text-[#0066cc]" /> Call Routing</>}
                  </h4>
                  <ChevronDown size={18} className="text-slate-400" />
                </div>

                {activeStep === 0 && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Receptionist Name</label>
                      <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium">
                        <TypewriterText text="Arcline" delay={500} speed={60} active={activeStep === 0} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Company Name</label>
                      <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium">
                        <TypewriterText text="The Wellness Clinic" delay={1200} speed={50} active={activeStep === 0} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Notification Email</label>
                      <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium">
                        <TypewriterText text="reception@wellnessclinic.co" delay={2200} speed={40} active={activeStep === 0} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Assistant Voice Accent</label>
                      <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium flex justify-between items-center">
                        <TypewriterText text="AUS English" delay={3500} speed={60} active={activeStep === 0} />
                        <ChevronDown size={14} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Company Info</label>
                      <div className="bg-[#f0f9ff] border border-[#0066cc]/20 rounded-xl px-4 py-3 text-sm text-[#0066cc] font-medium leading-relaxed min-h-[80px]">
                        <TypewriterText text="We are a holistic health clinic dedicated to providing patient-centric care 24/7." delay={4500} speed={30} active={activeStep === 0} />
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-6 py-4 text-center">
                    <div className="w-20 h-20 bg-[#0066cc]/10 rounded-full flex items-center justify-center text-[#0066cc] mx-auto mb-4">
                      <Calendar size={32} />
                    </div>
                    <h5 className="font-bold text-slate-800">Connect to Cliniko</h5>
                    <p className="text-xs text-slate-500">Sync practitioners, availability and treatment types in one click.</p>
                    <div className="bg-[#151515] text-white py-3 rounded-xl text-sm font-bold shadow-lg">
                      Authenticate Connection
                    </div>
                    <div className="flex gap-2 justify-center pt-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-[10px] font-bold text-green-600 uppercase">Secure OAuth</span>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Website URL</label>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium">
                          <TypewriterText text="wellnessclinic.com.au" delay={500} speed={50} active={activeStep === 2} />
                        </div>
                        <div className="bg-[#0066cc] text-white px-4 py-3 rounded-xl text-xs font-bold">Scan</div>
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                        Parking information extracted
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                        Opening hours learned
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium animate-pulse">
                        <div className="w-4 h-4 rounded-full bg-[#0066cc]/20 flex items-center justify-center text-[#0066cc]">
                          <div className="w-1.5 h-1.5 bg-[#0066cc] rounded-full"></div>
                        </div>
                        Analyzing treatment descriptions...
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-6 py-4">
                    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div>
                        <p className="text-xs font-bold text-slate-800">Your Arcline Number</p>
                        <p className="text-sm font-bold text-[#0066cc]">+61 2 9123 4567</p>
                      </div>
                      <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Copy</button>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        To go live, simply set your clinic phone to divert to your Arcline number after 3 rings.
                      </p>
                      <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                         <div className="flex items-center justify-between">
                           <span className="text-xs font-bold text-slate-700 uppercase">After Hours</span>
                           <div className="w-8 h-4 bg-[#0066cc] rounded-full relative"><div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full"></div></div>
                         </div>
                         <div className="flex items-center justify-between">
                           <span className="text-xs font-bold text-slate-700 uppercase">Overflow Only</span>
                           <div className="w-8 h-4 bg-slate-300 rounded-full relative"><div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full"></div></div>
                         </div>
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

            <div className="absolute -top-6 -right-6 w-12 h-12 bg-[#0066cc]/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-[#0066cc]/10 rounded-full blur-2xl"></div>
          </div>

        </div>

        {/* Bottom CTA Row */}
        <div className="relative z-10 mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 font-medium text-sm">
            Join <span className="font-bold text-slate-900">150+ clinics</span> already running Arcline AI — set up in under 30 minutes.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/signup" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
              Create free account
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 h-11 px-6 bg-[#151515] text-white rounded-2xl font-bold text-sm hover:bg-black hover:shadow-xl transition-all group"
            >
              Book a Demo
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
