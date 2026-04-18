"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Clock, CheckCircle2, XCircle, ChevronDown,
  Loader2, Search, Filter, Download, Zap, AlertCircle, Play, Database
} from "lucide-react";

const outcomeConfig: Record<string, { color: string; bg: string; icon: any }> = {
  Booked: { color: "text-green-600", bg: "bg-green-50 border-green-100", icon: CheckCircle2 },
  Transferred: { color: "text-blue-600", bg: "bg-blue-50 border-blue-100", icon: Zap },
  Missed: { color: "text-red-500", bg: "bg-red-50 border-red-100", icon: XCircle },
  FAQ: { color: "text-slate-600", bg: "bg-slate-50 border-slate-200", icon: AlertCircle },
};

export default function CallLogsPage() {
  const { data: session } = useSession();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("/api/dashboard");
        const json = await res.json();
        setLogs(json.calls || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (session) fetchLogs();
  }, [session]);

  const filters = ["All", "Booked", "Transferred", "Missed", "FAQ"];
  
  const filtered = logs.filter(log => {
    const callerName = log.patient?.name || "Unknown";
    const phone = log.patient?.phone || "";
    const matchFilter = filter === "All" || log.outcome === filter;
    const matchSearch = callerName.toLowerCase().includes(search.toLowerCase()) || phone.includes(search);
    return matchFilter && matchSearch;
  });

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-[#0066cc]" size={40} /></div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Call Logs</h1>
          <p className="text-slate-500 font-medium">Every patient interaction handled by your AI receptionist.</p>
        </div>
        <button
          onClick={() => {
            const csv = ["Caller,Phone,Duration,Type,Outcome,Time,Summary", ...filtered.map(l => `"${l.patient?.name || 'Unknown'}","${l.patient?.phone || ''}","${l.duration}","${l.type}","${l.outcome}","${new Date(l.createdAt).toLocaleString()}","${l.summary || ''}"`)].join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a"); a.href = url; a.download = "arcline-call-logs.csv"; a.click();
          }}
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Calls", value: logs.length, color: "text-slate-900" },
          { label: "Booked", value: logs.filter(l => l.outcome === "Booked").length, color: "text-green-600" },
          { label: "Transferred", value: logs.filter(l => l.outcome === "Transferred").length, color: "text-blue-600" },
          { label: "Missed", value: logs.filter(l => l.outcome === "Missed").length, color: "text-red-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by caller name or phone..."
            className="w-full h-12 bg-white border border-slate-200 rounded-2xl pl-11 pr-4 text-sm font-medium outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc]/10 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`h-12 px-5 rounded-2xl font-bold text-sm transition-all ${filter === f ? "bg-[#0066cc] text-white shadow-lg shadow-blue-500/20" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Call Log List */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center p-16 text-center">
            <div className="w-20 h-20 rounded-full bg-blue-50 text-[#0066cc] flex items-center justify-center mb-6">
              <Database size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No calls found</h3>
            <p className="text-slate-500 font-medium mt-2 max-w-sm">
              {logs.length === 0 
                ? "Your clinic hasn't received any calls through the AI receptionist yet. When calls come in, they will appear here in real-time."
                : "No calls match your current search filters."}
            </p>
          </div>
        )}
        
        {filtered.map((log, i) => {
          const cfg = outcomeConfig[log.outcome] || outcomeConfig["FAQ"];
          const Icon = cfg.icon;
          const isOpen = expanded === log.id;
          const callerName = log.patient?.name || "Unknown";
          
          return (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setExpanded(isOpen ? null : log.id)}
                className="w-full flex items-center gap-3 sm:gap-5 p-4 sm:p-6 text-left hover:bg-slate-50/50 transition-colors group"
              >
                {/* Avatar */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-base sm:text-lg shrink-0">
                  {callerName[0]}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 truncate">{callerName}</p>
                  <p className="text-xs text-slate-400 font-medium truncate">
                    {log.patient?.phone || "No phone"} · {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {/* Duration */}
                <div className="hidden md:flex items-center gap-1.5 text-slate-500 font-bold text-sm">
                  <Clock size={14} className="text-[#0066cc]" />
                  {log.duration || "0:00"}
                </div>

                {/* Outcome badge */}
                <div className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border text-[10px] sm:text-xs font-bold ${cfg.bg} ${cfg.color} shrink-0 whitespace-nowrap`}>
                  <Icon size={12} className="sm:w-[13px] sm:h-[13px]" />
                  {log.outcome || "Unknown"}
                </div>

                {/* Expand chevron */}
                <ChevronDown size={14} className={`text-slate-400 transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0 border-t border-slate-50">
                      <div className="bg-slate-50 rounded-2xl p-5 mt-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">AI Call Summary</p>
                        <p className="text-sm font-medium text-slate-700 leading-relaxed">
                          {log.summary || "No summary available for this call."}
                        </p>
                      </div>
                      <div className="flex gap-3 mt-4">
                        <button className="flex items-center gap-2 h-9 px-4 bg-[#0066cc]/10 text-[#0066cc] rounded-xl font-bold text-xs hover:bg-[#0066cc]/20 transition-colors">
                          <Play size={12} /> Play Recording
                        </button>
                        <button className="flex items-center gap-2 h-9 px-4 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-200 transition-colors">
                          View Patient
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
