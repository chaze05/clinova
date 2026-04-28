"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

type Availability = {
  id?: number;
  date: string;
  type: "full_day" | "half_day";
  half_day_period: "morning" | "afternoon" | null;
  reason?: string;
};

export default function Availability() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState<Availability>({
    date: "",
    type: "full_day",
    half_day_period: null,
    reason: "",
  });

  const doctorId = 1; // replace with auth context later

  // 🔄 fetch availability
  const fetchAvailability = async () => {
    const res = await axios.get(
      `/api/doctor/${doctorId}/availability`
    );

    const mapped = res.data.map((item: Availability) => ({
      id: item.id,
      title: item.type === "full_day" ? "Unavailable" : "Half Day",
      start: item.date,
      display: "background",
      color: item.type === "full_day" ? "#f87171" : "#fbbf24",
    }));

    setEvents(mapped);
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  // 📅 click date
  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
    setForm({
      date: info.dateStr,
      type: "full_day",
      half_day_period: null,
      reason: "",
    });
    setModalOpen(true);
  };

  // 💾 save availability
  const handleSave = async () => {
    try {
      await axios.post("/api/doctor/availability", {
        doctor_id: doctorId,
        ...form,
      });

      setModalOpen(false);
      fetchAvailability();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          height="auto"
        />
      </div>

      {/* Info Panel */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold text-lg mb-2">
          Availability Rules
        </h2>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>🔴 Red = Fully unavailable</li>
          <li>🟡 Yellow = Half-day unavailable</li>
          <li>Click a date to add exception</li>
        </ul>
      </div>
    </div>
  );
}