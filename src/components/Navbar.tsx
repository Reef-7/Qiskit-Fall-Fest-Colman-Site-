"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Agenda", href: "#agenda" },
    { label: "Workshops", href: "#workshops" },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();
    const logoScale = useTransform(scrollY, [0, 120], [1, 0.9]);

    useEffect(() => {
        const unsub = scrollY.on("change", (v) => setScrolled(v > 50));
        return unsub;
    }, [scrollY]);

    const navBarHeight = scrolled
        ? "h-[4.5rem] sm:h-20 md:h-28"
        : "h-[5.5rem] sm:h-28 md:h-36 lg:h-52 xl:h-[260px]";

    const logoHeight = scrolled
        ? "h-10 sm:h-12 md:h-14"
        : "h-12 sm:h-16 md:h-24 lg:h-36 xl:h-60";

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50"
            style={{
                background: scrolled ? "rgba(7,7,26,0.95)" : "rgba(255,255,255,0.18)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: scrolled
                    ? "1px solid rgba(139,92,246,0.35)"
                    : "1px solid rgba(255,255,255,0.25)",
                boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5)" : "none",
                transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s",
            }}
        >
            <div
                className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center transition-[height] duration-300 ease-out ${navBarHeight}`}
            >
                {/* Logo — large, prominent */}
                <motion.a href="https://www.colman.ac.il" target="_blank" rel="noopener noreferrer" style={{ scale: logoScale }} className="flex items-center shrink-0 mr-3 sm:mr-8 lg:mr-16 min-w-0">
                    <Image
                        src="/colman-logo.jpg"
                        alt="College of Management"
                        width={320}
                        height={92}
                        className={`object-contain rounded w-auto max-w-[min(100%,280px)] transition-all duration-300 ${logoHeight}`}
                        priority
                    />
                </motion.a>

                {/* Desktop nav — centered in remaining space */}
                <nav className="hidden md:flex items-center justify-center flex-1 gap-3">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={`relative px-5 lg:px-8 py-3 lg:py-4 text-base lg:text-xl font-black tracking-wide
                transition-colors duration-200 group
                ${scrolled ? "text-slate-100 hover:text-white" : "text-slate-900 hover:text-slate-700"}`}
                        >
                            {link.label}
                            {/* Neon underline slide-in */}
                            <span
                                className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0 rounded-full
                  bg-gradient-to-r from-violet-500 to-teal-400
                  group-hover:w-4/5 transition-all duration-300"
                            />
                        </a>
                    ))}
                </nav>

                {/* Qiskit Fall Fest logo — right side */}
                <motion.div style={{ scale: logoScale }} className="hidden md:flex items-center shrink-0 ml-3 sm:ml-6 lg:ml-10 min-w-0">
                    <Image
                        src="/Qiskit Fall Fest 2026 Black.png"
                        alt="Qiskit Fall Fest 2026"
                        width={320}
                        height={92}
                        className={`object-contain rounded w-auto max-w-[min(100%,280px)] transition-all duration-300 ${logoHeight}`}
                        priority
                    />
                </motion.div>

                {/* CTA — right */}
                <div className="hidden md:flex items-center ml-3 sm:ml-6 lg:ml-8">
                    <a
                        href="#register"
                        className="px-6 lg:px-10 py-3 lg:py-4 rounded-full text-base lg:text-xl font-black text-white
              bg-gradient-to-r from-violet-600 to-teal-500
              hover:from-violet-500 hover:to-teal-400
              shadow-lg hover:shadow-violet-500/50
              transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        Register Free
                    </a>
                </div>

                {/* Mobile toggle */}
                <button
                    className={`md:hidden ml-auto p-2 rounded-lg transition-colors
            ${scrolled ? "text-white" : "text-slate-800"}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile drawer */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden px-6 pb-6 pt-2 bg-[#07071a]/97 border-t border-violet-500/20"
                >
                    {[...navLinks, { label: "Register", href: "#register" }].map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center px-3 py-5 text-slate-100 hover:text-violet-400
                transition-colors text-lg font-bold border-b border-white/5 last:border-0"
                        >
                            {link.label}
                        </a>
                    ))}
                </motion.div>
            )}
        </motion.header>
    );
}
