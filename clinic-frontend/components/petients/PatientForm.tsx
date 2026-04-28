'use client'

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { patientSchema } from "@/validations/clinic";

interface Patient {
  id:number,
  patientName: string;
  patientMobile:string;
  patientEmail:string;
  status:number;
  lastVisit:string;
}

const emptyPatient: Patient = {
  id: 0,
  patientName: "",
  patientMobile: "",
  patientEmail: "",
  status: 1,
  lastVisit:'',
};
type EditPatientFormProps = {
  patient?: Patient | null;
  onSaveSuccess?: (data: Patient) => void;
  onCancel: () => void;
  mode:'add'|'update';
};

export function PatientForm({
  patient,
  onSaveSuccess,
  mode,
  onCancel,
}: EditPatientFormProps) {

  const [form, setForm] = useState<Patient>(patient ?? emptyPatient);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setForm(patient ?? emptyPatient);
  }, [patient]);

  const handleChange = (key: keyof Patient, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // =========================
  // SAVE / UPDATE HANDLER
  // =========================
  const handleSave = async () => {
    setLoading(true);
    setErrors({});

    try {
      // 1. Validate using Zod

      const result = patientSchema.safeParse(form);

      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;

        const formatted: Record<string, string> = {};
        Object.entries(fieldErrors).forEach(([key, value]) => {
          if (value?.length) formatted[key] = value[0];
        });

        setErrors(formatted);
        setLoading(false);
        return;
      }

      const payload = result.data;

      // 2. Decide CREATE or UPDATE
      let res;

      if (patient?.id) {
        // UPDATE
        res = await api.put(`/api/patients/${patient.id}`, payload);
      } else {
        // CREATE
        res = await api.post(`/api/patients`, payload);
      }

      onSaveSuccess?.(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">

      {/* NAME */}
      <div>
        <label className="text-sm font-medium">Full Name</label>
        <input
          className="w-full border rounded-xl px-3 py-2 mt-1"
          value={form?.patientName || ''}
          onChange={(e) => handleChange("patientName", e.target.value)}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      {/* EMAIL */}
      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          className="w-full border rounded-xl px-3 py-2 mt-1"
          value={form?.patientEmail || ''}
          onChange={(e) => handleChange("patientEmail", e.target.value)}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      {/* PHONE */}
      <div>
        <label className="text-sm font-medium">Phone</label>
        <input
          className="w-full border rounded-xl px-3 py-2 mt-1"
          value={form?.patientMobile || ''}
          onChange={(e) => handleChange("patientMobile", e.target.value)}
        />
        {errors.phone && (
          <p className="text-xs text-red-500">{errors.phone}</p>
        )}
      </div>

      {/* STATUS */}
      <div>
        <label className="text-sm font-medium">Status</label>
        <select
          className="w-full border rounded-xl px-3 py-2 mt-1"
          value={form?.status || "1"}
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
        {errors.status && (
          <p className="text-xs text-red-500">{errors.status}</p>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
        >
          {loading ? "Saving..." : patient?.id ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
}