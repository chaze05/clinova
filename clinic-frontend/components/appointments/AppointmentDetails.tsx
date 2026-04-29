"use client";

import { useState } from "react";
import { CheckCircle2, Divide } from "lucide-react";

const ProBadge = () => (
  <span className="ml-2 inline-flex items-center text-[10px] font-bold px-2 py-[2px] rounded-full
    bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500
    text-black shadow-sm">
    PRO
  </span>
);

export default function AppointmentDetails({
  appointment,
}: {
  appointment?:Record<any,any>;
}) {
  
  const [loading, setLoading] = useState(false);
  console.log(appointment.description);
  const handleNotify = async () => {
    try {
      setLoading(true);

      await fetch("/api/appointments/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId: appointment?.id,
          patientEmail: appointment?.patientEmail,
          patientName: appointment?.patientName,
          date: appointment?.date,
          startTime: appointment?.startTime,
          endTime: appointment?.endTime,
          doctorName: appointment?.doctorName,
        }),
      });

      alert("Notification sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to send notification.");
    } finally {
      setLoading(false);
    }
  };


  function formatDate(date:string){
    const rawDate = new Date(date);

    const formatted = rawDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formatted;
  }
  function formatTime(time24: string) {
    const [hour, minute] = time24.split(":").map(Number);

    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;

    return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
  }

  return (
    <div className="flex justify-center pb-3">
      <div className="w-full space-y-4">

        {/* Status */}
        <div className="flex justify-between items-center">
          <span className="inline-flex items-center px-2 py-1 text-[14px] font-semibold rounded-full bg-green-100 text-green-700">
            ✔ Approved
          </span>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-2 gap-3">

          <div className="rounded-lg border bg-gray-50 p-3">
            <p className="text-[13px] text-gray-500">Patient</p>
            <p className="font-semibold text-sm text-gray-900">
              {appointment?.patient?.name || "John Doe"}
            </p>
            <p className="text-xs text-gray-600">
              {appointment?.patient?.contact_number || "+63 900 000 0000"}
            </p>
          </div>

          <div className="rounded-lg border bg-gray-50 p-3">
            <p className="text-[13px] text-gray-500">Doctor</p>
            <p className="font-semibold text-sm text-gray-900 flex items-center">
              {appointment?.doctor?.name || "Dr. Smith"}
              <ProBadge />
            </p>
          </div>

          <div className="rounded-lg border bg-gray-50 p-3 col-span-2">
            <p className="text-[13px] text-gray-500">Schedule</p>
            <p className="text-sm text-gray-800">
              📅 {formatDate(appointment?.appointment_date) || "2026-04-24"}
            </p>
            <p className="text-sm text-gray-800">
              ⏰ {formatTime(appointment?.start_time) || "10:00 AM"}
            </p>
          </div>

          <div className="rounded-lg border bg-gray-50 p-3 col-span-2">

            <p className="text-sm text-black">
              <label htmlFor="">Service: <br /></label> 
              {appointment?.service.description || "General check-up and consultation"}
            </p>
            <p>
              <label htmlFor="">Reason: <br /></label> 
              {appointment?.description && 
                <span className="block">
                  {appointment?.description }
                </span>
              }
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-1">

          <button
            onClick={handleNotify}
            disabled
            className="py-2 rounded-lg bg-gray-700 text-white text-sm hover:bg-gray-700 transition  cursor-not-allowed"
          >
            {/* {loading ? "Sending..." : "📩 Email Patient"} */}
            <ProBadge /> Email Patient
          </button>

          <button
            disabled
            className="py-2 rounded-lg bg-gray-700 text-white text-sm cursor-not-allowed flex items-center justify-center gap-1"
          >
            <ProBadge /> SMS
          </button>

          <button
            className="col-span-2 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={16} />
            {loading ? "Processing..." : "Complete Operation"}
          </button>

        </div>
      </div>
    </div>
  );
}