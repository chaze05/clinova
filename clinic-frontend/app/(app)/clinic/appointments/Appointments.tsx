"use client";

import { useEffect, useState } from "react";
import RequestsTable from "@/components/appointments/RequestsTable";
import CalendarView from "@/components/appointments/CalendarView";
import api from "@/lib/api";

export type Patient = {
  id:number,
  name:string,
  mobile:string,
}
export type Appointment = {
  id: number;
  patient:Patient[],
  date: string;
  time: string;
  notes?: string;
  status: "pending" | "rejected";
};

export default function AppointmentsClient() {
  const [view, setView] = useState<"requests" | "calendar">("requests");
  const [data, setData] = useState<Appointment[]>([]);

  // const fetchAll = async () => {
  //   const res = await api.get("/api/appointments");
  //   setData(res.data);
  // };

  // useEffect(() => {
  //   fetchAll();

  //   // 🔁 Real-time sync (polling every 10s for MVP)
  //   const interval = setInterval(fetchAll, 10000);

  //   return () => clearInterval(interval);
  // }, []);
  
  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Appointments</h1>

        <div className="bg-gray-100 p-1 rounded-xl flex">
          <button
            onClick={() => setView("requests")}
            className={`px-4 py-2 rounded-lg ${
              view === "requests" ? "bg-yellow-400 shadow" : ""
            }`}
          >
            Requests
          </button>

          <button
            onClick={() => setView("calendar")}
            className={`px-4 py-2 rounded-lg ${
              view === "calendar" ? "bg-emerald-400 shadow" : ""
            }`}
          >
            Approved
          </button>
        </div>
      </div>

      {/* Content */}
      {view === "requests" ? <RequestsTable /> : <CalendarView />}
    </div>
  );
}