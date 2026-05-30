import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import FeaturedProjects from "@/components/FeaturedProjects";
import ExtracurricularSection from "@/components/ExtracurricularSection";
import Experience from "@/components/Experience";
import ChatPreview from "@/components/ChatPreview";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <Experience />
      <ExtracurricularSection />
      <ChatPreview />
      <Footer />
    </main>
  );
}
