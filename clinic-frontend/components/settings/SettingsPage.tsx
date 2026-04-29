"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Availability from "./Availability";
import Profile from "./Profile";
import Reports from "./Reports";
import GeneralSettings from "./GeneralSettings";

// type Availability = {
//   id?: number;
//   date: string;
//   type: "full_day" | "half_day";
//   half_day_period: "morning" | "afternoon" | null;
//   reason?: string;
// };

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"availability" | "profile" | "reports" | 'settings'>(
    "profile"
  );
  //   const isPro = false;;

  // const [events, setEvents] = useState<any[]>([]);
  // const [selectedDate, setSelectedDate] = useState<string | null>(null);
  // const [modalOpen, setModalOpen] = useState(false);

  // const [form, setForm] = useState<Availability>({
  //   date: "",
  //   type: "full_day",
  //   half_day_period: null,
  //   reason: "",
  // });

  // // const doctorId = 1; // replace with auth context later

  // // 🔄 fetch availability
  // const fetchAvailability = async () => {
  //   const res = await axios.get(
  //     `/api/doctor/${doctorId}/availability`
  //   );

  //   const mapped = res.data.map((item: Availability) => ({
  //     id: item.id,
  //     title: item.type === "full_day" ? "Unavailable" : "Half Day",
  //     start: item.date,
  //     display: "background",
  //     color: item.type === "full_day" ? "#f87171" : "#fbbf24",
  //   }));

  //   setEvents(mapped);
  // };

  // useEffect(() => {
  //   fetchAvailability();
  // }, []);

  // 📅 click date
  // const handleDateClick = (info: any) => {
  //   setSelectedDate(info.dateStr);
  //   setForm({
  //     date: info.dateStr,
  //     type: "full_day",
  //     half_day_period: null,
  //     reason: "",
  //   });
  //   setModalOpen(true);
  // };

  // 💾 save availability
  // const handleSave = async () => {
  //   try {
  //     await axios.post("/api/doctor/availability", {
  //       doctor_id: doctorId,
  //       ...form,
  //     });
  //     setModalOpen(false);
  //     fetchAvailability();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const ProBadge = () => (
  //   <span className="text-[10px] bg-yellow-400 text-black px-2 py-0.5 rounded-full font-bold">
  //     PRO
  //   </span>
  // );
  return (
    <div className="p-6">
        {/* Header */}
        <div className="mb-6 mt-0">
            <h1 className="text-3xl mt-0 font-semibold flex items-center gap-2 flex flex-col items-start">
            Settings
            <span className="text-xs text-gray-400 font-normal">
                Manage your clinic preferences
            </span>
            </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b mb-6">

            {/* Availability */}
            {/* <button
            onClick={() => setActiveTab("availability")}
            className={`pb-2 transition ${
                activeTab === "availability"
                ? "border-b-2 border-green-500 font-semibold text-black"
                : "text-gray-500 hover:text-black"
            }`}
            >
            Availability
            </button> */}

            {/* Profile */}
            <button
            onClick={() => setActiveTab("profile")}
            className={`pb-2 transition ${
                activeTab === "profile"
                ? "border-b-2 border-green-500 font-semibold text-black"
                : "text-gray-500 hover:text-black"
            }`}
            >
            Doctor
            </button>

            {/* Reports (PRO) */}
            {/* <button
            onClick={() => {
                if (!isPro) return;
                setActiveTab("reports");
            }}
            className={`pb-2 flex items-center gap-1 transition ${
                activeTab === "reports"
                ? "border-b-2 border-green-500 font-semibold text-black"
                : "text-gray-500 hover:text-black"
            } ${!isPro ? "opacity-60 cursor-not-allowed" : ""}`}
            >
            Reports {!isPro && <ProBadge />}
            </button> */}

            {/* Settings (example extra tab) */}
            <button
            onClick={() => setActiveTab("settings")}
            className={`pb-2 flex items-center gap-1 transition ${
                activeTab === "settings"
                ? "border-b-2 border-green-500 font-semibold text-black"
                : "text-gray-500 hover:text-black"
            }`}
            >
            Clinic
            </button>

        </div>

        {/* Availability Tab */}
        {/* {activeTab === "availability" && <Availability />} */}
        {activeTab === "profile" && <Profile />}
        {activeTab === "settings" && <GeneralSettings />}
        {/* {activeTab === "reports" && <Reports isPro={isPro} title={''} children={} />} */}
    </div>
  );
}