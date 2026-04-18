"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Users, Search, Filter, MoreHorizontal, Mail, Phone, Loader2, Plus, X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PatientsPage() {
  const { data: session } = useSession();
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch("/api/dashboard");
        const json = await res.json();
        setPatients(json.patients || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (session) fetchPatients();
  }, [session]);

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      // In a real app, this would be a POST request to add the patient to the DB
      const newPatient = {
        id: Date.now().toString(),
        name: form.name,
        email: form.email,
        phone: form.phone,
        status: "active",
        createdAt: new Date().toISOString()
      };
      setPatients([newPatient, ...patients]);
      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        setForm({ name: "", email: "", phone: "" });
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-[#0066cc]" size={40} /></div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
           <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Patients</h1>
           <p className="text-sm sm:text-base text-slate-500 font-medium">Manage your clinic's patient records.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#0066cc] text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
        >
           <Plus size={18} /> Add New Patient
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
         <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0066cc]" size={18} />
            <input type="text" placeholder="Search by name, email, or phone..." className="w-full h-12 bg-white border border-slate-200 rounded-2xl pl-12 pr-4 outline-none focus:border-[#0066cc] transition-all font-medium" />
         </div>
         <button className="h-12 px-6 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
            <Filter size={18} /> Filters
         </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
           <table className="w-full text-left min-w-[800px]">
              <thead>
                 <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Joined</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                 </tr>
              </thead>
            <tbody className="divide-y divide-slate-50">
               {patients.length > 0 ? patients.map((patient, i) => (
                  <motion.tr 
                    key={patient.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                     <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#151515] font-bold">
                              {patient.name[0]}
                           </div>
                           <p className="text-sm font-bold text-slate-900">{patient.name}</p>
                        </div>
                     </td>
                     <td className="px-8 py-5">
                        <div className="space-y-1">
                           <div className="flex items-center gap-2 text-xs text-slate-500 font-medium italic"><Mail size={12} /> {patient.email}</div>
                           <div className="flex items-center gap-2 text-xs text-slate-500 font-medium italic"><Phone size={12} /> {patient.phone}</div>
                        </div>
                     </td>
                     <td className="px-8 py-5">
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-600 border border-green-100 uppercase tracking-widest">{patient.status}</span>
                     </td>
                     <td className="px-8 py-5">
                        <p className="text-sm text-slate-600 font-medium">{new Date(patient.createdAt).toLocaleDateString()}</p>
                     </td>
                     <td className="px-8 py-5 text-right">
                        <button className="text-slate-400 hover:text-slate-600 transition-colors"><MoreHorizontal size={20} /></button>
                     </td>
                  </motion.tr>
               )) : (
                 <tr>
                   <td colSpan={5} className="px-8 py-12 text-center text-slate-400 font-bold">
                     No patients found. Click "Add New Patient" to get started.
                   </td>
                 </tr>
               )}
            </tbody>
         </table>
      </div>
      </div>

      {/* Add Patient Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={() => setShowModal(false)}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white w-full max-w-md rounded-3xl sm:rounded-[2.5rem] shadow-2xl p-6 sm:p-8"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Add New Patient</h2>
                  <p className="text-sm text-slate-400 font-medium mt-0.5">Enter details to create a new patient record.</p>
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
                  <p className="font-bold text-slate-900">Patient Added Successfully!</p>
                </div>
              ) : (
                <form onSubmit={handleAddPatient} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl px-4 text-sm font-medium outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc]/10 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl px-4 text-sm font-medium outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc]/10 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="+61 400 000 000"
                      className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl px-4 text-sm font-medium outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc]/10 transition-all"
                    />
                  </div>
                  
                  <button type="submit" disabled={submitting}
                    className="w-full h-[52px] bg-[#0066cc] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 mt-4 disabled:opacity-70">
                    {submitting ? <Loader2 size={18} className="animate-spin" /> : <><Plus size={16} /> Save Patient</>}
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
