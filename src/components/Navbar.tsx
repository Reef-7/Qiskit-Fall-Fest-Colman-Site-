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
        ? "h-24 sm:h-28"
        : "h-28 sm:h-32 md:h-36";

    const logoHeight = scrolled
        ? "h-[5.25rem] sm:h-24"
        : "h-24 sm:h-[6.75rem] md:h-[7.5rem]";

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
                className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4 transition-[height] duration-300 ease-out ${navBarHeight}`}
            >
                {/* College logo — left */}
                <motion.a
                    href="https://www.colman.ac.il"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ scale: logoScale }}
                    className="flex items-center justify-start shrink-0 min-w-0"
                >
                    <Image
                        src="/colman-logo.jpg"
                        alt="College of Management"
                        width={600}
                        height={174}
                        className={`object-contain rounded w-auto max-w-[360px] sm:max-w-[420px] md:max-w-[480px] transition-all duration-300 ${logoHeight}`}
                        priority
                    />
                </motion.a>

                {/* Desktop nav — centered */}
                <nav className="hidden md:flex items-center justify-center gap-1 lg:gap-2">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={`relative px-4 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base font-black tracking-wide
                transition-colors duration-200 group
                ${scrolled ? "text-slate-100 hover:text-white" : "text-slate-900 hover:text-slate-700"}`}
                        >
                            {link.label}
                            <span
                                className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-0 rounded-full
                  bg-gradient-to-r from-violet-500 to-teal-400
                  group-hover:w-4/5 transition-all duration-300"
                            />
                        </a>
                    ))}
                </nav>

                {/* Qiskit logo + CTA — right */}
                <div className="hidden md:flex items-center justify-end gap-3 lg:gap-4 min-w-0">
                    <motion.div style={{ scale: logoScale }} className="flex items-center shrink-0 min-w-0">
                        <Image
                            src="/Qiskit Fall Fest 2026 Black.png"
                            alt="Qiskit Fall Fest 2026"
                            width={600}
                            height={174}
                            className={`object-contain rounded w-auto max-w-[360px] sm:max-w-[420px] md:max-w-[480px] transition-all duration-300 ${logoHeight}`}
                            priority
                        />
                    </motion.div>
                    <a
                        href="#register"
                        className="shrink-0 px-5 lg:px-7 py-2.5 lg:py-3 rounded-full text-sm lg:text-base font-black text-white
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
                    className={`md:hidden col-start-3 justify-self-end p-2 rounded-lg transition-colors
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
