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
      <div style={{ height: "160px", background: "linear-gradient(to bottom, #f1f5f9, #2B2A37)" }} />
      <QuantumCatSection />
      <EventDetailsSection />
      {/* Explicit spacer between agenda and registration */}
      <div style={{ height: "120px", background: "linear-gradient(to bottom, #0a0a1a, #07071a)" }} />
      <RegistrationForm />
      {/* Spacer between form and footer */}
      <div style={{ height: "120px", background: "#07071a" }} />
      <Footer />
    </main>
  );
}
