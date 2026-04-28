import ClinicHeader from "@/components/sections/ClinicHeader";
import Hero from "@/components/sections/HeroSection";
import ServicesSlider from "@/components/sections/ServicesGrid";
import DoctorsGrid from "@/components/sections/DoctorsGrid";
import MapSection from "@/components/sections/MapSection";
import ContactCTA from "@/components/sections/ContactCTA";
import FadeInSection from "@/components/sections/FadeInSection";
import Footer from "../sections/Footer";

export default function MinimalTemplate({ clinic, theme }: any) {
  return (
    <div className="bg-white">

      <ClinicHeader clinic={clinic} theme={theme} />

      <Hero clinic={clinic} theme={theme} />

      <FadeInSection>
        <ServicesSlider clinic={clinic} theme={theme} />
      </FadeInSection>

      <FadeInSection>
        <DoctorsGrid clinic={clinic} theme={theme} />
      </FadeInSection>

      <FadeInSection>
        <MapSection clinic={clinic} theme={theme} />
      </FadeInSection>
      
      <FadeInSection>  
        <ContactCTA clinic={clinic} theme={theme} />
      </FadeInSection>

      <Footer />

    </div>
  );
}