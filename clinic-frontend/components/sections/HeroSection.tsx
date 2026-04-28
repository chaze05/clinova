import Booking from "@/components/booking/Booking";
import FadeInSection from "./FadeInSection";
export default function Hero({ clinic, theme }: any) {
  const bgImage = clinic?.heroImage || clinic?.coverImage;

  return (
    <section
      className="relative h-[70vh] flex items-center justify-center text-white overflow-hidden"
    >

      {/* BACKGROUND */}
      {bgImage ? (
        <img
          src={bgImage}
          alt="Clinic background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-r ${theme.primary}`}
        />
      )}

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <FadeInSection >
        <div className="relative z-10 text-center max-w-2xl px-4">

          {/* Logo */}
          <img
            src={clinic.logo}
            className="w-16 h-16 mx-auto rounded-full border-2 border-white/30"
          />

          {/* Main Hero Text */}
          <h1 className="text-4xl md:text-5xl font-bold mt-5">
            {clinic.clinic.name}
          </h1>

          {/* Subtext / Tagline */}
          <p className="mt-3 text-white/80 text-sm md:text-base">
            {clinic.tagline ||
              "Modern healthcare made simple — book appointments in seconds."}
          </p>

          {/* Extra hero line */}
          <p className="mt-2 text-white/60 text-xs md:text-sm">
            Trusted doctors • Easy booking • Fast care
          </p>

          {/* CTA */}
          <div className="mt-6">
            <Booking clinic={clinic} theme={theme} />
          </div>

        </div>
      </FadeInSection>
    </section>
  );
}