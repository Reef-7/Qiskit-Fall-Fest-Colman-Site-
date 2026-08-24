"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Smooth scroll-out: fade + slide up — no mouse parallax
    const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".hero-badge",
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.7, delay: 0.5, ease: "power2.out" }
            );
            gsap.fromTo(".hero-cta",
                { opacity: 0, y: 24, scale: 0.94 },
                { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: 0.85, stagger: 0.14, ease: "back.out(1.4)" }
            );
            gsap.fromTo(".hero-date",
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.6, delay: 1.3, ease: "power2.out" }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <motion.section
            ref={containerRef}
            id="hero"
            className="relative w-full overflow-hidden"
            style={{ opacity: heroOpacity, y: heroY }}
        >
            {/* Full-bleed image */}
            <div className="relative w-full">
                <Image
                    src="/fall-fest-header.jpg"
                    alt="Qiskit Fall Fest 2026"
                    width={1920}
                    height={900}
                    className="w-full block object-cover object-center min-h-[42vh] sm:min-h-[50vw] md:min-h-[55vw] max-h-[85vh] sm:max-h-[96vh] h-auto"
                    priority
                    quality={95}
                />
                {/* Top vignette for navbar readability */}
                <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
                {/* Bottom fade into white section */}
                <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-b from-transparent via-white/55 to-white pointer-events-none" />
            </div>

            {/* Overlay CTAs — large, centered, prominently sized */}
            <div className="absolute inset-x-0 bottom-[4%] sm:bottom-[8%] md:bottom-[12%] z-20
        flex flex-col items-center gap-4 sm:gap-6 px-4 sm:px-6 text-center max-w-full">

                {/* Hosted-by badge */}
                <div className="hero-badge opacity-0 inline-flex items-center gap-2 sm:gap-4 px-4 sm:px-8 py-2.5 sm:py-4 rounded-full max-w-[calc(100vw-2rem)]
          bg-white/75 backdrop-blur-sm border border-violet-300/70 shadow-md">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-violet-500 animate-pulse shrink-0" />
                    <span className="text-violet-900 text-xs sm:text-lg md:text-xl font-black uppercase tracking-wide sm:tracking-widest">
                        Hosted by The College of Management
                    </span>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-center w-full max-w-md sm:max-w-none">
                    <a
                        href="#register"
                        className="hero-cta opacity-0 px-8 sm:px-14 py-4 sm:py-6 rounded-full text-white font-black text-lg sm:text-2xl text-center
              bg-gradient-to-r from-violet-600 to-teal-500
              hover:from-violet-500 hover:to-teal-400
              shadow-2xl hover:shadow-violet-500/55
              transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        Register Free →
                    </a>
                    <a
                        href="#about"
                        className="hero-cta opacity-0 px-8 sm:px-14 py-4 sm:py-6 rounded-full font-black text-lg sm:text-2xl text-center text-slate-900
              border-2 border-slate-800/35 hover:border-violet-600 hover:text-violet-700
              bg-white/55 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                    >
                        Learn More
                    </a>
                </div>

                {/* Date / location pill */}
                <div className="hero-date opacity-0 inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-5 sm:px-10 py-3 sm:py-5 rounded-2xl max-w-[calc(100vw-2rem)]
          bg-white/65 backdrop-blur-sm border border-slate-200/90 shadow-sm">
                    <span className="text-violet-600 text-2xl sm:text-3xl shrink-0">📅</span>
                    <span className="text-slate-800 text-sm sm:text-xl md:text-2xl font-black leading-snug">
                        October 13, 2026 · College of Management · Rishon LeZion, Israel
                    </span>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-700 z-20"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-xs font-bold tracking-widest uppercase opacity-50">Scroll</span>
                <div className="w-px h-7 bg-gradient-to-b from-slate-500 to-transparent" />
            </motion.div>
        </motion.section>
    );
}
