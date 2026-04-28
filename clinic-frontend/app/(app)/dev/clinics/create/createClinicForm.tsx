"use client";

import { useState } from "react";
import api from "@/lib/api";
import { clinicSchema } from "@/validations/clinic";

export default function CreateClinicForm({ onClose }: { onClose?: () => void }) {
    const [createDoctor, setCreateDoctor] = useState(false);
    const [createSecretary, setCreateSecretary] = useState(false);
    const [clinicName,setClinicName] = useState<string>('');
    const [clinicDomain,setClinicDomain] = useState<string>('');
    const [loading,setLoading] = useState(false);
    const [doctorName,setDoctorName] = useState<string>('');
    const [doctorEmail,setDoctorEmail] = useState<string>('');
    const [secretaryName,setSecretaryName] = useState<string>('');
    const [secretaryEmail,setSecretaryEmail] = useState<string>('');

    const handleSubmit = async (e: (any)) => {
        e.preventDefault();
        setLoading(true);

        try {
        const payload = {
            clinic_name: clinicName,
            domain: clinicDomain,
            doctor: {
            enabled: createDoctor,
            name: doctorName,
            email: doctorEmail,
            },
            secretary: {
            enabled: createSecretary,
            name: secretaryName,
            email: secretaryEmail,
            },
        };
        const result = clinicSchema.safeParse(payload);

        if (!result.success) {
            console.log(result.error.format());
            return;
        }
        const res = await api.post("/api/addClinic", payload);

        console.log("Created:", res.data);

        onClose?.(); // close modal
        // optionally refresh list (SWR / router refresh)

        } catch (err) {
        console.error(err);
        } finally {
        setLoading(false);
        }
    };
  
    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Clinic Info Card */}
        <div className="rounded-xl border bg-white/70 backdrop-blur px-2 py-3 space-y-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700">
            Clinic Information
            </h3>

            <input
            onChange={(e)=>(setClinicName(e.target.value))}
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="Clinic Name"
            />

            <input
            onChange={(e)=>(setClinicDomain(e.target.value))}
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="Clinic Domain"
            />
        </div>

        {/* Doctor Toggle */}
        <div className="rounded-xl border bg-white/70 backdrop-blur px-2 py-3 shadow-sm">
            <div className="flex items-center justify-between">
            <div>
                <p className="font-medium text-gray-800">Create Doctor Account</p>
                <p className="text-xs text-gray-500">
                Automatically assign a doctor to this clinic
                </p>
            </div>

            <button
                type="button"
                onClick={() => setCreateDoctor(!createDoctor)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                createDoctor ? "bg-green-500" : "bg-gray-300"
                }`}
            >
                <div
                className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                    createDoctor ? "translate-x-6" : ""
                }`}
                />
            </button>
            </div>

            {createDoctor && (
            <div className="mt-4 space-y-3">
                <input
                onChange={(e) => (setDoctorName(e.target.value))}
                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Doctor Name"
                />
                <input
                onChange={(e) => (setDoctorEmail(e.target.value))}
                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Doctor Email"
                />
            </div>
            )}
        </div>

        {/* Secretary Toggle */}
        <div className="rounded-xl border bg-white/70 backdrop-blur px-2 py-3 shadow-sm">
            <div className="flex items-center justify-between">
            <div>
                <p className="font-medium text-gray-800">
                Create Secretary Account
                </p>
                <p className="text-xs text-gray-500">
                Assign a clinic secretary for operations
                </p>
            </div>

            <button
                type="button"
                onClick={() => setCreateSecretary(!createSecretary)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                createSecretary ? "bg-green-500" : "bg-gray-300"
                }`}
            >
                <div
                className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                    createSecretary ? "translate-x-6" : ""
                }`}
                />
            </button>
            </div>

            {createSecretary && (
            <div className="mt-4 space-y-3">
                <input
                onChange={(e) => (setSecretaryName(e.target.value))}
                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Secretary Name"
                />
                <input
                onChange={(e) => (setSecretaryEmail(e.target.value))}
                
                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Secretary Email"
                />
            </div>
            )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
            <button
            type="submit"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-50"
            >
            Cancel
            </button>

            <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 shadow-sm"
            disabled={loading}>
            {loading ? "Creating..." : "Create Clinic"}
            </button>
        </div>
        </form>
    );
}