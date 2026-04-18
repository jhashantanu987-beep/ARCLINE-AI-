"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Phone, 
  Settings, 
  LogOut, 
  Zap, 
  Bell,
  Search,
  Menu,
  X
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
    { name: "Patients", href: "/dashboard/patients", icon: Users },
    { name: "Call Logs", href: "/dashboard/calls", icon: Phone },
    { name: "AI Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#151515] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-8 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-32 h-8 sm:w-40 sm:h-10">
                <Image 
                  src="/logo.png" 
                  alt="Arcline" 
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <button 
              className="lg:hidden p-2 -mr-2 text-slate-400 hover:text-white transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive 
                      ? "bg-[#0066cc] text-white shadow-lg shadow-blue-500/20" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Profile / Logout */}
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 px-4 py-3 mb-2">
               <div className="w-10 h-10 rounded-full bg-[#0066cc]/20 flex items-center justify-center text-[#0066cc] font-bold">
                  {session?.user?.name?.[0] || "U"}
               </div>
               <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{session?.user?.name}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Administrator</p>
               </div>
            </div>
            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-400/10 transition-all"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`lg:pl-72 transition-all duration-300 min-h-screen flex flex-col`}>
        {/* Header */}
        <header className="h-16 sm:h-20 bg-white border-b border-slate-200 sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between">
          <button className="lg:hidden p-2 -ml-2 hover:bg-slate-50 rounded-lg transition-colors" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
             <Menu size={20} className="text-slate-600" />
          </button>

          <div className="flex-1 max-w-xl hidden md:block px-4">
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0066cc] transition-colors" size={18} />
               <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 outline-none focus:bg-white focus:border-[#0066cc] transition-all text-sm font-medium"
               />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
             <button 
                onClick={() => alert("Demo Notification: Your AI Receptionist successfully handled 12 calls today! ✅")}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors relative"
             >
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>
             <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-slate-900 truncate max-w-[120px]">{session?.user?.name}</p>
                <p className="text-[10px] text-slate-400 font-bold tracking-tight">Pro Plan</p>
             </div>
             {/* Mobile User Avatar */}
             <div className="sm:hidden w-8 h-8 rounded-full bg-[#0066cc]/10 flex items-center justify-center text-[#0066cc] text-xs font-bold">
                {session?.user?.name?.[0] || "U"}
             </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-4 sm:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
