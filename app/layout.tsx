import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit" 
});

export const metadata: Metadata = {
  title: "Arcline AI | The Digital Physician’s Atelier",
  description: "Arcline is the intelligent AI receptionist that books, reschedules, and answers patient queries 24/7.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-outfit bg-surface text-on-surface selection:bg-secondary-container selection:text-on-secondary-container min-h-screen antialiased`}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
