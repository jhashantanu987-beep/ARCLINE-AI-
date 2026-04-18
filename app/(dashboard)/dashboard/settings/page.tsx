"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings, Bot, Phone, Globe, Bell, Shield, Save,
  Check, ChevronRight, Zap, Volume2, Languages, Clock, Play, Square
} from "lucide-react";

const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${enabled ? "bg-[#0066cc]" : "bg-slate-200"}`}
  >
    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${enabled ? "translate-x-7" : "translate-x-1"}`} />
  </button>
);

export default function AISettingsPage() {
  const { data: session } = useSession();
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("voice");
  const [isPlaying, setIsPlaying] = useState(false);

  const [settings, setSettings] = useState({
    // Voice
    receptionistName: "Arcline",
    voiceAccent: "en-AU",
    voiceSpeed: "normal",
    voiceTone: "professional",
    // Behaviour
    afterHours: true,
    overflowOnly: false,
    autoSMS: true,
    transferUnknown: true,
    // Notifications
    emailOnBook: true,
    emailOnMissed: true,
    dailyDigest: false,
    // Security
    hipaaMode: true,
    callRecording: true,
    dataRetention: "90",
  });

  // Ensure voices are loaded for speech synthesis
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const update = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const stopPreview = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const playPreview = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isPlaying) {
      stopPreview();
      return;
    }

    setIsPlaying(true);
    
    // Stop any existing speech
    window.speechSynthesis.cancel();

    let text = `Hello. I am ${settings.receptionistName}, your AI receptionist. I am ready to handle your incoming patient calls.`;
    
    if (settings.voiceTone === "friendly") {
      text = `Hi there! I'm ${settings.receptionistName}! I'm so excited to help your patients book their appointments today.`;
    } else if (settings.voiceTone === "clinical") {
      text = `This is ${settings.receptionistName}, the automated receptionist. Please state the nature of your medical inquiry.`;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Speed
    if (settings.voiceSpeed === "slow") utterance.rate = 0.8;
    else if (settings.voiceSpeed === "fast") utterance.rate = 1.3;
    else utterance.rate = 1.0;

    // Pitch (slight variation based on tone)
    if (settings.voiceTone === "friendly") utterance.pitch = 1.2;
    if (settings.voiceTone === "clinical") utterance.pitch = 0.9;

    // Accent
    const voices = window.speechSynthesis.getVoices();
    // Try to find a voice that matches the selected accent language code
    const matchingVoice = voices.find(v => v.lang.includes(settings.voiceAccent) || v.lang.replace('-','_').includes(settings.voiceAccent));
    
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    } else {
      // Fallback to explicitly set lang
      utterance.lang = settings.voiceAccent;
    }

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = (e) => {
      console.error("Speech synthesis error", e);
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Clean up speech when leaving component
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const tabs = [
    { id: "voice", label: "Voice & Personality", icon: Volume2 },
    { id: "behaviour", label: "AI Behaviour", icon: Bot },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security & Privacy", icon: Shield },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">AI Settings</h1>
          <p className="text-slate-500 font-medium">Configure how your Arcline AI receptionist behaves.</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg ${
            saved ? "bg-green-500 text-white shadow-green-500/20" : "bg-[#0066cc] text-white shadow-blue-500/20 hover:bg-blue-700"
          }`}
        >
          {saved ? <><Check size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      {/* Status Banner */}
      <div className="bg-[#151515] text-white p-6 rounded-[2rem] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
            <Zap size={22} className="text-green-400" />
          </div>
          <div>
            <p className="font-bold">AI Engine is Active</p>
            <p className="text-slate-400 text-sm font-medium">Your receptionist is live and answering calls right now.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 font-bold text-xs uppercase tracking-widest">Live</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 h-11 px-5 rounded-2xl font-bold text-sm transition-all ${
              activeTab === tab.id ? "bg-[#0066cc] text-white shadow-lg shadow-blue-500/20" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <tab.icon size={15} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        
        {/* Voice & Personality */}
        {activeTab === "voice" && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 space-y-8">
              <h2 className="text-lg font-bold text-slate-900">Voice & Personality Settings</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Receptionist Name</label>
                  <input
                    value={settings.receptionistName}
                    onChange={e => update("receptionistName", e.target.value)}
                    className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl px-5 text-sm font-bold outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc]/10 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Voice Accent</label>
                  <select
                    value={settings.voiceAccent}
                    onChange={e => {
                      update("voiceAccent", e.target.value);
                      stopPreview(); // Stop playing if they change voice
                    }}
                    className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl px-5 text-sm font-bold outline-none focus:border-[#0066cc] transition-all appearance-none"
                  >
                    <option value="en-AU">AUS English</option>
                    <option value="en-GB">UK English</option>
                    <option value="en-US">US English</option>
                    <option value="en-IN">Indian English</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Speaking Speed</label>
                  <div className="flex gap-3">
                    {["slow", "normal", "fast"].map(speed => (
                      <button
                        key={speed}
                        onClick={() => { update("voiceSpeed", speed); stopPreview(); }}
                        className={`flex-1 h-11 rounded-2xl font-bold text-sm capitalize transition-all ${settings.voiceSpeed === speed ? "bg-[#0066cc] text-white" : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"}`}
                      >
                        {speed}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tone</label>
                  <div className="flex gap-3">
                    {["friendly", "professional", "clinical"].map(tone => (
                      <button
                        key={tone}
                        onClick={() => { update("voiceTone", tone); stopPreview(); }}
                        className={`flex-1 h-11 rounded-2xl font-bold text-sm capitalize transition-all ${settings.voiceTone === tone ? "bg-[#0066cc] text-white" : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"}`}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Voice Preview Card */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#151515] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-slate-200/50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0066cc]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                
                <h3 className="text-lg font-bold mb-2 relative z-10">Voice Preview</h3>
                <p className="text-sm text-slate-400 font-medium mb-8 relative z-10">Listen to how your AI receptionist sounds to patients.</p>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative z-10 flex flex-col items-center justify-center min-h-[160px] text-center space-y-6">
                  {isPlaying ? (
                    <>
                      <div className="flex items-center justify-center gap-1.5 h-8">
                        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ height: ["20%", "100%", "20%"] }}
                            transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                            className="w-1.5 bg-[#0066cc] rounded-full"
                          />
                        ))}
                      </div>
                      <p className="text-xs font-bold text-[#0066cc] uppercase tracking-widest animate-pulse">Playing audio...</p>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-[#0066cc] flex items-center justify-center shadow-lg shadow-[#0066cc]/30 mb-2">
                        <Volume2 size={28} className="text-white" />
                      </div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ready to play</p>
                    </>
                  )}
                </div>

                <button
                  onClick={playPreview}
                  className={`w-full mt-6 h-14 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all relative z-10 ${
                    isPlaying ? "bg-white/10 text-white hover:bg-white/20" : "bg-[#0066cc] hover:bg-blue-600 text-white"
                  }`}
                >
                  {isPlaying ? <><Square size={16} fill="currentColor" /> Stop Preview</> : <><Play size={18} fill="currentColor" /> Listen to AI Voice</>}
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
                <p className="text-[10px] font-bold text-[#0066cc] uppercase tracking-widest mb-2">Pro Tip</p>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  The <span className="font-bold">"Friendly"</span> tone is best for general practices, while <span className="font-bold">"Clinical"</span> is better suited for specialists and strict protocol environments.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* AI Behaviour */}
        {activeTab === "behaviour" && (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 space-y-8">
            <h2 className="text-lg font-bold text-slate-900">AI Call Handling Behaviour</h2>
            <div className="divide-y divide-slate-50 space-y-0">
              {[
                { key: "afterHours", icon: Clock, label: "After Hours Answering", sub: "AI automatically picks up calls outside business hours." },
                { key: "overflowOnly", icon: Phone, label: "Overflow Mode Only", sub: "AI only answers when all clinic lines are busy." },
                { key: "autoSMS", icon: Bell, label: "Automatic Follow-up SMS", sub: "Send an SMS summary to patients after every call." },
                { key: "transferUnknown", icon: ChevronRight, label: "Transfer Unknown Requests", sub: "Escalate to a human if the AI cannot resolve the query." },
              ].map(item => (
                <div key={item.key} className="flex items-start justify-between py-6 first:pt-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#0066cc]">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{item.label}</p>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                  <Toggle enabled={(settings as any)[item.key]} onChange={() => update(item.key, !(settings as any)[item.key])} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === "notifications" && (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 space-y-8">
            <h2 className="text-lg font-bold text-slate-900">Notification Preferences</h2>
            <div className="space-y-2 mb-6">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Notification Email</label>
              <input
                defaultValue={session?.user?.email || ""}
                className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl px-5 text-sm font-bold outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc]/10 transition-all"
              />
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { key: "emailOnBook", label: "Email on every booking", sub: "Receive an email every time the AI books a new appointment." },
                { key: "emailOnMissed", label: "Email on missed call", sub: "Be notified instantly when a call is dropped or missed." },
                { key: "dailyDigest", label: "Daily performance digest", sub: "Receive a morning summary of all calls from the previous day." },
              ].map(item => (
                <div key={item.key} className="flex items-start justify-between py-6 first:pt-0">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{item.label}</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">{item.sub}</p>
                  </div>
                  <Toggle enabled={(settings as any)[item.key]} onChange={() => update(item.key, !(settings as any)[item.key])} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security */}
        {activeTab === "security" && (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 space-y-8">
            <h2 className="text-lg font-bold text-slate-900">Security & Compliance</h2>
            <div className="divide-y divide-slate-50">
              {[
                { key: "hipaaMode", label: "HIPAA Compliance Mode", sub: "Enforce all HIPAA data handling rules across call sessions." },
                { key: "callRecording", label: "Call Recording", sub: "Record all AI-handled calls for quality assurance. Stored encrypted." },
              ].map(item => (
                <div key={item.key} className="flex items-start justify-between py-6 first:pt-0">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{item.label}</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">{item.sub}</p>
                  </div>
                  <Toggle enabled={(settings as any)[item.key]} onChange={() => update(item.key, !(settings as any)[item.key])} />
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Data Retention Period</label>
              <select
                value={settings.dataRetention}
                onChange={e => update("dataRetention", e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl px-5 text-sm font-bold outline-none focus:border-[#0066cc] transition-all appearance-none"
              >
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">1 year</option>
              </select>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
              <p className="text-xs font-bold text-amber-700">⚠️ Compliance Notice</p>
              <p className="text-xs text-amber-600 font-medium mt-1">All data is stored on encrypted, SOC 2-certified servers. Arcline never sells or shares patient data with third parties.</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
