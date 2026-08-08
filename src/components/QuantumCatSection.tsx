"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Dark charcoal matching the quantum_cat.jpg background
const CAT_BG = "#2B2A37";

export default function QuantumCatSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Cat stays static in the center
    const catX = useTransform(scrollYProgress, [0, 1], ["50vw", "50vw"]);
    const catY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 0]);
    const catRotate = useTransform(scrollYProgress, [0, 1], [0, 0]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".cat-reveal",
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.75, stagger: 0.13, ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 65%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="cat"
            className="relative overflow-hidden"
            style={{ minHeight: "92vh", backgroundColor: CAT_BG }}
        >
            {/* Quantum grid overlay */}
            <div className="absolute inset-0 quantum-grid opacity-35 pointer-events-none" />

            {/* Transition from white About section */}
            <div
                className="absolute top-0 inset-x-0 h-48 pointer-events-none"
                style={{ background: `linear-gradient(to bottom, #f8fafc, ${CAT_BG})` }}
            />

            {/* Ambient purple/teal glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[700px] h-[380px] bg-violet-700/10 rounded-full blur-[110px] pointer-events-none" />
            <div className="absolute bottom-0 right-[15%] w-[260px] h-[260px]
        bg-teal-700/8 rounded-full blur-[80px] pointer-events-none" />

            {/* ── 2-column centered grid ── */}
            <div
                className="relative z-10 w-full max-w-6xl px-6 lg:px-12
          grid grid-cols-1 lg:grid-cols-2 gap-16 items-center justify-center
          pt-24 pb-52 sm:pt-32 sm:pb-64"
                style={{ margin: "0 auto" }}
            >
                {/* LEFT — Text block */}
                <div className="flex flex-col items-center text-center">
                    <span className="cat-reveal opacity-0 inline-block px-4 py-1.5 rounded-full mb-7
            bg-teal-500/15 border border-teal-400/35 text-teal-300 text-sm font-bold uppercase tracking-widest">
                        The Quantum Paradox
                    </span>

                    <h2 className="cat-reveal opacity-0 text-5xl lg:text-6xl xl:text-[4.2rem] font-black
            text-white leading-[1.1] mb-8">
                        Is the cat{" "}
                        <span
                            className="text-transparent bg-clip-text
                bg-gradient-to-r from-violet-400 via-purple-300 to-teal-400"
                            style={{ filter: "drop-shadow(0 0 18px rgba(139,92,246,0.5))" }}
                        >
                            alive or dead?
                        </span>
                    </h2>

                    <p className="cat-reveal opacity-0 text-slate-200 text-2xl leading-[1.85] mb-6">
                        Schrödinger's cat sits in a superposition of both states until observed.
                        Quantum computing harnesses this very principle — qubits exist as 0 and 1
                        simultaneously, unlocking computational power far beyond classical limits.
                    </p>

                    <p className="cat-reveal opacity-0 text-slate-400 text-xl leading-[1.85] mb-10">
                        At Qiskit Fall Fest, you'll explore quantum gates, circuits, and algorithms
                        that exploit superposition, entanglement, and interference — the building
                        blocks of the quantum revolution.
                    </p>

                    <motion.a
                        href="#agenda"
                        className="cat-reveal opacity-0 inline-flex items-center gap-2
              px-8 py-4 rounded-full text-base font-bold text-white
              border border-violet-500/60 hover:border-violet-400
              bg-violet-600/25 hover:bg-violet-600/40
              transition-all duration-300 shadow-lg hover:shadow-violet-500/30"
                        whileHover={{ x: 6 }}
                    >
                        See the Agenda →
                    </motion.a>
                </div>

                {/* RIGHT — Static cat image */}
                <div className="flex items-center justify-center">
                    <motion.div
                        className="relative cursor-pointer"
                        onHoverStart={() => setHovered(true)}
                        onHoverEnd={() => setHovered(false)}
                        whileHover={{ scale: 1.04 }}
                        transition={{ type: "spring", stiffness: 140, damping: 22 }}
                    >
                        <motion.div
                            className="relative"
                            animate={
                                hovered
                                    ? {
                                        filter: [
                                            "drop-shadow(0 0 0px rgba(139,92,246,0))",
                                            "drop-shadow(0 0 40px rgba(139,92,246,1))",
                                            "drop-shadow(0 0 20px rgba(20,184,166,0.9))",
                                            "drop-shadow(0 0 40px rgba(139,92,246,1))",
                                        ],
                                        opacity: [1, 0.62, 1, 0.62, 1],
                                    }
                                    : { filter: "drop-shadow(0 0 14px rgba(139,92,246,0.4))", opacity: 1 }
                            }
                            transition={{ duration: 0.55, repeat: hovered ? Infinity : 0 }}
                        >
                            {/* Cat image — large so grid detail is visible */}
                            <Image
                                src="/quantum-cat.jpg"
                                alt="Schrödinger's Quantum Cat"
                                width={900}
                                height={900}
                                className="rounded-2xl object-cover shadow-2xl w-[700px] h-[700px]"
                                draggable={false}
                                loading="eager"
                            />

                            {hovered && (
                                <motion.div
                                    initial={{ opacity: 0, y: 12, scale: 0.85 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                    px-5 py-2.5 rounded-full text-sm font-bold text-teal-300
                    bg-[#2B2A37]/95 border border-teal-500/50 backdrop-blur-md shadow-xl"
                                >
                                    ⚛ Superposition Active
                                </motion.div>
                            )}

                            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap
                    px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest
                    text-violet-300 bg-violet-900/80 border border-violet-500/30 backdrop-blur-sm">
                                Schrödinger&apos;s Cat
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
