"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar as CalendarIcon, Clock, CheckCircle2, ChevronLeft,
  ChevronRight, Plus, Loader2, X, User, Mail, Phone, Download
} from "lucide-react";
import Link from "next/link";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function AppointmentsPage() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const [form, setForm] = useState({ patientName: "", email: "", phone: "", date: "", time: "09:00", type: "General Consultation" });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/dashboard");
        const json = await res.json();
        setAppointments(json.appointments || []);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    if (session) fetchAppointments();
  }, [session]);

  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDay = new Date(calYear, calMonth, 1).getDay();

  const handleExport = () => {
    const csv = ["Patient,Date,Time,Type,Status", ...appointments.map((a: any) => `"${a.patient?.name}","${a.date}","${a.time}","${a.type}","${a.status}"`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "arcline-schedule.csv"; a.click();
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // POST to your booking API
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: `${calYear}-${String(calMonth+1).padStart(2,"0")}-${String(selectedDay).padStart(2,"0")}` }),
      });
      setSuccess(true);
      setTimeout(() => { setShowModal(false); setSuccess(false); }, 2000);
    } catch (e) { console.error(e); }
    finally { setSubmitting(false); }
  };

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-[#0066cc]" size={40} /></div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Appointments</h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium">Manage your clinical schedule.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 bg-white text-slate-600 border border-slate-200 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all w-full sm:w-auto"
          >
            <Download size={16} /> Export Schedule
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-[#0066cc] text-white px-5 py-3 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 w-full sm:w-auto"
          >
            <Plus size={18} /> New Appointment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Interactive Calendar */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl sm:rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">{MONTHS[calMonth]} {calYear}</h3>
            <div className="flex gap-1">
              <button onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); }} className="p-1.5 sm:p-2 rounded-full hover:bg-slate-100 transition-colors"><ChevronLeft size={16} /></button>
              <button onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); }} className="p-1.5 sm:p-2 rounded-full hover:bg-slate-100 transition-colors"><ChevronRight size={16} /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center mb-3">
            {DAYS.map(d => <span key={d} className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{d[0]}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
              const isSelected = day === selectedDay;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all ${isSelected ? "bg-[#0066cc] text-white shadow-md" : isToday ? "bg-blue-50 text-[#0066cc]" : "text-slate-600 hover:bg-slate-50"}`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="font-bold text-slate-900">
            {selectedDay === today.getDate() && calMonth === today.getMonth() ? "Today's" : `${MONTHS[calMonth]} ${selectedDay}`} Schedule
          </h3>
          <div className="space-y-4">
            {appointments.length > 0 ? appointments.map((appt: any, i: number) => (
              <motion.div
                key={appt.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-md transition-all group gap-4"
              >
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-[#151515] shrink-0">
                    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-slate-400">{MONTHS[calMonth].slice(0,3).toUpperCase()}</span>
                    <span className="text-lg sm:text-xl font-bold">{selectedDay}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-base sm:text-lg font-bold text-slate-900 truncate">{appt.patient?.name || "Unknown Patient"}</p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-bold text-slate-500 mt-1">
                      <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#0066cc]" />{appt.time}</span>
                      <span className="flex items-center gap-1.5"><CalendarIcon size={12} className="text-[#0066cc]" />{appt.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl border border-green-100 self-start sm:self-center">
                  <CheckCircle2 size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{appt.status}</span>
                </div>
              </motion.div>
            )) : (
              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-16 text-center">
                <CalendarIcon size={36} className="text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-bold">No appointments scheduled.</p>
                <p className="text-slate-400 text-sm font-medium mt-1">Click "New Appointment" to add one manually.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Appointment Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={() => setShowModal(false)}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">New Appointment</h2>
                  <p className="text-sm text-slate-400 font-medium mt-0.5">Add a manual appointment to the schedule.</p>
                </div>
                <button onClick={() => setShowModal(false)} className="w-9 h-9 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center transition-colors">
                  <X size={16} className="text-slate-500" />
                </button>
              </div>

              {success ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} className="text-green-500" />
                  </div>
                  <p className="font-bold text-slate-900">Appointment Booked!</p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  {[
                    { label: "Patient Name", key: "patientName", placeholder: "Dr. Jane Doe", icon: User },
                    { label: "Email", key: "email", placeholder: "patient@email.com", icon: Mail },
                    { label: "Phone", key: "phone", placeholder: "+61 400 000 000", icon: Phone },
                  ].map(field => (
                    <div key={field.key} className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{field.label}</label>
                      <div className="relative">
                        <field.icon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          required
                          value={(form as any)[field.key]}
                          onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                          placeholder={field.placeholder}
                          className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 text-sm font-medium outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc]/10 transition-all"
                        />
                      </div>
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Time</label>
                      <input type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                        className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl px-4 text-sm font-bold outline-none focus:border-[#0066cc] transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Type</label>
                      <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                        className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl px-4 text-sm font-bold outline-none focus:border-[#0066cc] transition-all appearance-none">
                        <option>General Consultation</option>
                        <option>Follow-up</option>
                        <option>Telehealth</option>
                        <option>Emergency</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" disabled={submitting}
                    className="w-full h-13 h-[52px] bg-[#0066cc] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 mt-2 disabled:opacity-70">
                    {submitting ? <Loader2 size={18} className="animate-spin" /> : <><Plus size={16} /> Book Appointment</>}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
