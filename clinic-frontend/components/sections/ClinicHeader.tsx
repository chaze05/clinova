"use client";

export default function ClinicHeader({ clinic, theme }: any) {
  return (
    <header className="sticky top-0 z-50 bg-white shadow">

      <div className="flex justify-between items-center px-4 py-3">

        <div className="flex items-center gap-2">
          <img src={clinic.logo} className="w-10 h-10 rounded-full" />
          <span className="font-semibold text-black">{clinic.clinic.name}</span>
        </div>

        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#services">Services</a>
          <a href="#doctors">Doctors</a>
          <a href="#map">Map</a>
        </nav>

        <button className={`${theme.button} text-white px-4 py-2 rounded-lg`}>
          Book
        </button>

      </div>
    </header>
  );
}