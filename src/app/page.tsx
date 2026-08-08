import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import QuantumCatSection from "@/components/QuantumCatSection";
import EventDetailsSection from "@/components/EventDetailsSection";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      {/* Spacer between About and Cat sections */}
      <div
        className="h-24 sm:h-32 md:h-40"
        style={{ background: "linear-gradient(to bottom, #f1f5f9, #2B2A37)" }}
      />
      <QuantumCatSection />
      <EventDetailsSection />
      {/* Explicit spacer between agenda and registration */}
      <div
        className="h-16 sm:h-24 md:h-[120px]"
        style={{ background: "linear-gradient(to bottom, #0a0a1a, #07071a)" }}
      />
      <RegistrationForm />
      {/* Spacer between form and footer */}
      <div className="h-16 sm:h-24 md:h-[120px] bg-[#07071a]" />
      <Footer />
    </main>
  );
}
