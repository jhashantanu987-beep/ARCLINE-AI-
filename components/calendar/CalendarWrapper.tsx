"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DatePicker } from "./DatePicker";
import { TimeSlots } from "./TimeSlots";
import { BookingForm } from "./BookingForm";
import { BookingSuccess } from "./BookingSuccess";
import { CheckCircle2, CalendarDays, Clock, User } from "lucide-react";

type Step = "date" | "time" | "details" | "success";

interface BookingData {
  date: Date | null;
  time: string | null;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

const steps = [
  { id: "date", label: "Pick Date", icon: CalendarDays },
  { id: "time", label: "Choose Time", icon: Clock },
  { id: "details", label: "Your Details", icon: User },
];

export function CalendarWrapper() {
  const [step, setStep] = useState<Step>("date");
  const [booking, setBooking] = useState<BookingData>({
    date: null,
    time: null,
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [createdBookingId, setCreatedBookingId] = useState<string>("");

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white flex items-center justify-center p-6 py-20">
      <div className="w-full max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 text-[#0066cc] rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          >
            <div className="w-1.5 h-1.5 bg-[#0066cc] rounded-full animate-pulse" />
            Book a Demo Session
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#151515] tracking-tight mb-4">
            Schedule Your Free<br />
            <span className="text-[#0066cc]">AI Consultation</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg max-w-xl mx-auto">
            See how Arcline AI can transform your clinic's call handling in just 30 minutes.
          </p>
        </div>

        {/* Step Progress */}
        {step !== "success" && (
          <div className="flex items-center justify-center gap-4 mb-12">
            {steps.map((s, i) => {
              const isCompleted = i < currentStepIndex;
              const isCurrent = s.id === step;
              return (
                <React.Fragment key={s.id}>
                  <div className="flex items-center gap-2">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                      isCompleted
                        ? "bg-[#0066cc] text-white shadow-lg shadow-blue-500/30"
                        : isCurrent
                        ? "bg-[#0066cc] text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-100"
                        : "bg-white border-2 border-slate-200 text-slate-400"
                    }`}>
                      {isCompleted ? <CheckCircle2 size={16} /> : <s.icon size={16} />}
                    </div>
                    <span className={`text-sm font-bold hidden md:block transition-colors ${isCurrent ? "text-slate-900" : "text-slate-400"}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 max-w-16 h-0.5 rounded-full transition-all duration-500 ${i < currentStepIndex ? "bg-[#0066cc]" : "bg-slate-200"}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* Content Card */}
        <motion.div
          layout
          className="bg-white rounded-[2.5rem] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {step === "date" && (
              <motion.div
                key="date"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <DatePicker
                  selectedDate={booking.date}
                  onSelectDate={(date) => {
                    setBooking((b) => ({ ...b, date }));
                    setStep("time");
                  }}
                />
              </motion.div>
            )}

            {step === "time" && booking.date && (
              <motion.div
                key="time"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <TimeSlots
                  date={booking.date}
                  selectedTime={booking.time}
                  onSelectTime={(time) => {
                    setBooking((b) => ({ ...b, time }));
                    setStep("details");
                  }}
                  onBack={() => setStep("date")}
                />
              </motion.div>
            )}

            {step === "details" && booking.date && booking.time && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <BookingForm
                  date={booking.date}
                  time={booking.time}
                  formData={{ name: booking.name, email: booking.email, phone: booking.phone, notes: booking.notes }}
                  onFormChange={(fields) => setBooking((b) => ({ ...b, ...fields }))}
                  onBack={() => setStep("time")}
                  onSuccess={(bookingId) => {
                    setCreatedBookingId(bookingId);
                    setStep("success");
                  }}
                />
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <BookingSuccess
                  name={booking.name}
                  email={booking.email}
                  date={booking.date!}
                  time={booking.time!}
                  bookingId={createdBookingId}
                  onReset={() => {
                    setBooking({ date: null, time: null, name: "", email: "", phone: "", notes: "" });
                    setStep("date");
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
