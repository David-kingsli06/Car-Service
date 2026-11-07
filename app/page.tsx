import { Navbar } from "@/components/Navbar";
import { ScrollExperience } from "@/components/ScrollExperience";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050608] text-neutral-100 flex flex-col selection:bg-amber-400 selection:text-black">
      {/* Top Floating Glass Navigation */}
      <Navbar />

      {/* Main Hero & GSAP Canvas Scroll Experience (Directly on screen on first load) */}
      <ScrollExperience />

      {/* Curated Treatment Services */}
      <Services />

      {/* The Craftsmanship & Standards Philosophy */}
      <About />

      {/* Studio Concierge / Reservation Booking */}
      <Contact />

      {/* Luxury Minimal Footer */}
      <Footer />
    </main>
  );
}
