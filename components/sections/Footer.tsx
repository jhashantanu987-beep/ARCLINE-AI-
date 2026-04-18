"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Shield, Globe, Leaf, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: (
      <>
        "Within a couple of weeks we noticed <span className="text-[#0066cc] font-bold">fewer missed calls</span> and an <span className="text-[#0066cc] font-bold">increase in bookings</span>. Arcline took care of all those after-hours enquiries."
      </>
    ),
    author: "Maddi",
    role: "Practice Manager · My Body Clinic, Victoria",
  },
  {
    quote: (
      <>
        "Arcline acts like a full-time staff member. Our patients love the <span className="text-[#0066cc] font-bold">instant responses</span> and our front desk is <span className="text-[#0066cc] font-bold">no longer overwhelmed</span>."
      </>
    ),
    author: "Dr. Sarah Mitchell",
    role: "Lead Dentist · Smile Care Studio",
  },
  {
    quote: (
      <>
        "The <span className="text-[#0066cc] font-bold">direct integration with Cliniko</span> is flawless. We literally just turned it on and appointments started appearing in our calendar."
      </>
    ),
    author: "James Peterson",
    role: "Clinic Director · Elite Physio",
  }
];

const AUTOPLAY_DURATION = 6000; // 6 seconds per slide

export const Footer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, AUTOPLAY_DURATION);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="relative bg-[#fafbfe] border-t border-slate-100 overflow-hidden">
      {/* Subtle Dot Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          
          {/* Left Column - Brand & Compliance */}
          <div className="space-y-10">
            <div>
              {/* Logo */}
              <div className="relative w-32 h-10 mb-6">
                <Image 
                  src="/logo.png" 
                  alt="Arcline" 
                  fill
                  className="object-contain invert"
                />
              </div>
              <p className="text-slate-500 text-base leading-relaxed max-w-sm">
                The #1 AI receptionist for healthcare. Answer every patient call, day and night.
              </p>
            </div>

            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                Healthcare Compliance
              </h4>
              <div className="flex flex-wrap gap-8 items-center">
                <div className="flex items-center gap-2">
                  <Shield size={20} className="text-[#151515]" />
                  <span className="text-[10px] font-bold text-[#151515] leading-tight">GDPR<br/>Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-[#151515]" />
                  <span className="text-[10px] font-bold text-[#151515] leading-tight">APP<br/>Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={20} className="text-[#151515]" />
                  <span className="text-[10px] font-bold text-[#151515] leading-tight">NZ Info<br/>Privacy<br/>Principles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf size={20} className="text-[#151515]" />
                  <span className="text-[10px] font-bold text-[#151515] leading-tight">PIPEDA<br/>Compliant</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Testimonial Carousel */}
          <div className="space-y-6 flex flex-col justify-center min-h-[250px]">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              What Clinics Say
            </h4>
            
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            <div className="relative min-h-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <p className="text-slate-600 text-lg leading-relaxed mb-6">
                    {testimonials[currentIndex].quote}
                  </p>
                  <div>
                    <p className="font-bold text-[#151515] text-sm">{testimonials[currentIndex].author}</p>
                    <p className="text-slate-400 text-xs font-medium">{testimonials[currentIndex].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Animated Carousel Progress Dots */}
            <div className="flex items-center gap-2 pt-12">
              {testimonials.map((_, index) => (
                <div 
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="h-1.5 rounded-full bg-slate-200 relative overflow-hidden cursor-pointer transition-all duration-300"
                  style={{ width: index === currentIndex ? '32px' : '6px' }}
                >
                  {index === currentIndex && (
                    <motion.div 
                      className="absolute top-0 left-0 bottom-0 bg-[#0066cc]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: AUTOPLAY_DURATION / 1000, ease: "linear" }}
                      key={currentIndex} // Re-triggers animation on index change
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
