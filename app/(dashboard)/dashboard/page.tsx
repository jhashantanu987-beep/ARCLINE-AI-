"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  Phone, 
  Calendar, 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  Zap,
  CheckCircle2,
  Loader2,
  PlusCircle,
  Database
} from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
  const { data: session } = useSession();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch(`/api/dashboard?t=${Date.now()}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchDashboardData();
    }
  }, [session]);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#0066cc]" size={40} />
      </div>
    );
  }

  const hasData = (data?._count?.patients > 0) || (data?._count?.appointments > 0) || (data?._count?.calls > 0);

  const stats = [
    { name: "Total Patients", value: data?._count?.patients || 0, change: "+0%", trend: "neutral", icon: Users, color: "blue" },
    { name: "Appts Booked", value: data?._count?.appointments || 0, change: "+0%", trend: "neutral", icon: Calendar, color: "green" },
    { name: "Total Calls", value: data?._count?.calls || 0, change: "+0%", trend: "neutral", icon: Phone, color: "purple" },
    { name: "Estimated ROI", value: `$${(data?._count?.appointments || 0) * 150}`, change: "+0%", trend: "neutral", icon: TrendingUp, color: "orange" },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome, {session?.user?.name?.split(' ')[0]}!</h1>
          <p className="text-slate-500 font-medium">
            {hasData 
              ? "Your AI receptionist is actively managing your clinic." 
              : "Let's get your AI receptionist set up and ready to work."}
          </p>
        </div>
        {!hasData && (
          <Link 
            href="/dashboard/settings"
            className="bg-[#0066cc] text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
          >
            <PlusCircle size={18} /> Complete Setup
          </Link>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${stat.color}-50 text-${stat.color}-600`}>
                <stat.icon size={24} />
              </div>
              <div className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md uppercase tracking-widest">
                Real-Time
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.name}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Activity / Zero State */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
            {hasData && <Link href="/dashboard/calls" className="text-sm font-bold text-[#0066cc] hover:underline">View logs</Link>}
          </div>
          
          <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-center text-center">
            {hasData ? (
               <div className="w-full overflow-x-auto">
                 <table className="w-full text-left min-w-[600px]">
                    <thead>
                       <tr className="bg-slate-50/50 border-b border-slate-100">
                          <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Patient</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Outcome</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Time</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {data.calls.map((call: any) => (
                          <tr key={call.id} className="hover:bg-slate-50/50 transition-colors group">
                             <td className="px-6 py-5">
                                <p className="text-sm font-bold text-slate-900">{call.patient?.name || "Unknown"}</p>
                                <p className="text-xs text-slate-500 font-medium">Inbound Call</p>
                             </td>
                             <td className="px-6 py-5">
                                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">{call.type}</span>
                             </td>
                             <td className="px-6 py-5">
                                <div className="flex items-center gap-2">
                                   <CheckCircle2 size={14} className="text-green-500" />
                                   <span className="text-sm font-bold text-slate-700 whitespace-nowrap">{call.outcome}</span>
                                </div>
                             </td>
                             <td className="px-6 py-5 text-right">
                                <p className="text-sm font-bold text-slate-900">{call.duration}</p>
                                <p className="text-[10px] text-slate-400 font-bold">Duration</p>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
               </div>
            ) : (
              <div className="space-y-6 max-w-sm px-6">
                 <div className="w-20 h-20 rounded-full bg-blue-50 text-[#0066cc] flex items-center justify-center mx-auto">
                    <Database size={32} />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-slate-900">No data available yet</h3>
                    <p className="text-slate-500 font-medium mt-2">Connect your Practice Management Software to see live patient data and call logs here.</p>
                 </div>
                 <button 
                  onClick={() => setShowIntegrationModal(true)}
                  className="w-full h-14 bg-[#151515] text-white rounded-2xl font-bold hover:bg-black transition-all"
                >
                    Connect Cliniko / Halaxy
                 </button>
              </div>
            )}
          </div>
        </div>

        {/* System Health Widget */}
        <div className="lg:col-span-4 space-y-6">
           <h2 className="text-xl font-bold text-slate-900">AI Monitor</h2>
           <div className="bg-[#151515] text-white p-6 sm:p-8 rounded-3xl sm:rounded-[2.5rem] shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                 <Zap size={80} fill="white" />
              </div>
              <div className="relative z-10 space-y-6">
                 <div>
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-2">Live Status</p>
                    <div className="flex items-center gap-3">
                       <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                       <h3 className="text-2xl font-bold">Engine Active</h3>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-400">Response Accuracy</span>
                          <span>{hasData ? "99.2%" : "---"}</span>
                       </div>
                       <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: hasData ? "99.2%" : "0%" }} className="h-full bg-[#0066cc]" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-400">Uptime</span>
                          <span>100%</span>
                       </div>
                       <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} className="h-full bg-[#0066cc]" />
                       </div>
                    </div>
                 </div>
                 <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-sm font-bold transition-all">
                    View System Logs
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Integration Modal */}
      {showIntegrationModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowIntegrationModal(false)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-8 sm:p-10 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6">
              <button onClick={() => setShowIntegrationModal(false)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                 <PlusCircle size={20} className="rotate-45" />
              </button>
            </div>
            
            <div className="text-center mb-10">
               <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Zap size={40} className="text-[#0066cc]" />
               </div>
               <h2 className="text-2xl font-bold text-slate-900 mb-2">Connect Your Software</h2>
               <p className="text-slate-500 font-medium">Sync Arcline AI with your existing Practice Management Software to automate your front desk.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
               {[
                 { name: "Cliniko", logo: "CK" },
                 { name: "Halaxy", logo: "HX" },
                 { name: "Nookal", logo: "NK" },
                 { name: "Best Practice", logo: "BP" }
               ].map(p => (
                 <div key={p.name} className="p-6 border border-slate-100 rounded-3xl hover:border-[#0066cc] hover:bg-blue-50/30 transition-all cursor-pointer group text-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3 font-bold text-slate-400 group-hover:bg-[#0066cc] group-hover:text-white transition-all">
                       {p.logo}
                    </div>
                    <p className="font-bold text-slate-900">{p.name}</p>
                 </div>
               ))}
            </div>

            <button className="w-full h-14 bg-[#0066cc] text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
               Request Custom Integration
            </button>
            <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6">Enterprise API access included in Pro Plan</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
