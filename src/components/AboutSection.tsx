"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const highlights = [
    { value: "Full Day", label: "Event Format", icon: "🗓" },
    { value: "Hands-On Lab", label: "Learning Style", icon: "⚗️" },
    { value: "Quantum Experts", label: "Featured Guests", icon: "🔬" },
    { value: "Open Community", label: "Who Can Join", icon: "🌐" },
];

export default function AboutSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            id="about"
            ref={ref}
            className="relative py-16 sm:py-24 md:py-36 pb-32 sm:pb-48 md:pb-64 bg-gradient-to-b from-white via-slate-50 to-slate-100 overflow-hidden scroll-mt-24 sm:scroll-mt-32 md:scroll-mt-52 lg:scroll-mt-64"
        >
            {/* Blobs */}
            <div className="absolute top-0 left-0 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-violet-200/28 rounded-full blur-[130px] pointer-events-none -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-[220px] sm:w-[400px] h-[220px] sm:h-[400px] bg-teal-200/28 rounded-full blur-[110px] pointer-events-none translate-x-1/3" />

            {/* ── Centered balanced layout, capped at 6xl ── */}
            <div className="relative z-10 max-w-6xl px-6 lg:px-12 flex flex-col items-center justify-center gap-12 lg:gap-16 xl:gap-20 text-center"
                style={{ margin: "0 auto" }}>

                {/* COL 1 — Intro text */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col items-center text-center max-w-3xl"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full mb-5
              bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest">
                        What is it?
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-6">
                        Where Quantum Meets{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-teal-500">
                            Community
                        </span>
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-6">
                        Qiskit Fall Fest 2026 is part of a global series of quantum computing events.
                        Our chapter at The College of Management brings together students, researchers,
                        and industry leaders for a full-day immersive quantum experience.
                    </p>
                    <p className="text-slate-500 text-base leading-relaxed mb-8">
                        From opening keynotes to hands-on Qiskit labs, the day is designed to
                        inspire curiosity, build skills, and connect you with Israel's quantum community.
                    </p>
                    <a
                        href="#register"
                        className="px-8 py-4 rounded-full font-bold text-white text-base
                bg-gradient-to-r from-violet-600 to-teal-500
                hover:from-violet-500 hover:to-teal-400
                shadow-md hover:shadow-violet-400/40
                transition-all duration-300 hover:scale-105"
                    >
                        Save Your Seat →
                    </a>
                </motion.div>

                {/* COL 2 — Bloch sphere */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="flex items-center justify-center"
                >
                    {/* Fixed-size container so absolute rings don't shift layout */}
                    <div className="relative flex items-center justify-center mx-auto w-full max-w-[min(100%,420px)] aspect-square">
                        {/* Radial glow */}
                        <div className="absolute inset-[5%] rounded-full
                bg-gradient-to-br from-violet-400/35 via-teal-300/20 to-transparent
                blur-[80px] pointer-events-none" />

                        {/* Orbiting rings */}
                        <motion.div
                            className="absolute inset-[12%] rounded-full border-2 border-dashed border-violet-300/35"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full border border-teal-300/20"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Sphere */}
                        <motion.div
                            animate={{ y: [0, -18, 0] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10"
                        >
                            <Image
                                src="/bloch-sphere.png"
                                alt="Bloch Sphere"
                                width={300}
                                height={300}
                                className="object-contain w-[58%] sm:w-[65%] max-w-[300px] drop-shadow-2xl"
                            />
                        </motion.div>

                        {/* Label floats with sphere */}
                        <motion.div
                            animate={{ y: [0, -18, 0] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                            className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 max-w-[90%] text-center whitespace-normal sm:whitespace-nowrap
                  px-4 py-1.5 rounded-full text-xs font-bold text-white
                  bg-gradient-to-r from-violet-600/90 to-teal-500/90 shadow-lg"
                        >
                            ⚛ Bloch Sphere — Qubit State Space
                        </motion.div>
                    </div>
                </motion.div>

                {/* COL 3 — 2×2 highlight cards */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-md mx-auto"
                >
                    {highlights.map((h, i) => (
                        <motion.div
                            key={h.label}
                            initial={{ opacity: 0, y: 18, scale: 0.97 }}
                            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.28 + 0.09 * i }}
                            className="flex flex-col items-center text-center p-5 rounded-2xl
                  bg-white border border-slate-200
                  shadow-sm hover:shadow-violet-200/70 hover:border-violet-300
                  transition-all duration-300 group cursor-default"
                        >
                            <span className="text-3xl mb-3">{h.icon}</span>
                            <span className="text-base font-black text-transparent bg-clip-text
                  bg-gradient-to-br from-violet-600 to-teal-500
                  group-hover:scale-105 transition-transform duration-300 leading-tight mb-1">
                                {h.value}
                            </span>
                            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">
                                {h.label}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
