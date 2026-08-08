"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="relative bg-[#05051a] border-t border-white/5 py-24 overflow-hidden">
            <div className="absolute inset-0 quantum-grid opacity-30" />
            <div className="relative z-10 w-full max-w-6xl px-4 sm:px-6 flex flex-col items-center gap-8"
                style={{ margin: "0 auto" }}>

                {/* Divider */}
                <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Copyright */}
                <div className="flex flex-col items-center gap-2">
                    <a
                        href="https://www.colman.ac.il"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 text-sm hover:text-violet-400 transition-colors duration-200"
                    >
                        © 2026 The College of Management · Qiskit Fall Fest
                    </a>
                    <p className="text-slate-600 text-sm">
                        Made with ⚛ and quantum entanglement
                    </p>
                </div>
            </div>

            {/* Bottom gradient line */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(20,184,166,0.5), transparent)",
                }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
        </footer>
    );
}
