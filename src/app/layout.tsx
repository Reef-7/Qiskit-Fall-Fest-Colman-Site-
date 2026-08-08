import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qiskit Fall Fest 2026 | The College of Management",
  description:
    "Join us for Qiskit Fall Fest 2026 — a quantum computing event hosted by The College of Management. Workshops, speakers, and hands-on labs.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
