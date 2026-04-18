"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, Calendar, BarChart3, Clock, 
  MessageSquare, Users, Shield, Zap,
  CheckCircle2, ArrowRight, Sparkles
} from "lucide-react";
import Link from "next/link";

const tabs = [
  {
    id: "reception",
    label: "AI Reception",
    icon: Phone,
    title: "The front desk, without the desk.",
    description: "Arcline's voice engine handles every inbound call with a human-like Australian accent. It understands context, handles complex medical FAQs, and manages patients with empathy.",
    mockup: {
      type: "phone",
      status: "Call in progress...",
      caller: "Dr. Alana Thompson",
      duration: "01:24",
      transcript: [
        { role: "patient", text: "Hi, I have a session at 2 PM. Where can I park?" },
        { role: "ai", text: "Hello! We have free parking right behind the clinic entrance on High Street. See you at 2:00 PM! 👋" }
      ]
    }
  },
  {
    id: "booking",
    label: "Live Booking",
    icon: Calendar,
    title: "Direct EHR integration.",
    description: "Arcline doesn't just take messages. It looks into your Halaxy or Cliniko calendar in real-time, finds slots, and books them — notifying you instantly.",
    mockup: {
      type: "calendar",
      events: [
        { time: "09:00", patient: "James Wilson", status: "Booked by AI" },
        { time: "10:30", patient: "Sarah Chen", status: "Booked by AI" },
        { time: "14:00", patient: "Mark Harrison", status: "Live Booking..." }
      ]
    }
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    title: "Full ROI Visibility.",
    description: "See exactly how much revenue Arcline is capturing after hours. Track call volume, conversion rates, and ROI from a single, beautiful dashboard.",
    mockup: {
      type: "stats",
      metrics: [
        { label: "Calls Handled", value: "1,248" },
        { label: "Revenue Captured", value: "$42,890" },
        { label: "Staff Hours Saved", value: "240hr" }
      ]
    }
  }
];

export const TabbedExplainer = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-white relative overflow-hidden" id="tabbed-explainer">
      {/* Cinematic Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-blue-50/30 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-16 space-y-4 md:space-y-6">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-blue-50 text-[#0066cc] text-[12px] font-black tracking-[0.4em] uppercase border border-blue-100/50"
           >
             <Sparkles size={14} className="animate-pulse" /> Interactive OS
           </motion.div>
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#151515] tracking-tight leading-[0.9]">
             The Platform <br /> <span className="text-[#0066cc]">at a glance.</span>
           </h2>
        </div>

        {/* Futuristic Dock Switcher */}
        <div className="flex justify-center mb-10 md:mb-16 px-4 overflow-x-auto scrollbar-hide w-full pb-4">
          <div className="inline-flex items-center gap-1 md:gap-2 p-2 md:p-3 bg-slate-50/80 backdrop-blur-2xl rounded-[3rem] border border-slate-100 shadow-xl w-max">
             {tabs.map((tab) => {
               const Icon = tab.icon;
               const isActive = activeTab.id === tab.id;
               return (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab)}
                   className={`relative px-4 md:px-8 py-3 md:py-4 rounded-[2.5rem] flex items-center gap-2 md:gap-3 transition-all duration-500 group whitespace-nowrap ${isActive ? "text-white" : "text-slate-500 hover:text-slate-800 hover:bg-white"}`}
                 >
                    {isActive && (
                      <motion.div 
                        layoutId="activeTab" 
                        className="absolute inset-0 bg-[#151515] rounded-[2.5rem] shadow-2xl z-0" 
                      />
                    )}
                    <Icon size={16} className={`relative z-10 transition-transform group-hover:scale-110 md:w-5 md:h-5 ${isActive ? 'text-blue-400' : ''}`} />
                    <span className="relative z-10 text-xs md:text-sm font-bold tracking-tight">{tab.label}</span>
                 </button>
               );
             })}
          </div>
        </div>

        {/* Feature Display Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Content Pane */}
          <div className="lg:col-span-5 space-y-8">
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeTab.id}
                 initial={{ opacity: 0, x: -30 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -30 }}
                 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                 className="space-y-8"
               >
                 <h3 className="text-3xl md:text-4xl font-bold text-[#151515] leading-tight tracking-tight">
                   {activeTab.title}
                 </h3>
                 <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
                   {activeTab.description}
                 </p>
                 <div className="pt-2 md:pt-4">
                    <Link href="#pricing" className="inline-flex h-12 md:h-14 px-8 bg-blue-50 text-[#0066cc] rounded-xl md:rounded-2xl font-bold text-sm md:text-base hover:bg-blue-100 transition-all items-center gap-2 w-full sm:w-auto justify-center">
                       Explore Component <ArrowRight size={18} />
                    </Link>
                 </div>
               </motion.div>
             </AnimatePresence>
          </div>

          {/* Futuristic Asymmetric Mockup Pane */}
          <div className="lg:col-span-7 relative flex justify-center perspective-[2000px]">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[700px] h-[450px] sm:h-[500px] md:h-auto md:aspect-[16/10] bg-white rounded-[2.5rem] md:rounded-[4rem] rounded-br-none shadow-[0_60px_120px_-30px_rgba(0,102,204,0.1)] border border-slate-100 overflow-hidden relative"
                >
                   {/* Background Elements */}
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(0,102,204,0.03)_0%,transparent_50%)]" />
                   
                   {/* Mockup Content */}
                   <div className="relative h-full p-6 md:p-12 overflow-y-auto scrollbar-hide">
                      {activeTab.id === "reception" && (
                         <div className="h-full flex flex-col">
                            <div className="flex items-center justify-between mb-12">
                               <div className="flex items-center gap-4">
                                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200 animate-pulse">
                                     <Phone size={24} />
                                  </div>
                                  <div>
                                     <h4 className="font-bold text-slate-800 text-lg tracking-tight">Active Voice Stream</h4>
                                     <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                                        <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Natural Processing</p>
                                     </div>
                                  </div>
                               </div>
                               <div className="px-6 py-2 bg-slate-50 rounded-full text-slate-400 font-bold text-xs uppercase tracking-widest">01:24</div>
                            </div>
                            <div className="space-y-6">
                               {activeTab.mockup.transcript?.map((msg: any, i: number) => (
                                  <motion.div 
                                    initial={{ opacity: 0, y: 20 }} 
                                    animate={{ opacity: 1, y: 0 }} 
                                    transition={{ delay: i * 0.2 }}
                                    key={i} 
                                    className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                                  >
                                     <div className={`max-w-[80%] p-6 rounded-[2.5rem] shadow-sm text-sm font-semibold leading-relaxed ${msg.role === 'ai' ? 'bg-blue-600 text-white rounded-tl-none' : 'bg-slate-50 text-slate-700 rounded-tr-none'}`}>
                                        {msg.text}
                                     </div>
                                  </motion.div>
                               ))}
                            </div>
                         </div>
                      )}

                      {activeTab.id === "booking" && (
                         <div className="h-full flex flex-col">
                            <h4 className="font-bold text-slate-800 text-lg mb-8 tracking-tight">Today's Automated Bookings</h4>
                            <div className="space-y-4">
                               {activeTab.mockup.events?.map((ev: any, i: number) => (
                                  <motion.div 
                                    initial={{ opacity: 0, x: -20 }} 
                                    animate={{ opacity: 1, x: 0 }} 
                                    transition={{ delay: i * 0.1 }}
                                    key={i} 
                                    className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100"
                                  >
                                     <div className="flex items-center gap-6">
                                        <div className="text-sm font-bold text-blue-600 w-12">{ev.time}</div>
                                        <div className="text-slate-800 font-bold">{ev.patient}</div>
                                     </div>
                                     <div className="flex items-center gap-2">
                                        <CheckCircle2 size={16} className="text-green-500" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{ev.status}</span>
                                     </div>
                                  </motion.div>
                               ))}
                            </div>
                         </div>
                      )}

                      {activeTab.id === "analytics" && (
                         <div className="h-full flex flex-col">
                            <h4 className="font-bold text-slate-800 text-lg mb-10 tracking-tight">Growth Performance Matrix</h4>
                            <div className="grid grid-cols-3 gap-6 flex-1">
                               {activeTab.mockup.metrics?.map((m: any, i: number) => (
                                  <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }} 
                                    animate={{ opacity: 1, scale: 1 }} 
                                    transition={{ delay: i * 0.1 }}
                                    key={i} 
                                    className="p-8 bg-blue-50/50 rounded-[3rem] rounded-br-none border border-blue-100/50 flex flex-col justify-center text-center group hover:bg-blue-600 hover:text-white transition-all duration-500"
                                  >
                                     <div className="text-3xl font-black mb-2 tracking-tighter tabular-nums">{m.value}</div>
                                     <div className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100">{m.label}</div>
                                  </motion.div>
                               ))}
                            </div>
                            <div className="mt-8 p-6 bg-[#151515] rounded-[2rem] flex items-center justify-between">
                               <div className="text-white font-bold text-sm">Target vs Actual</div>
                               <div className="flex items-center gap-1">
                                  {[1,2,3,4,5,6].map(i => (
                                     <div key={i} className={`w-1.5 h-6 rounded-full bg-blue-500/30 ${i < 5 ? 'bg-blue-500' : ''}`} />
                                  ))}
                                </div>
                            </div>
                         </div>
                      )}
                   </div>
                </motion.div>
             </AnimatePresence>

             {/* Dynamic Depth Elements */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
