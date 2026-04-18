"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, User, LayoutDashboard, Zap, Sparkles } from "lucide-react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-outfit">
      {/* Futuristic Floating Navigation */}
      <nav 
        className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 w-full max-w-[1400px] px-8`}
      >
        <div 
          className={`flex items-center justify-between transition-all duration-500 rounded-[2.5rem] px-8 py-4 relative overflow-hidden ${
            isScrolled 
            ? "bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] py-4" 
            : "bg-transparent py-6"
          }`}
        >
          {/* Border Beam Animation (Visible on scroll) */}
          {isScrolled && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="absolute inset-0 pointer-events-none"
             >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0066cc]/50 to-transparent animate-shimmer" />
             </motion.div>
          )}

          <Link href="/" className="flex items-center gap-2 group relative z-10">
            <div className="relative w-40 h-10 transition-transform duration-500 group-hover:scale-105">
              <Image 
                src="/logo.png" 
                alt="Arcline" 
                fill
                className="object-contain invert"
              />
            </div>
          </Link>

          {/* Desktop Nav - Futuristic Pill Links */}
          <div className="hidden md:flex items-center bg-slate-50/50 p-1.5 rounded-full border border-slate-100/50 backdrop-blur-md relative z-10">
            {["How it Works", "Features", "Pricing", "FAQ"].map((item) => (
               <Link 
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                className="text-[12px] font-bold text-slate-500 px-6 py-2.5 rounded-full hover:text-[#0066cc] hover:bg-white transition-all duration-300"
               >
                 {item}
               </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4 relative z-10">
            {session ? (
              <Link href="/dashboard" className="flex items-center gap-2 bg-[#151515] text-white px-8 py-3 rounded-full font-bold text-[13px] hover:shadow-2xl hover:shadow-black/20 transition-all hover:-translate-y-0.5">
                <LayoutDashboard size={16} className="text-blue-400" />
                Portal
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-[13px] font-bold text-[#151515] hover:text-[#0066cc] px-6 py-3 transition-colors">Login</Link>
                <Link href="#calendar" className="bg-[#0066cc] text-white px-8 py-3 rounded-full font-bold text-[13px] shadow-[0_20px_40px_-10px_rgba(0,102,204,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(0,102,204,0.4)] transition-all hover:-translate-y-1 flex items-center gap-2 group">
                  Book Strategy <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-[#151515] relative z-10" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Futuristic Slide-down */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="md:hidden mt-4 bg-white/95 backdrop-blur-2xl rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden p-10"
            >
              <div className="flex flex-col gap-8">
                {["How it Works", "Features", "Pricing", "FAQ"].map((item) => (
                   <Link 
                     key={item} 
                     href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                     className="text-2xl font-bold text-[#151515] hover:text-[#0066cc] transition-colors"
                     onClick={() => setMobileMenuOpen(false)}
                   >
                     {item}
                   </Link>
                ))}
                <div className="pt-6 border-t border-slate-50 flex flex-col gap-4">
                   <Link href="/login" className="text-lg font-bold text-slate-500">Client Login</Link>
                   <Link href="#calendar" className="bg-[#0066cc] text-white px-8 py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                      Get Started <ArrowRight size={22} />
                   </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>{children}</main>
    </div>
  );
}
