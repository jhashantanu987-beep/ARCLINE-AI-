"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface DatePickerProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export function DatePicker({ selectedDate, onSelectDate }: DatePickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const cells: (number | null)[] = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isToday = (day: number) => {
    const d = new Date(year, month, day);
    return d.getTime() === today.getTime();
  };

  const isPast = (day: number) => {
    const d = new Date(year, month, day);
    return d < today;
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    const d = new Date(year, month, day);
    return d.getTime() === selectedDate.getTime();
  };

  const isWeekend = (day: number) => {
    const d = new Date(year, month, day);
    return d.getDay() === 0 || d.getDay() === 6;
  };

  return (
    <div className="p-8 md:p-12">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Pick a Date</h2>
        <p className="text-slate-500 font-medium mb-8">Select an available date for your consultation.</p>

        {/* Month Nav */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            disabled={new Date(year, month, 1) <= new Date(today.getFullYear(), today.getMonth(), 1)}
            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-lg font-bold text-slate-900">
            {MONTHS[month]} {year}
          </span>
          <button
            onClick={nextMonth}
            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 mb-3">
          {DAYS.map((d) => (
            <div key={d} className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest py-2">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />;

            const past = isPast(day);
            const weekend = isWeekend(day);
            const selected = isSelected(day);
            const disabled = past || weekend;

            return (
              <motion.button
                key={day}
                whileHover={disabled ? {} : { scale: 1.08 }}
                whileTap={disabled ? {} : { scale: 0.95 }}
                disabled={disabled}
                onClick={() => onSelectDate(new Date(year, month, day))}
                className={`
                  aspect-square rounded-xl text-sm font-bold transition-all duration-200 relative
                  ${selected
                    ? "bg-[#0066cc] text-white shadow-lg shadow-blue-500/30"
                    : disabled
                    ? "text-slate-300 cursor-not-allowed"
                    : "text-slate-700 hover:bg-blue-50 hover:text-[#0066cc]"
                  }
                  ${isToday(day) && !selected ? "ring-2 ring-[#0066cc] ring-offset-2" : ""}
                `}
              >
                {day}
              </motion.button>
            );
          })}
        </div>

        <p className="text-xs text-slate-400 font-medium text-center mt-6">
          Weekends are unavailable. All sessions are 30 minutes.
        </p>
      </div>
    </div>
  );
}
