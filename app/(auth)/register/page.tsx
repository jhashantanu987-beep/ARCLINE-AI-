import React from "react";
import Link from "next/link";
import { ArrowRight, Bot } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-blue-50 text-[#0066cc] rounded-full flex items-center justify-center shadow-inner">
            <Bot size={32} />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Create an Account</h2>
        <p className="text-center text-slate-500 text-sm mb-8">Get started with Arcline AI Receptionist.</p>
        
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
            <input 
              type="text" 
              placeholder="Dr. John Smith"
              className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 focus:border-[#0066cc] outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
            <input 
              type="email" 
              placeholder="john@clinic.com"
              className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 focus:border-[#0066cc] outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 focus:border-[#0066cc] outline-none transition-colors"
            />
          </div>
          
          <button type="button" className="w-full h-12 bg-[#151515] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors mt-6">
            Create Account <ArrowRight size={16} />
          </button>
        </form>
        
        <p className="text-center text-sm text-slate-500 mt-6 font-medium">
          Already have an account? <Link href="/login" className="text-[#0066cc] font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
