import { AIModalProvider } from "@/contexts/AIModalContext";
import About from "@/components/About";
import AICopilotModal from "@/components/AICopilotModal";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import ContactSection from "@/components/ContactSection";
import Experience from "@/components/Experience";
import ExtracurricularSection from "@/components/ExtracurricularSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";

export default function HomePage() {
  return (
    <AIModalProvider>
      {/* pt-[68px] = exact navbar height so content is never hidden under the fixed bar */}
      <div className="relative overflow-x-hidden bg-[#030712] text-white pt-[68px]">
        <BackgroundCanvas />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <FeaturedProjects />
          <Experience />
          <ExtracurricularSection />
          <ContactSection />
        </main>
        <Footer />
        <AICopilotModal />
      </div>
    </AIModalProvider>
  );
}