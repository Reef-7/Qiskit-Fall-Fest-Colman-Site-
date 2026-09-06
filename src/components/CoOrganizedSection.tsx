import Image from "next/image";

export default function CoOrganizedSection() {
    return (
        <section
            aria-label="Co-organized with IBM Quantum"
            className="w-full bg-white border-y border-slate-200/80 py-12 sm:py-16 md:py-20"
        >
            <div className="flex flex-col items-center justify-center gap-5 sm:gap-6 px-6">
                <p className="text-sm sm:text-base font-bold uppercase tracking-[0.28em] text-slate-500">
                    Co-organized with
                </p>
                <Image
                    src="/IBM_Quantum_logotype_pos_RGB.png"
                    alt="IBM Quantum"
                    width={320}
                    height={72}
                    className="h-12 sm:h-16 md:h-20 w-auto object-contain"
                />
            </div>
        </section>
    );
}
