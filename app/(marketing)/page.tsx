"use client";

import { motion } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { TabbedExplainer } from "@/components/sections/TabbedExplainer";
import { Setup } from "@/components/sections/Setup";
import { Outbound } from "@/components/sections/Outbound";
import { InteractiveCalendar } from "@/components/sections/Calendar";
import { Features } from "@/components/sections/Features";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

const sectionVariants = {
  hidden: { opacity: 0, filter: "blur(20px)" },
  visible: { opacity: 1, filter: "blur(0px)" },
};

export default function MarketingPage() {
  return (
    <main className="relative bg-white selection:bg-blue-600 selection:text-white">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 bg-mesh pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-noise pointer-events-none z-10 opacity-[0.03]"></div>
      
      <div className="relative z-20">
        <div id="hero"><Hero /></div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} transition={{ duration: 0.8 }} variants={sectionVariants} id="stats"><Stats /></motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} transition={{ duration: 0.8 }} variants={sectionVariants} id="how-it-works"><TabbedExplainer /></motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} transition={{ duration: 0.8 }} variants={sectionVariants} id="setup"><Setup /></motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} transition={{ duration: 0.8 }} variants={sectionVariants} id="outbound"><Outbound /></motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} transition={{ duration: 0.8 }} variants={sectionVariants} id="calendar"><InteractiveCalendar /></motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} transition={{ duration: 0.8 }} variants={sectionVariants} id="features"><Features /></motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} transition={{ duration: 0.8 }} variants={sectionVariants} id="testimonials"><Testimonials /></motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} transition={{ duration: 0.8 }} variants={sectionVariants} id="faq"><FAQ /></motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} transition={{ duration: 0.8 }} variants={sectionVariants} id="contact"><Contact /></motion.div>
        
        <Footer />
      </div>
    </main>
  );
}
