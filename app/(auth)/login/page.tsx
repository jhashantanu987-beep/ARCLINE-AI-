"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, Mail, Lock, ArrowRight, Loader2, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden bg-white">
      {/* Premium Background */}
      <div className="fixed inset-0 bg-mesh opacity-40"></div>
      <div className="fixed inset-0 bg-noise opacity-[0.03]"></div>
      
      <div className="relative z-10 w-full max-w-[440px]">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="bg-white/70 backdrop-blur-3xl border border-white/40 rounded-[2.5rem] p-10 md:p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] relative"
        >
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 mb-10 group">
             <div className="relative w-40 h-10">
                <Image 
                  src="/logo.png" 
                  alt="Arcline" 
                  fill
                  className="object-contain"
                />
             </div>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Welcome back</h1>
            <p className="text-slate-500 font-medium">Log in to manage your clinic's AI.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0066cc] transition-colors" size={18} />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@clinic.com"
                  className="w-full h-14 bg-white border border-slate-200 rounded-2xl pl-12 pr-4 outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-slate-900 placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end mb-1">
                 <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                 <Link href="#" className="text-[10px] font-bold text-[#0066cc] uppercase tracking-widest hover:opacity-70 transition-opacity">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0066cc] transition-colors" size={18} />
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-14 bg-white border border-slate-200 rounded-2xl pl-12 pr-4 outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-slate-900 placeholder:text-slate-300"
                />
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-bold text-red-500 text-center">{error}</motion.p>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#0066cc] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#0066cc] font-bold hover:underline">Start free trial</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
