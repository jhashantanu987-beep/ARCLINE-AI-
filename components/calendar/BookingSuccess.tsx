"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, CalendarDays, Clock, Mail, RotateCcw } from "lucide-react";

interface BookingSuccessProps {
  name: string;
  email: string;
  date: Date;
  time: string;
  bookingId: string;
  onReset: () => void;
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const formatTime = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
};

export function BookingSuccess({ name, email, date, time, bookingId, onReset }: BookingSuccessProps) {
  return (
    <div className="p-8 md:p-16 text-center">
      {/* Animated Check */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8"
      >
        <CheckCircle2 size={48} className="text-green-500" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          You're booked, {name.split(" ")[0]}!
        </h2>
        <p className="text-slate-500 font-medium text-lg max-w-md mx-auto mb-10">
          Your Arcline AI consultation has been confirmed. We'll see you soon.
        </p>
      </motion.div>

      {/* Booking Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 max-w-sm mx-auto mb-10 text-left space-y-5"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#0066cc]">
            <CalendarDays size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</p>
            <p className="text-slate-900 font-bold">
              {DAYS[date.getDay()]}, {MONTHS[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#0066cc]">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Time</p>
            <p className="text-slate-900 font-bold">{formatTime(time)} · 30 minutes</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#0066cc]">
            <Mail size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confirmation Sent To</p>
            <p className="text-slate-900 font-bold">{email}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Booking Reference</p>
          <p className="text-slate-700 font-mono text-sm mt-1 select-all">{bookingId}</p>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        onClick={onReset}
        className="flex items-center gap-2 mx-auto text-slate-500 font-bold text-sm hover:text-slate-900 transition-colors"
      >
        <RotateCcw size={14} /> Book another session
      </motion.button>
    </div>
  );
}
