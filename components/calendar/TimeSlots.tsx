"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Loader2 } from "lucide-react";

interface TimeSlotsProps {
  date: Date;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  onBack: () => void;
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const formatTime = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
};

function TimeSlotButton({ slot, selected, onSelect }: { slot: string; selected: boolean; onSelect: (s: string) => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => onSelect(slot)}
      className={`py-3 px-4 rounded-2xl font-bold text-sm transition-all duration-200 border ${
        selected
          ? "bg-[#0066cc] text-white border-[#0066cc] shadow-lg shadow-blue-500/25"
          : "bg-white text-slate-700 border-slate-200 hover:border-[#0066cc] hover:text-[#0066cc] hover:bg-blue-50"
      }`}
    >
      {formatTime(slot)}
    </motion.button>
  );
}

export function TimeSlots({ date, selectedTime, onSelectTime, onBack }: TimeSlotsProps) {
  const [slots, setSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/calendar?date=${dateStr}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setSlots(data.slots || []);
      } catch (e: any) {
        setError(e.message || "Failed to load slots");
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, [dateStr]);

  const amSlots = slots.filter((s) => parseInt(s.split(":")[0]) < 12);
  const pmSlots = slots.filter((s) => parseInt(s.split(":")[0]) >= 12);

  return (
    <div className="p-8 md:p-12">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-slate-900 mb-6 group transition-colors">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
      </button>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Choose a Time</h2>
      <p className="text-slate-500 font-medium mb-8">
        Available slots for <span className="text-slate-900 font-bold">{MONTHS[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</span>
      </p>

      {loading && <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-[#0066cc]" /></div>}
      {error && <div className="text-center py-20 text-red-500 font-bold">{error}</div>}
      {!loading && !error && slots.length === 0 && (
        <div className="text-center py-20 space-y-3">
          <Clock size={40} className="text-slate-300 mx-auto" />
          <p className="text-slate-500 font-bold">No available slots for this date.</p>
          <button onClick={onBack} className="mt-4 px-6 py-3 bg-[#0066cc] text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all">Pick Another Date</button>
        </div>
      )}

      {!loading && !error && slots.length > 0 && (
        <div className="space-y-8">
          {amSlots.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">Morning</p>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {amSlots.map((slot) => <TimeSlotButton key={slot} slot={slot} selected={selectedTime === slot} onSelect={onSelectTime} />)}
              </div>
            </div>
          )}
          {pmSlots.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">Afternoon</p>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {pmSlots.map((slot) => <TimeSlotButton key={slot} slot={slot} selected={selectedTime === slot} onSelect={onSelectTime} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
