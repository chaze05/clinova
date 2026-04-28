"use client";

import api from "@/lib/api";
import { bookingSchema } from "@/validations/clinic";
import flatpickr from "flatpickr";
import { useEffect, useRef, useState } from "react";
import "flatpickr/dist/flatpickr.css";
import TimeDropdown from "./TimeSlots";
import toast from "react-hot-toast";
import { useDebounce } from "@/app/hooks/useDebounce";

export default function BookingForm({
  clinicData,
  date,
  mode = "public",
  theme,
  onClose,
}: {
  clinicData: any;
  date?:any,
  mode?: "public" | "admin";
  theme: any;
  onClose?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    patientName: "",
    patientEmail: "",
    patientMobile: "",
    patient_id: "",
    date: date || "",
    time: "",
    service: "",
  });

  const [error, setError] = useState<Record<string, string>>({});

  const dateRef = useRef<HTMLInputElement | null>(date);
  const { services } = clinicData;
  const [attachment, setAttachment] = useState<File | null>(null);
  const { id: clinic_id } = clinicData.clinic;
  const { doctor_id } = clinicData.doctor;

  // ================= ADMIN STATE =================
  const [patientSearch, setPatientSearch] = useState("");
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const [openPatientModal, setOpenPatientModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    patientName: "",
    patientEmail: "",
    patientMobile: "",
  });
  


    // ================= SEARCH =================
    const fetchPatients = async (query: string) => {
      try {
        const res = await api.get("/api/patients/search", {
          params: { q: query },
        });
        setPatients(res.data);
      } catch {
        setPatients([]);
      }
    };

    const debouncedSearch = useDebounce(patientSearch, 300);

    useEffect(() => {
      if (mode !== "admin") return;
      if (!debouncedSearch || debouncedSearch.length < 2) {
        setPatients([]);
        return;
      }

      fetchPatients(debouncedSearch);
    }, [debouncedSearch, mode]);



    // ================= HANDLERS =================
    const handleChange = (key: string, value: string) => {
      setForm((prev) => ({
        ...prev,
        [key]: value,
      }));
    };
    
  const handleSelectPatient = (p: any) => {
    setSelectedPatient(p);
    setForm((prev) => ({
      ...prev,
      patient_id: p.id,
      patientEmail: p.email,
      patientName: p.name,
      patientMobile: p.contact_number
    }));
    setPatients([]);
    setPatientSearch("");
  };

  const handleCreatePatient = async () => {
    try {
      const res = await api.post("/api/patients", newPatient);
      handleSelectPatient(res.data);
      setOpenPatientModal(false);
      setNewPatient({ patientName: "", patientEmail: "", patientMobile: "" });
    } catch (err) {
      console.error(err);
    }
  };
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
    // ================= DATE PICKER =================
    useEffect(() => {
      if (!dateRef.current) return;
      const fp = flatpickr(dateRef.current, {
        defaultDate: date || null, 
        minDate: tomorrow,
        disable: [(date) => date.getDay() === 0],
        onChange: (_, dateStr) => {
          handleChange("date", dateStr);
        },
      });

      return () => fp.destroy();
    }, []);

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError({});

    try {
      const payload: any = {
        clinic_id,
        doctor_id,
        date: form.date ?? date,
        time: form.time,
        service: form.service,
      };
      if (mode === "admin") {
        if (!form.patient_id) {
          setError({ patient: "Please select a patient" });
          setLoading(false);
          return;
        }
        payload.patient_id = form.patient_id;
        payload.patientName = form.patientName;
        payload.patientEmail = form.patientEmail;
        payload.patientMobile = form.patientMobile;
      } else {
        payload.patientName = form.patientName;
        payload.patientEmail = form.patientEmail;
        payload.patientMobile = form.patientMobile;
      }

      const result = bookingSchema.safeParse(payload);


      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;

        const formatted: Record<string, string> = {};
        Object.entries(fieldErrors).forEach(([key, value]) => {
          if (value?.length) formatted[key] = value[0];
        });

        setError(formatted);
        setLoading(false);
        return;
      }

      const endpoint = mode === "admin" ? "/api/appointments" : "/api/public/book";
      await api.post(endpoint, payload);
      const msg = mode == 'admin' ? 'Appointment is now listed..':'Appointment is now for admin approval.';
      toast.success(msg);
      onClose?.();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <div className="p-4 bg-white rounded-2xl w-full text-black">
  //     <form className="space-y-5" onSubmit={handleSubmit}>

  //       {/* ================= ADMIN PATIENT ================= */}
  //       {mode === "admin" && (
  //         <div>
  //           <p className="text-left">Patient</p>

  //           <input
  //             value={patientSearch}
  //             onChange={(e) => setPatientSearch(e.target.value)}
  //             placeholder="Search patient..."
  //             className="w-full border p-2 rounded"
  //           />

  //           {patients.length > 0 && (
  //             <div className="border mt-1 rounded max-h-40 overflow-auto">
  //               {patients.map((p) => (
  //                 <div
  //                   key={p.id}
  //                   onClick={() => handleSelectPatient(p)}
  //                   className="p-2 hover:bg-gray-100 cursor-pointer"
  //                 >
  //                   {p.name} - {p.email}
  //                 </div>
  //               ))}
  //             </div>
  //           )}

  //           {selectedPatient && (
  //             <div className="mt-2 p-2 bg-green-50 rounded text-sm">
  //               Selected: {selectedPatient.name}
  //             </div>
  //           )}

  //           {error.patient && (
  //             <p className="text-xs text-red-500 mt-1">
  //               {error.patient}
  //             </p>
  //           )}

  //           <button
  //             type="button"
  //             onClick={() => setOpenPatientModal(true)}
  //             className="text-sm text-blue-600 mt-2"
  //           >
  //             + Add new patient
  //           </button>
  //         </div>
  //       )}

  //       {/* DATE + TIME */}
  //       <div className="flex gap-4">
  //         <div className="w-full">
  //           <p className="text-left">Date</p>
  //           <input
  //             ref={dateRef}
  //             placeholder="Select Date"
  //             className={`w-full border p-2 h-[45px] rounded ${
  //               error.date ? "border-red-300" : ""
  //             }`}
  //             readOnly
  //           />
  //           {error.date && (
  //             <p className="text-xs text-red-500 mt-1">
  //               {error.date}
  //             </p>
  //           )}
  //         </div>

  //         <div className="w-full">
  //           <p className="text-left">Time</p>
  //           <TimeDropdown
  //             onChange={(val) => handleChange("time", val)}
  //             classes={error.time ? "border-red-300" : ""}
  //           />
  //           {error.time && (
  //             <p className="text-xs text-red-500 mt-1">
  //               {error.time}
  //             </p>
  //           )}
  //         </div>
  //       </div>

  //       {/* ================= PUBLIC FIELDS ================= */}
  //       {mode === "public" && (
  //         <>
  //           <div>
  //             <p className="text-left">Full Name</p>
  //             <input
  //               value={form.patientName}
  //               placeholder="Full Name"
  //               onChange={(e) =>
  //                 handleChange("patientName", e.target.value)
  //               }
  //               className={`w-full border p-2 rounded ${
  //                 error.patientName ? "border-red-300" : ""
  //               }`}
  //             />
  //             {error.patientName && (
  //               <p className="text-xs text-red-500 mt-1">
  //                 {error.patientName}
  //               </p>
  //             )}
  //           </div>

  //           <div>
  //             <p className="text-left">Email</p>
  //             <input
  //               value={form.patientEmail}
  //               placeholder="Email"
  //               onChange={(e) =>
  //                 handleChange("patientEmail", e.target.value)
  //               }
  //               className={`w-full border p-2 rounded ${
  //                 error.patientEmail ? "border-red-300" : ""
  //               }`}
  //             />
  //             {error.patientEmail && (
  //               <p className="text-xs text-red-500 mt-1">
  //                 {error.patientEmail}
  //               </p>
  //             )}
  //           </div>

  //           <div>
  //             <p className="text-left">Mobile Number</p>
  //             <input
  //               value={form.patientMobile}
  //               placeholder="Mobile Number"
  //               onChange={(e) =>
  //                 handleChange("patientMobile", e.target.value)
  //               }
  //               className={`w-full border p-2 rounded ${
  //                 error.patientMobile ? "border-red-300" : ""
  //               }`}
  //             />
  //             {error.patientMobile && (
  //               <p className="text-xs text-red-500 mt-1">
  //                 {error.patientMobile}
  //               </p>
  //             )}
  //           </div>
  //         </>
  //       )}

  //       {/* SERVICE */}
  //       <div>
  //         <p className="text-left">Service</p>
  //         <select
  //           value={form.service}
  //           onChange={(e) => handleChange("service", e.target.value)}
  //           className={`w-full border p-2 rounded ${
  //             error.service ? "border-red-300" : ""
  //           }`}
  //         >
  //           <option value="">Select Service</option>
  //           {services.map((s: any) => (
  //             <option key={s.id} value={s.id}>
  //               {s.service.name} - {s.price}
  //             </option>
  //           ))}
  //         </select>

  //         {error.service && (
  //           <p className="text-xs text-red-500 mt-1">
  //             {error.service}
  //           </p>
  //         )}
  //       </div>
        
  //       {/* ATTACHMENT */}
  //       <div>
  //         <p className="text-left">Attachment (optional)</p>

  //         <input
  //           type="file"
  //           accept=".jpg,.jpeg,.png,.pdf"
  //           onChange={(e) => {
  //             if (e.target.files?.[0]) {
  //               setAttachment(e.target.files[0]);
  //             }
  //           }}
  //           className="w-full border p-2 rounded"
  //         />
  //         {attachment && (
  //           <p className="text-xs text-gray-500 mt-1">
  //             Selected: {attachment.name}
  //           </p>
  //         )}
  //       </div>

  //       {/* SUBMIT */}
  //       <button
  //         disabled={loading}
  //         type="submit"
  //         className={`w-full bg-green-600 text-white py-3 rounded-sm ${
  //           theme?.primary || "bg-green-600"
  //         }`}
  //       >
  //         {loading
  //           ? "Processing..."
  //           : mode === "admin"
  //           ? "Create Appointment"
  //           : "Submit Request"}
  //       </button>
  //     </form>

  //     {/* ================= MODAL ================= */}
  //     {openPatientModal && (
  //       <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
  //         <div className="bg-white p-4 rounded w-[400px] space-y-3">
  //           <h2 className="font-semibold">Add Patient</h2>

  //           <input
  //             placeholder="Name"
  //             onChange={(e) =>
  //               setNewPatient({ ...newPatient, name: e.target.value })
  //             }
  //             className="w-full border p-2 rounded"
  //           />

  //           <input
  //             placeholder="Email"
  //             onChange={(e) =>
  //               setNewPatient({ ...newPatient, email: e.target.value })
  //             }
  //             className="w-full border p-2 rounded"
  //           />

  //           <input
  //             placeholder="Mobile"
  //             onChange={(e) =>
  //               setNewPatient({ ...newPatient, mobile: e.target.value })
  //             }
  //             className="w-full border p-2 rounded"
  //           />

  //           <div className="flex gap-2">
  //             <button
  //               onClick={handleCreatePatient}
  //               className="bg-green-600 text-white p-2 rounded w-full"
  //             >
  //               Save
  //             </button>

  //             <button
  //               onClick={() => setOpenPatientModal(false)}
  //               className="bg-gray-300 p-2 rounded w-full"
  //             >
  //               Cancel
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div className="py-2 bg-white rounded-2xl w-full text-black flex flex-col max-h-[90vh]">

      {/* ================= FORM (SCROLL AREA ONLY) ================= */}
      <form
        id="booking-form"
        onSubmit={handleSubmit}
        className="space-y-5 overflow-y-auto flex-1 pr-1"
      >

        {/* ================= ADMIN PATIENT ================= */}
        {mode === "admin" && (
          <div>
            <p className="text-left">Patient</p>

            <input
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
              placeholder="Search patient..."
              className="w-full border p-2 rounded"
            />

            {/* SEARCH RESULTS */}
            {patients.length > 0 && (
              <div className="border mt-1 rounded max-h-40 overflow-auto">
                {patients.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectPatient(p)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {p.name} - {p.email}
                  </div>
                ))}
              </div>
            )}

            {/* SELECTED PATIENT */}
            {selectedPatient && (
              <div className="mt-2 p-2 bg-green-50 rounded text-sm">
                Selected: {selectedPatient.name}
              </div>
            )}

            {/* ❗ RESTORED ERROR HANDLER */}
            {error.patient && (
              <p className="text-xs text-red-500 mt-1">
                {error.patient}
              </p>
            )}

            <button
              type="button"
              onClick={() => setOpenPatientModal(true)}
              className="text-sm text-blue-600 mt-2"
            >
              + Add new patient
            </button>
          </div>
        )}

        {/* ================= DATE + TIME ================= */}
        <div className="flex gap-4 mb-1">
          <div className="w-full">
            <p className="text-left">Date</p>
            <input
              ref={dateRef}
              placeholder="Select Date"
              readOnly
              className={`w-full border p-2 h-[45px] rounded ${
                error.date ? "border-red-300" : ""
              }`}
            />
            {/* ❗ RESTORED ERROR */}
            {error.date && (
              <p className="text-xs text-red-500 mt-1 text-left">
                {error.date}
              </p>
            )}
          </div>

          <div className="w-full">
            <p className="text-left">Time</p>
            <TimeDropdown
              onChange={(val:string) => handleChange("time", val)}
              classes={error.time ? "border-red-300" : ""}
            />
            {/* ❗ RESTORED ERROR */}
            {error.time && (
              <p className="text-xs text-red-500 mt-1 text-left">
                {error.time}
              </p>
            )}
          </div>
        </div>

        {/* ================= PUBLIC FIELDS ================= */}
        {mode === "public" && (
          <>
            <div className="mb-1">
              <p className="text-left">Full Name</p>
              <input
                value={form.patientName}
                placeholder="Full Name"
                onChange={(e) =>
                  handleChange("patientName", e.target.value)
                }
                className={`w-full border p-2 rounded ${
                  error.patientName ? "border-red-300" : ""
                }`}
              />
              {/* ❗ RESTORED ERROR */}
              {error.patientName && (
                <p className="text-xs text-red-500 mt-1 text-left">
                  {error.patientName}
                </p>
              )}
            </div>

            <div className="mb-1">
              <p className="text-left">Email</p>
              <input
                value={form.patientEmail}
                placeholder="Email"
                onChange={(e) =>
                  handleChange("patientEmail", e.target.value)
                }
                className={`w-full border p-2 rounded ${
                  error.patientEmail ? "border-red-300" : ""
                }`}
              />
              {/* ❗ RESTORED ERROR */}
              {error.patientEmail && (
                <p className="text-xs text-red-500 mt-1 text-left">
                  {error.patientEmail}
                </p>
              )}
            </div>

            <div className="mb-1">
              <p className="text-left">Mobile Number</p>
              <input
                value={form.patientMobile}
                placeholder="Mobile Number"
                onChange={(e) =>
                  handleChange("patientMobile", e.target.value)
                }
                className={`w-full border p-2 rounded ${
                  error.patientMobile ? "border-red-300" : ""
                }`}
              />
              {/* ❗ RESTORED ERROR */}
              {error.patientMobile && (
                <p className="text-xs text-red-500 mt-1 text-left">
                  {error.patientMobile}
                </p>
              )}
            </div>
          </>
        )}

        {/* ================= SERVICE ================= */}
        <div className="mb-1">
          <p className="text-left">Service</p>
          <select
            value={form.service}
            onChange={(e) => handleChange("service", e.target.value)}
            className={`w-full border p-2 rounded ${
              error.service ? "border-red-300" : ""
            }`}
          >
            <option value="">Select Service</option>
            {services.map((s: any) => (
              <option key={s.id} value={s.id}>
                {s.service.name} - {s.price}
              </option>
            ))}
          </select>

          {/* ❗ RESTORED ERROR */}
          {error.service && (
            <p className="text-xs text-red-500 mt-1 text-left">
              {error.service}
            </p>
          )}
        </div>

        {/* ================= ATTACHMENT ================= */}
        {/* <div className="mb-1">
          <p className="text-left">Attachment (optional)</p>

          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setAttachment(e.target.files[0]);
              }
            }}
            className="w-full border p-2 rounded"
          />

          {attachment && (
            <p className="text-xs text-gray-500 mt-1 text-left">
              Selected: {attachment.name}
            </p>
          )}
        </div> */}

      </form>

      {/* ================= STICKY FOOTER ================= */}
      <div className="pt-3 border-t bg-white">
        <button
          disabled={loading}
          type="submit"
          form="booking-form"
          className={`w-full cursor-potiner text-white py-3 rounded-sm ${theme.button}`}
        >
          {loading
            ? "Processing..."
            : mode === "admin"
            ? "Create Appointment"
            : "Submit Request"}
        </button>
      </div>

      {/* ================= MODAL (UNCHANGED) ================= */}
      {openPatientModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-[400px] space-y-3">
            <h2 className="font-semibold">Add Patient</h2>

            <input
              placeholder="Name"
              onChange={(e) =>
                setNewPatient({ ...newPatient, patientName: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <input
              placeholder="Email"
              onChange={(e) =>
                setNewPatient({ ...newPatient, patientEmail: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <input
              placeholder="Mobile"
              onChange={(e) =>
                setNewPatient({ ...newPatient, patientMobile: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <div className="flex gap-2">
              <button
                onClick={handleCreatePatient}
                className="bg-green-600 text-white p-2 rounded w-full"
              >
                Save
              </button>

              <button
                onClick={() => setOpenPatientModal(false)}
                className="bg-gray-300 p-2 rounded w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
}



