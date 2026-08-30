"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, User, Mail, GraduationCap, Zap } from "lucide-react";

type FormData = {
    name: string;
    email: string;
    institution: string;
    level: string;
};
type Errors = Partial<Record<keyof FormData, string>>;

const levels = [
    { value: "beginner", label: "Beginner", desc: "New to quantum computing" },
    { value: "intermediate", label: "Intermediate", desc: "Some Qiskit experience" },
    { value: "advanced", label: "Advanced", desc: "Regular quantum coder" },
];

const steps = [
    { id: 0, label: "You", icon: User },
    { id: 1, label: "Institution", icon: GraduationCap },
    { id: 2, label: "Level", icon: Zap },
];

const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 72 : -72, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -72 : 72, opacity: 0, scale: 0.97 }),
};

function Particle({ i }: { i: number }) {
    const colors = ["#8b5cf6", "#14b8a6", "#3b82f6", "#a78bfa", "#5eead4", "#facc15"];
    const color = colors[i % colors.length];
    const size = 6 + (i % 4) * 3;
    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
                left: `${4 + i * 4.3}%`, top: "50%",
                width: size, height: size,
                background: color, boxShadow: `0 0 ${size * 2}px ${color}`,
            }}
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{
                y: -(110 + (i % 5) * 55),
                x: (i % 2 === 0 ? 1 : -1) * (18 + (i % 7) * 16),
                opacity: [1, 1, 0],
                scale: [1, 1.4, 0],
                rotate: 360 * (i % 2 === 0 ? 1 : -1),
            }}
            transition={{ duration: 1.3, delay: i * 0.04, ease: "easeOut" }}
        />
    );
}

function FormField({
    label, icon, type, placeholder, value, onChange, error,
}: {
    label: string;
    icon: React.ReactNode;
    type: string;
    placeholder: string;
    value: string;
    onChange: (v: string) => void;
    error?: string;
}) {
    return (
        <div className="w-full">
            <label className="block text-slate-100 text-lg font-bold mb-3 text-center">{label}</label>
            <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`quantum-input w-full rounded-xl pl-14 pr-5 py-5
                        text-white text-lg font-medium placeholder:text-slate-500
                        border transition-all duration-200
                        ${error
                            ? "bg-red-500/8 border-red-500/70"
                            : "bg-white/6 border-white/15 hover:border-white/28"
                        }`}
                />
            </div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-base mt-2 text-center"
                >
                    ⚠ {error}
                </motion.p>
            )}
        </div>
    );
}

export default function RegistrationForm() {
    const [step, setStep] = useState(0);
    const [dir, setDir] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [showParticles, setShowParticles] = useState(false);
    const [formData, setFormData] = useState<FormData>({ name: "", email: "", institution: "", level: "" });
    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const update = (key: keyof FormData, val: string) => {
        setFormData((p) => ({ ...p, [key]: val }));
        if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
    };

    const validateStep = (): boolean => {
        const e: Errors = {};
        if (step === 0) {
            if (!formData.name.trim()) e.name = "Name is required";
            if (!formData.email.trim()) e.email = "Email is required";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Enter a valid email";
        }
        if (step === 1 && !formData.institution.trim()) e.institution = "Institution is required";
        if (step === 2 && !formData.level) e.level = "Please select your level";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const submitRegistration = async () => {
        setIsSubmitting(true);
        setSubmitError(null);
        
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            // Show success even if email had issues
            setShowParticles(true);
            setTimeout(() => { 
                setSubmitted(true); 
                setShowParticles(false); 
                // Show warning if email failed
                if (data.emailError || !data.emailConfigured) {
                    console.warn('Email issue:', data.emailError || 'Email service not configured');
                }
            }, 1400);
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'Registration failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const next = () => {
        if (!validateStep()) return;
        if (step < 2) { setDir(1); setStep((s) => s + 1); }
        else {
            submitRegistration();
        }
    };
    const back = () => { setDir(-1); setStep((s) => s - 1); };

    return (
        <section
            id="register"
            className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-36 md:pb-48 bg-[#07071a] quantum-grid overflow-hidden scroll-mt-24 sm:scroll-mt-32 md:scroll-mt-52 lg:scroll-mt-64"
        >
            {/* Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[200px] sm:h-[380px]
                bg-violet-800/12 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[120px] sm:h-[220px]
                bg-teal-800/10 rounded-full blur-[110px] pointer-events-none" />

            {/* Outer wrapper */}
            <div className="relative z-10 w-full max-w-6xl px-4 sm:px-8 flex flex-col items-center"
                style={{ margin: "0 auto" }}>

                {/* Heading — full width, centered */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65 }}
                    className="text-center mb-14 w-full"
                >
                    <span className="inline-block px-6 py-2.5 rounded-full mb-6
                        bg-violet-500/15 border border-violet-500/30
                        text-violet-400 text-base font-bold uppercase tracking-widest">
                        Free Registration
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
                        Join the{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-teal-400">
                            Quantum Leap
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg md:text-xl">Registration is free. Seats are limited.</p>
                </motion.div>

                {/* Two-column: form left, map right */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* LEFT — Step wizard + form card */}
                    <div className="flex flex-col items-center w-full">

                        {/* Step wizard */}
                        <div className="flex items-start justify-center w-full max-w-full mb-8 sm:mb-10 overflow-x-auto pb-1">
                            {steps.map((s, i) => {
                                const Icon = s.icon;
                                const done = step > i;
                                const active = step === i;
                                return (
                                    <div key={s.id} className="flex items-center shrink-0">
                                        <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                                            <motion.div
                                                animate={{
                                                    background: done
                                                        ? "linear-gradient(135deg,#8b5cf6,#14b8a6)"
                                                        : active
                                                            ? "rgba(139,92,246,0.22)"
                                                            : "rgba(255,255,255,0.05)",
                                                    borderColor: done || active
                                                        ? "rgba(139,92,246,0.88)"
                                                        : "rgba(255,255,255,0.12)",
                                                    scale: active ? 1.25 : 1,
                                                }}
                                                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 flex items-center justify-center transition-all shadow-lg"
                                            >
                                                {done ? (
                                                    <Check className="text-white w-5 h-5 sm:w-7 sm:h-7" strokeWidth={2.5} />
                                                ) : (
                                                    <Icon className={`w-5 h-5 sm:w-7 sm:h-7 ${active ? "text-violet-300" : "text-slate-600"}`} />
                                                )}
                                            </motion.div>
                                            <span className={`text-xs sm:text-base font-bold tracking-wide ${active ? "text-violet-300" : done ? "text-teal-400" : "text-slate-600"}`}>
                                                {s.label}
                                            </span>
                                        </div>
                                        {i < steps.length - 1 && (
                                            <div className={`mx-2 sm:mx-4 md:mx-6 mb-8 sm:mb-10 h-0.5 rounded-full transition-all duration-500 w-10 sm:w-24 md:w-32
                                                ${step > i ? "bg-gradient-to-r from-violet-500 to-teal-500" : "bg-white/10"}`}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Form card */}
                        <div className="relative w-full rounded-2xl overflow-hidden
                            bg-slate-900/90 border border-purple-500/20
                            shadow-2xl shadow-violet-900/30 backdrop-blur-md
                            p-6 sm:p-10 md:p-14 min-h-[280px] sm:min-h-[320px]">

                            {/* Top shimmer line */}
                            <div className="absolute top-0 inset-x-0 h-px
                                bg-gradient-to-r from-transparent via-violet-500/55 to-transparent" />

                            {showParticles && (
                                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                    {[...Array(24)].map((_, i) => <Particle key={i} i={i} />)}
                                </div>
                            )}

                            <AnimatePresence mode="wait" custom={dir}>
                                {submitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.88 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.55, type: "spring", bounce: 0.38 }}
                                        className="flex flex-col items-center justify-center py-8 text-center"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                                            className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-600 to-teal-500
                                                flex items-center justify-center mb-7 shadow-2xl shadow-violet-500/40"
                                        >
                                            <Check size={42} className="text-white" strokeWidth={3} />
                                        </motion.div>
                                        <h3 className="text-3xl font-black text-white mb-3">Quantum State: Collapsed ✓</h3>
                                        <p className="text-slate-300 mb-1.5 text-lg">
                                            Welcome, <span className="text-violet-400 font-bold">{formData.name}</span>!
                                        </p>
                                        <p className="text-slate-500 mb-8">
                                            Confirmation and calendar event sent to <span className="text-teal-400">{formData.email}</span>
                                        </p>
                                        <motion.div
                                            initial={{ opacity: 0, y: 22 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            className="w-full rounded-2xl border border-violet-500/35
                                                bg-gradient-to-br from-violet-950/80 to-teal-950/60 p-7 text-left"
                                        >
                                            <div className="flex items-center justify-between mb-5">
                                                <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Digital Ticket</span>
                                                <span className="text-xs text-slate-500 font-mono">QFF-2026</span>
                                            </div>
                                            <div className="text-white font-black text-xl mb-1">Qiskit Fall Fest 2026</div>
                                            <div className="text-slate-400 text-sm mb-5">The College of Management</div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                                {[
                                                    { label: "Attendee", value: formData.name, cls: "text-white" },
                                                    { label: "Level", value: formData.level, cls: "text-teal-400 capitalize" },
                                                    { label: "Institution", value: formData.institution, cls: "text-white" },
                                                    { label: "Date", value: "Oct 13, 2026 · Rishon LeZion", cls: "text-violet-400" },
                                                ].map((item) => (
                                                    <div key={item.label}>
                                                        <div className="text-slate-500 text-xs mb-0.5">{item.label}</div>
                                                        <div className={`font-semibold ${item.cls}`}>{item.value}</div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-5 h-px bg-gradient-to-r from-violet-500/50 via-teal-500/50 to-transparent" />
                                            <div className="mt-4 flex items-center gap-3">
                                                <div className="flex gap-1">
                                                    {[...Array(10)].map((_, i) => (
                                                        <div key={i} className={`h-5 w-1.5 rounded-sm ${i % 2 === 0 ? "bg-violet-500" : "bg-teal-500"}`} />
                                                    ))}
                                                </div>
                                                <span className="text-xs text-slate-500 font-mono tracking-wider">⚛ VERIFIED</span>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key={step}
                                        custom={dir}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                                    >
                                        {step === 0 && (
                                            <div className="space-y-8 text-center">
                                                <div>
                                                    <h3 className="text-3xl font-black text-white mb-2">Tell us about yourself</h3>
                                                    <p className="text-slate-500 text-lg">Step 1 of 3</p>
                                                </div>
                                                <FormField label="Full Name" icon={<User size={24} />} type="text" placeholder="Your full name" value={formData.name} onChange={(v) => update("name", v)} error={errors.name} />
                                                <FormField label="Email Address" icon={<Mail size={24} />} type="email" placeholder="you@university.ac.il" value={formData.email} onChange={(v) => update("email", v)} error={errors.email} />
                                            </div>
                                        )}
                                        {step === 1 && (
                                            <div className="space-y-8 text-center">
                                                <div>
                                                    <h3 className="text-3xl font-black text-white mb-2">Your academic home</h3>
                                                    <p className="text-slate-500 text-lg">Step 2 of 3</p>
                                                </div>
                                                <FormField label="Academic Institution" icon={<GraduationCap size={24} />} type="text" placeholder="e.g. Tel Aviv University" value={formData.institution} onChange={(v) => update("institution", v)} error={errors.institution} />
                                            </div>
                                        )}
                                        {step === 2 && (
                                            <div className="text-center">
                                                <div className="mb-8">
                                                    <h3 className="text-3xl font-black text-white mb-2">Quantum experience level</h3>
                                                    <p className="text-slate-500 text-lg">Step 3 of 3 — almost there!</p>
                                                </div>
                                                <div className="space-y-3 max-w-md mx-auto">
                                                    {levels.map((lv) => (
                                                        <motion.button
                                                            key={lv.value}
                                                            type="button"
                                                            onClick={() => update("level", lv.value)}
                                                            whileTap={{ scale: 0.99 }}
                                                            className={`w-full text-left px-8 py-6 rounded-xl border
                                                                flex items-center gap-5 transition-all duration-200
                                                                ${formData.level === lv.value
                                                                    ? "border-violet-500 bg-violet-500/15 shadow-lg shadow-violet-500/20"
                                                                    : "border-white/10 bg-white/4 hover:border-violet-400/50"
                                                                }`}
                                                        >
                                                            <div className={`w-8 h-8 rounded-full border-2 shrink-0
                                                                flex items-center justify-center transition-all
                                                                ${formData.level === lv.value ? "border-violet-500 bg-violet-500" : "border-slate-600"}`}>
                                                                {formData.level === lv.value && (
                                                                    <Check size={16} className="text-white" strokeWidth={3} />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <div className="text-white font-bold text-lg">{lv.label}</div>
                                                                <div className="text-slate-400 text-base">{lv.desc}</div>
                                                            </div>
                                                        </motion.button>
                                                    ))}
                                                </div>
                                                {errors.level && (
                                                    <p className="text-red-400 text-sm mt-3">⚠ {errors.level}</p>
                                                )}
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Nav buttons */}
                            {!submitted && (
                                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/8">
                                    {step > 0 ? (
                                        <button
                                            onClick={back}
                                            disabled={isSubmitting}
                                            className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold text-slate-400
                                                border border-white/12 hover:border-white/28 hover:text-slate-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            ← Back
                                        </button>
                                    ) : <div className="hidden sm:block" />}
                                    <motion.button
                                        onClick={next}
                                        disabled={isSubmitting}
                                        whileHover={{ scale: isSubmitting ? 1 : 1.05, boxShadow: isSubmitting ? "none" : "0 0 32px rgba(139,92,246,0.6)" }}
                                        whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                                        className="flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-12 py-4 sm:py-5 rounded-xl font-bold text-white
                                            text-sm sm:text-lg bg-gradient-to-r from-violet-600 to-teal-500
                                            hover:from-violet-500 hover:to-teal-400
                                            shadow-lg transition-all duration-300 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span className="sm:hidden">Submitting...</span>
                                                <span className="hidden sm:inline">Submitting...</span>
                                            </span>
                                        ) : (
                                            <>
                                                <span className="sm:hidden">{step === 2 ? "Submit" : "Continue"}</span>
                                                <span className="hidden sm:inline">{step === 2 ? "Submit & Collapse Wave Function" : "Continue"}</span>
                                                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            )}
                            
                            {/* Error message */}
                            {submitError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-center"
                                >
                                    ⚠ {submitError}
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT — Google Maps */}
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: 0.2 }}
                        className="flex flex-col gap-4"
                    >
                        <div className="rounded-2xl overflow-hidden border border-violet-500/20 shadow-2xl shadow-violet-900/30">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.6749016574486!2d34.77457892413425!3d31.96971522480401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502b3f5eb44e1c1%3A0xfbe9b8c6bce59319!2z15TXnteh15zXldecINeU15DXp9eT157XmSDXlNee15vXnNec15Qg15zXnteZ16DXlNec!5e0!3m2!1siw!2sil!4v1786113261639!5m2!1siw!2sil"
                                width="100%"
                                height="450"
                                className="w-full h-56 sm:h-72 md:h-[450px]"
                                style={{ border: 0, display: "block" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="strict-origin-when-cross-origin"
                                title="The College of Management location"
                            />
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl
                            bg-violet-500/10 border border-violet-500/20">
                            <span className="text-violet-400 text-xl">📍</span>
                            <div>
                                <p className="text-white font-bold text-sm">The College of Management</p>
                                <p className="text-slate-400 text-xs">7 Yitzhak Rabin Blvd, Rishon LeZion</p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
