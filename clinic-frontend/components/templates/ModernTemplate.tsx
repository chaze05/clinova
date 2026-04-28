import ClinicHeader from "@/components/sections/ClinicHeader";
import Hero from "@/components/sections/HeroSection";
import ServicesSlider from "@/components/sections/ServicesGrid";
import DoctorsGrid from "@/components/sections/DoctorsGrid";
import MapSection from "@/components/sections/MapSection";
import ContactCTA from "@/components/sections/ContactCTA";
import FadeInSection from "@/components/sections/FadeInSection";
import Footer from "../sections/Footer";

export default function ModernTemplate({ clinic, theme }: any) {
  return (
    <div className={`min-h-screen ${theme.text}`}>

      {/* HEADER (sticky navigation) */}
      <ClinicHeader clinic={clinic} theme={theme} />

      {/* HERO */}
      <Hero clinic={clinic} theme={theme} />

      {/* SERVICES */}
      <FadeInSection>
        <ServicesSlider clinic={clinic} theme={theme} />
      </FadeInSection>

      {/* DOCTORS */}
      <FadeInSection>
        <DoctorsGrid clinic={clinic} theme={theme} />
      </FadeInSection>

      {/* MAP */}
      <FadeInSection>
        <MapSection clinic={clinic} theme={theme} />
      </FadeInSection>

      {/* CTA */}
      <FadeInSection>  
        <ContactCTA clinic={clinic} theme={theme} />
      </FadeInSection>

      <Footer clinic={clinic} />

    </div>
  );
}