"use client"

import { getClinicList } from "@/lib/auth";
import { useAuthStore } from "@/store/auth.store";
import Image from "next/image";
import { useEffect, useState } from "react";
import CreateClinicModal from "@/app/(app)/dev/clinics/create/createClinicModal";

export default function ClinicData(){
  const [clinics, setClinics] = useState([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

    useEffect(() => {
        if (!token) return;
        getClinicList(token)
        .then((data) => setClinics(data))
        .catch((err) => console.error(err));
    }, [token]);

    const totalClinics = 3;
    const activeClinics = 1;
    const totalDoctors = 2;
    const totalPatients = 3;

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">
            Clinics Dashboard
            </h1>

            <CreateClinicModal />
        </div>

        {/* ANALYTICS */}
        <div className="grid md:grid-cols-4 gap-5">
            <GlassCard title="Total Clinics" value={totalClinics} />
            <GlassCard title="Active Clinics" value={activeClinics} />
            <GlassCard title="Doctors" value={totalDoctors} />
            <GlassCard title="Patients" value={totalPatients} />
        </div>

        {/* VISUAL SECTION */}
        {/* <div className="grid md:grid-cols-2 gap-5">
            <GlassContainer>
            <h2 className="text-sm text-gray-600 mb-3">Clinic Growth</h2>
            <div className="h-40 flex items-center justify-center text-gray-400">
                Analytics chart coming soon 📈
            </div>
            </GlassContainer>

            <GlassContainer>
            <h2 className="text-sm text-gray-600 mb-3">Status Overview</h2>
            <div className="flex gap-3">
                <StatusBadge label="Active" value={activeClinics} color="green" />
                <StatusBadge label="Inactive" value={totalClinics - activeClinics} color="gray" />
            </div>
            </GlassContainer>
        </div> */}

        {/* CLINICS GRID */}
        <div>
            <h2 className="text-lg font-medium text-gray-700 mb-4">
            All Clinics
            </h2>

            <div className="grid md:grid-cols-3 gap-5">
            {clinics.map((clinic) => (
                <ClinicCard key={clinic.id} clinic={clinic} />
            ))}
            </div>
        </div>
        </div>
    );
}

/* 🧩 COMPONENTS */

function GlassCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg rounded-2xl p-5">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
    </div>
  );
}

function GlassContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg rounded-2xl p-5">
      {children}
    </div>
  );
}

function StatusBadge({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "green" | "gray";
}) {
  return (
    <div
      className={`px-4 py-2 rounded-xl text-sm font-medium ${
        color === "green"
          ? "bg-green-100 text-green-700"
          : "bg-gray-200 text-gray-600"
      }`}
    >
      {label}: {value}
    </div>
  );
}

function ClinicCard({ clinic }: { clinic:Clinic}) {
  return (
    <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg rounded-2xl p-5 hover:shadow-xl transition">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-white/70 flex items-center justify-center shadow-inner">
          {clinic.logo ? (
            <Image src={clinic.logo} alt={clinic.slug}/>
            // <img
            //   src={clinic.logo}
            //   alt={clinic.slug}
            //   className="w-full h-full object-cover rounded-xl"
            // />
          ) : (
            "🏥"
          )}
        </div>

        <div>
          <p className="font-medium text-gray-800">{clinic.name}</p>
          <p className="text-xs text-gray-500">{clinic.domain}</p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 text-center mt-5 text-sm  text-black">
        <div>
          <p className="font-semibold">{clinic.doctors_count || 0}</p>
          <p className="text-gray-500">Doctors</p>
        </div>
        <div>
          <p className="font-semibold">{clinic.patients_count || 0}</p>
          <p className="text-gray-500">Patients</p>
        </div>
        <div>
          <p className="font-semibold">{clinic.appointments_count || 0}</p>
          <p className="text-gray-500">Appts</p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-5">
        <span
          className={`text-xs px-3 py-1 rounded-full ${
            clinic.is_active
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {clinic.is_active ? "Active" : "Inactive"}
        </span>

        <a
          href={`/dev/clinics/${clinic.id}/`}
          className="text-sm text-green-600 hover:underline"
        >
          Manage
        </a>
      </div>
    </div>
  );
}

