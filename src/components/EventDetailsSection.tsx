"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const agenda = [
    { time: "16:00", title: "Gathering & Refreshments", desc: "Arrival, networking, and welcome refreshments.", tag: "Opening", color: "teal" },
    { time: "16:15", title: "Opening & Intro", desc: "Welcome remarks and an introduction to the day's program.", tag: "Opening", color: "teal" },
    { time: "16:30", title: "Opening Keynote: Quantum Innovation Overview", desc: "A grounding in quantum mechanics fundamentals and the shift from the first to the second quantum revolution. A vision for quantum computing in 2026 and what it means for the next generation.", tag: "Keynote", color: "violet" },
    { time: "17:30", title: "Networking & Short Break", desc: "Connect with fellow attendees, speakers, and the quantum community.", tag: "Break", color: "teal" },
    { time: "17:45", title: "Hands-On Quantum Practical Workshop (The Qiskit Framework)", desc: "Build and run your first quantum circuits in a guided lab environment using the Qiskit SDK.", tag: "Workshop", color: "violet" },
    { time: "19:00", title: "Closing Remarks & Community Hub", desc: "Key takeaways, community announcements, and an open space to connect and collaborate.", tag: "Closing", color: "blue" },
];

const tagColors: Record<string, string> = {
    violet: "bg-violet-500/20 text-violet-300 border-violet-500/40",
    teal: "bg-teal-500/20   text-teal-300   border-teal-500/40",
    blue: "bg-blue-500/20   text-blue-300   border-blue-500/40",
};
const dotColors: Record<string, string> = {
    violet: "bg-violet-500 shadow-violet-500/60",
    teal: "bg-teal-500   shadow-teal-500/60",
    blue: "bg-blue-500   shadow-blue-500/60",
};
const dividerColors: Record<string, string> = {
    violet: "bg-violet-700/50",
    teal: "bg-teal-700/50",
    blue: "bg-blue-700/50",
};
const hoverColors: Record<string, string> = {
    violet: "hover:border-violet-500/50 hover:shadow-violet-500/10",
    teal: "hover:border-teal-500/50   hover:shadow-teal-500/10",
    blue: "hover:border-blue-500/50   hover:shadow-blue-500/10",
};

export default function EventDetailsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: "-60px" });

    return (
        <section
            ref={sectionRef}
            id="agenda"
            className="relative pt-16 pb-40 sm:pt-24 sm:pb-64 md:pt-36 md:pb-80 bg-[#0a0a1a] quantum-grid overflow-hidden w-full scroll-mt-24 sm:scroll-mt-32 md:scroll-mt-52 lg:scroll-mt-64 text-center"
        >
            {/* Centered glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[200px] sm:h-[400px]
        bg-violet-900/14 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[150px] sm:h-[300px]
        bg-teal-900/10 rounded-full blur-[120px] pointer-events-none" />

            {/* ── Single centered column, max-w-4xl ── */}
            <div className="relative z-10 w-full max-w-4xl px-4 sm:px-8
        flex flex-col items-center text-center"
                style={{ margin: "0 auto", width: "100%" }}>

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65 }}
                    className="text-center mb-14 w-full"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full mb-5
            bg-violet-500/15 border border-violet-500/30
            text-violet-400 text-xs font-bold uppercase tracking-widest">
                        Event Schedule
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
                        Day{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-teal-400">
                            At a Glance
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-lg leading-relaxed" style={{ margin: "0 auto" }}>
                        A single, action-packed day of talks, workshops, and quantum community.
                    </p>
                </motion.div>

                {/* Agenda rows — full width of the 4xl container */}
                <div className="w-full max-w-3xl mx-auto space-y-4 mb-20">
                    {agenda.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.48, delay: 0.07 * i }}
                            className={`group w-full flex flex-col items-center gap-5
                p-5 sm:p-6 rounded-2xl glass-dark border border-white/8
                hover:shadow-xl transition-all duration-300 cursor-default text-center
                ${hoverColors[item.color]}`}
                        >
                            {/* Time */}
                            <div className="font-mono text-xl font-black text-slate-500 w-20 shrink-0 tabular-nums">
                                {item.time}
                            </div>
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center justify-center gap-2 mb-1.5">
                                    <h3 className="text-white font-bold text-base sm:text-lg leading-snug">
                                        {item.title}
                                    </h3>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${tagColors[item.color]}`}>
                                        {item.tag}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                            {/* Dot */}
                            <div className={`w-2.5 h-2.5 rounded-full shrink-0 shadow-md
                group-hover:shadow-lg transition-shadow ${dotColors[item.color]}`} />
                        </motion.div>
                    ))}
                </div>

                {/* Workshop teaser — clean, centered, no icon box */}
                <motion.div
                    id="workshops"
                    initial={{ opacity: 0, y: 28 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, delay: 0.38 }}
                    className="w-full max-w-3xl mx-auto text-center scroll-mt-24 sm:scroll-mt-32 md:scroll-mt-52 lg:scroll-mt-64"
                >
                    <h3 className="text-3xl sm:text-4xl font-black text-white mb-5">
                        Hands-On{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-teal-400">
                            Quantum Workshop
                        </span>
                    </h3>
                    <p className="text-slate-300 max-w-2xl mb-10 text-lg leading-relaxed" style={{ margin: "0 auto 2.5rem" }}>
                        Experience quantum computing in practice. Join our guided, interactive
                        hands-on lab where you will build, simulate, and run your first quantum
                        circuits using the Qiskit SDK.
                    </p>
                    <a
                        href="#register"
                        className="inline-flex items-center gap-2 px-10 py-4 rounded-full
              font-bold text-white text-base
              bg-gradient-to-r from-violet-600 to-teal-500
              hover:from-violet-500 hover:to-teal-400
              shadow-lg hover:shadow-violet-500/40
              transition-all duration-300 hover:scale-105"
                    >
                        Secure Your Spot →
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
