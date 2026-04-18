"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  blur?: boolean;
}

export const ScrollReveal = ({ 
  children, 
  width = "100%", 
  delay = 0.2, 
  direction = "up",
  blur = true
}: ScrollRevealProps) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <div style={{ position: "relative", width, overflow: "visible" }}>
      <motion.div
        variants={{
          hidden: { 
            opacity: 0, 
            ...directions[direction],
            filter: blur ? "blur(12px)" : "blur(0px)",
            scale: 0.95
          },
          visible: { 
            opacity: 1, 
            x: 0, 
            y: 0, 
            filter: "blur(0px)",
            scale: 1
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 1.2, 
          delay, 
          ease: [0.22, 1, 0.36, 1] // Smooth quintic ease
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
