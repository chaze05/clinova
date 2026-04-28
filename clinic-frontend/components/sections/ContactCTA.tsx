export default function ContactCTA({ clinic, theme }: any) {
  return (
    <section className={`relative py-20 text-white overflow-hidden`}>

      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${theme.primary}`} />

      {/* Overlay depth */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-6 text-center">

        <h2 className="text-4xl md:text-5xl font-bold">
          Book Your Appointment
        </h2>

        <p className="mt-4 text-white/80 text-sm md:text-base">
          Fast, simple, and secure booking with our doctors. 
          No waiting lines. No hassle.
        </p>

        {/* Trust line */}
        <p className="mt-2 text-white/60 text-xs">
          Trusted by patients • Available daily • Instant confirmation
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">

          <button className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:scale-105 transition">
            Schedule Now
          </button>

          <button className="border border-white/40 px-6 py-3 rounded-xl hover:bg-white/10 transition">
            View Doctors
          </button>

        </div>

      </div>
    </section>
  );
}