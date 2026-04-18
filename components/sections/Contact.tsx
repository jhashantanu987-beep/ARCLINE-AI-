"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Calendar, ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    clinicName: "",
    email: "",
    phone: "",
    cms: "Cliniko"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ fullName: "", clinicName: "", email: "", phone: "", cms: "Cliniko" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 px-8 bg-[#f8fafc] relative overflow-hidden" id="contact">
      {/* Background Decorative */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0066cc]/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Left Side: Copy & Trust */}
          <div className="space-y-10">
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#0066cc] text-[10px] font-bold tracking-[0.2em] uppercase border border-blue-100">
                Exclusive Consultation
              </motion.div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#151515] leading-[1.05] tracking-tight">
                Reclaim your <br />
                <span className="text-[#0066cc]">clinic's freedom.</span>
              </h2>
              <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-lg">
                Book a 15-minute Discovery Call to see how Arcline can automate your front desk and scale your patient capacity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-4">
                 <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-500"><ShieldCheck size={20} /></div>
                 <div>
                    <h4 className="font-bold text-[#151515] text-sm">Security First</h4>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">Medically Compliant</p>
                 </div>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-4">
                 <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#0066cc]"><Zap size={20} /></div>
                 <div>
                    <h4 className="font-bold text-[#151515] text-sm">Rapid Launch</h4>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">30-Min Onboarding</p>
                 </div>
              </div>
            </div>

            <div className="pt-8 space-y-4">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#0066cc] animate-pulse"></div>
                  <p className="text-sm font-bold text-slate-600">Now accepting 12 new clinics this month</p>
               </div>
               <div className="flex items-center -space-x-3">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                       <img src={`https://i.pravatar.cc/100?img=${i * 10 + 10}`} alt="Clinic Partner" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <p className="pl-6 text-xs font-bold text-slate-400 uppercase tracking-widest">+150 Clinics Managed</p>
               </div>
            </div>
          </div>

          {/* Right Side: High-End Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3.5rem] p-10 md:p-12 shadow-2xl border border-slate-100 relative min-h-[550px] flex flex-col"
          >
            {isSubmitted ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                  <CheckCircle2 size={48} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-[#151515]">Request Received</h3>
                  <p className="text-slate-500 font-medium max-w-sm mx-auto">
                    We've received your details. Our onboarding team will contact you shortly to schedule your Strategy Session.
                  </p>
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-[#0066cc] font-bold text-sm hover:underline pt-4"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <div className="space-y-8 flex-1">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-[#151515]">Book your Strategy Call</h3>
                  <p className="text-slate-400 text-sm font-medium">No commitment. Just a clear roadmap to ROI.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        required
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all outline-none" 
                        placeholder="Dr. John Smith" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Clinic Name</label>
                      <input 
                        required
                        name="clinicName"
                        value={formData.clinicName}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all outline-none" 
                        placeholder="The Wellness Clinic" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all outline-none" 
                      placeholder="john@wellnessclinic.com" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                    <input 
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all outline-none" 
                      placeholder="+61 400 000 000" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Current CMS</label>
                    <select 
                      name="cms"
                      value={formData.cms}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all outline-none appearance-none"
                    >
                       <option value="Cliniko">Cliniko</option>
                       <option value="Jane">Jane</option>
                       <option value="Halaxy">Halaxy</option>
                       <option value="Other">Other</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#151515] text-white py-5 rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-xl hover:-translate-y-1 mt-4 flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Schedule Strategy Session <ArrowRight size={20} /></>
                    )}
                  </button>
                  
                  <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest mt-4">
                    Privacy Protected · No Credit Card Required
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
