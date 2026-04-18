"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, CalendarDays, Clock } from "lucide-react";

interface BookingFormProps {
  date: Date;
  time: string;
  formData: { name: string; email: string; phone: string; notes: string };
  onFormChange: (fields: Partial<{ name: string; email: string; phone: string; notes: string }>) => void;
  onBack: () => void;
  onSuccess: (bookingId: string) => void;
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const formatTime = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
};

export function BookingForm({ date, time, formData, onFormChange, onBack, onSuccess }: BookingFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: dateStr,
          time,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          notes: formData.notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      onSuccess(data.booking.id);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 md:p-12">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-slate-900 mb-6 group transition-colors">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
      </button>

      <h2 className="text-2xl font-bold text-slate-900 mb-1">Your Details</h2>
      <p className="text-slate-500 font-medium mb-8">Almost there! Fill in your contact information to confirm.</p>

      {/* Summary Pill */}
      <div className="flex flex-wrap gap-3 mb-8">
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-sm font-bold text-[#0066cc]">
          <CalendarDays size={14} />
          {MONTHS[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-sm font-bold text-[#0066cc]">
          <Clock size={14} />
          {formatTime(time)}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name *</label>
            <input
              type="text" required
              value={formData.name}
              onChange={(e) => onFormChange({ name: e.target.value })}
              placeholder="Dr. Sarah Mitchell"
              className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder:text-slate-300 outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address *</label>
            <input
              type="email" required
              value={formData.email}
              onChange={(e) => onFormChange({ email: e.target.value })}
              placeholder="sarah@clinic.com"
              className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder:text-slate-300 outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => onFormChange({ phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder:text-slate-300 outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-blue-500/10 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">What do you want to discuss?</label>
          <textarea
            value={formData.notes}
            onChange={(e) => onFormChange({ notes: e.target.value })}
            rows={3}
            placeholder="E.g., I run a 3-GP clinic and want to automate patient calls..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder:text-slate-300 outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
          />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-bold"
          >
            {error}
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-[#0066cc] text-white rounded-2xl font-bold text-base flex items-center justify-center gap-3 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/20 transition-all disabled:opacity-70"
        >
          {loading ? (
            <><Loader2 size={20} className="animate-spin" /> Confirming...</>
          ) : (
            "Confirm Booking →"
          )}
        </motion.button>
      </form>
    </div>
  );
}
