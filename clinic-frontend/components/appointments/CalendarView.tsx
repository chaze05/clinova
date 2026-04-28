// "use client";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { use, useEffect, useState } from "react";
// import api from "@/lib/api";
// import Modal from "../ui/modal/Modal";
// import ModalHeader from "../ui/modal/ModalHeader";
// import ModalBody from "../ui/modal/ModalBody";
// import AppointmentDetails from "./AppointmentDetails";
// import BookingForm from "../forms/BookingForm";
// import { getClinicData } from "@/lib/auth";
// import { useAuthStore } from "@/store/auth.store";

// export default function ApprovedCalendar() {
//   const [events, setEvents] = useState([]);
//   const [open,setOpen]  = useState(false);
//   const [appointment, setAppointment] = useState<AppointmentState | null>(null);
//   const [view, setView] = useState<"details" | "request">("details");
//   const [date,setDate] = useState<string>();

//   const tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate() + 1);
//   tomorrow.setHours(0, 0, 0, 0);

//   const user = useAuthStore((s) => s.user);
//   const [clinicData, setClinicData] = useState<any>(null);

//   useEffect(() => {
//     if (!user?.clinic_id) return;

//     getClinicData(user.clinic_id)
//       .then(setClinicData)
//       .catch(console.error);
//     }, [user?.clinic_id]);

//   type AppointmentState = {
//     [key: string]: any; // for extendedProps flexibility
//   };

//   const fetchApproved = async () => {

//       const res = await api.get('/api/appointments', {
//         params: { status: 'confirmed' }
//       });

//       // setEvents(res.data);
//       const data = await res.data;
//       const mapped = data.map((appt: any) => ({
//         id: appt.id,
//         date:appt.appointment_date,
//         title: appt.patient.name,
//         start: `${appt.appointment_date}T${appt.start_time}`,
//         backgroundColor: "#22c55e", // green
//         borderColor: "#22c55e",
//         cursor:'pointer',
//         extendedProps: appt
//       }));

//       setEvents(mapped);
//   };

//   useEffect(() => {
//     fetchApproved();
//   }, []);

//   return (
//     <>
//     <FullCalendar

//       plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//       initialView="dayGridMonth"
//       displayEventTime = {false}
//       headerToolbar={{
//         left: "prev,next today",
//         center: "title",
//         right: "dayGridMonth,timeGridWeek,timeGridDay",
//       }}
//       eventDisplay="block"
//       events={events}
//       height="auto"
//       eventClick={(info) => {
//         setOpen(true);
//         setView('details');
//         setAppointment({...info.event.extendedProps});
//       }}
//       validRange={{
//         start: tomorrow.toLocaleDateString("en-CA").split("T")[0],
//       }}
//       selectMirror={true}
//       allDaySlot={false}
//       slotLabelInterval="00:30:00"
//       slotDuration="00:30:00"
//       slotMinTime="08:00:00"
//       slotMaxTime="17:00:00"  
//       selectable={true}
//       snapDuration="00:30:00"
//       dateClick={(info) => {
//         const date = info.dateStr.split("T")[0];

//         setOpen(true);
//         setView("request");
//         setDate(date);
//       }}
//       dayCellContent={(arg) => {
//         return (
//           <div style={{ position: "relative"}}>
//             {/* DATE NUMBER */}
//             <div>{arg.dayNumberText}</div>

//             {/* ADD BUTTON */}
//             <button
//               style={{
//                 fontSize: 10,
//                 marginTop: 4,
//                 padding: "2px 4px",
//                 background: "#2563eb",
//                 color: "#fff",
//                 borderRadius: 4,
//                 display:arg.date < tomorrow ? 'none' : 'block',
//                 cursor: "pointer",
//               }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 const date = arg.date.toLocaleDateString("en-CA").split("T")[0];
//                 setOpen(true);
//                 setView('request');
//                 setDate(date);
//               }}
//             >
//               + Add
//             </button>
//           </div>
//         );
//       }}
//     />
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <ModalHeader title="Appointment Details" />
//         <ModalBody>
//           {view == "details" ? <AppointmentDetails appointment={appointment} /> : <BookingForm mode={'admin'} date={date} clinicData={clinicData} theme={{} as any} onClose={() => {setOpen(false); fetchApproved();}} /> }
//         </ModalBody>
//       </Modal>
//     </>
//   );
// }

"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Modal from "../ui/modal/Modal";
import ModalHeader from "../ui/modal/ModalHeader";
import ModalBody from "../ui/modal/ModalBody";
import AppointmentDetails from "./AppointmentDetails";
import BookingForm from "../forms/BookingForm";
import { getClinicData } from "@/lib/auth";
import { useAuthStore } from "@/store/auth.store";
import { useRef } from "react";


export default function ApprovedCalendar() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [appointment, setAppointment] = useState<any>(null);
  const [view, setView] = useState<"details" | "request">("details");
  const [date, setDate] = useState<string>();
  const calendarRef = useRef<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  const user = useAuthStore((s) => s.user);
  const [clinicData, setClinicData] = useState<any>(null);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const check = () => setIsMobile(window.innerWidth < 768);
  // =========================
  // MOBILE DETECTION
  // =========================
  useEffect(() => {
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);

  }, [isMobile]);

  // =========================
  // CLINIC DATA
  // =========================
  useEffect(() => {
    if (!user?.clinic_id) return;

    getClinicData(user.clinic_id)
      .then(setClinicData)
      .catch(console.error);
  }, [user?.clinic_id]);

  // =========================
  // FETCH APPOINTMENTS
  // =========================
  const fetchApproved = async () => {
    const res = await api.get("/api/appointments", {
      params: { status: "confirmed" },
    });

    const data = await res.data;

    const mapped = data.map((appt: any) => ({
      id: appt.id,
      title: appt.patient.name,
      start: `${appt.appointment_date}T${appt.start_time}`,
      backgroundColor: "#22c55e",
      borderColor: "#22c55e",
      extendedProps: appt,
    }));

    setEvents(mapped);
  };

  useEffect(() => {
    fetchApproved();
  }, []);

  // =========================
  // CALENDAR CLICK
  // =========================
  const handleEventClick = (info: any) => {
    setOpen(true);
    setView("details");
    setAppointment({ ...info.event.extendedProps });
  };

  const handleDateClick = (info: any) => {
    const date = info.dateStr.split("T")[0];
    setOpen(true);
    setView("request");
    setDate(date);
  };

  // =========================
  // UI
  // =========================
  // useEffect(() => {
  //   const calendarApi = calendarRef.current?.getApi();
  //   if (!calendarApi) return;

  //   if (isMobile) {
  //     calendarApi.changeView("listWeek");
  //   } else {
  //     calendarApi.changeView("dayGridMonth");
  //   }
  // }, [isMobile]);

    useEffect(() => {
    const api = calendarRef.current?.getApi();
    if (!api) return;

    api.changeView(isMobile ? "listWeek" : "dayGridMonth");
  }, [isMobile]);
  return (
    <>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"      
        height="auto"
        displayEventTime={false}
        eventDisplay="block"
        events={events}
        selectable={true}
        selectMirror={true}
        allDaySlot={false}
        slotLabelInterval="00:30:00"
        slotDuration="00:30:00"
        slotMinTime="08:00:00"
        slotMaxTime="17:00:00"
        snapDuration="00:30:00"
        validRange={{
          start: tomorrow.toLocaleDateString("en-CA"),
        }}

        headerToolbar={{
          left: isMobile ? "prev,next" : "prev,next today",
          center: "title",
          right: isMobile
            ? "listWeek,timeGridDay"
            : "dayGridMonth,timeGridWeek,timeGridDay",
        }}

        eventClick={handleEventClick}
        dateClick={handleDateClick}

        eventDidMount={(info) => {
          if (isMobile) {
            info.el.style.fontSize = "12px";
            info.el.style.padding = "2px 4px";
          }
        }}
      />

      {/* =========================
          MODAL
      ========================= */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-full max-w-2xl mx-auto px-3 sm:px-6">
          <ModalHeader title="Appointment Details" />

          <ModalBody>
            {view === "details" ? (
              <AppointmentDetails appointment={appointment} />
            ) : (
              <BookingForm
                mode="admin"
                date={date}
                clinicData={clinicData}
                theme={{} as any}
                onClose={() => {
                  setOpen(false);
                  fetchApproved();
                }}
              />
            )}
          </ModalBody>
        </div>
      </Modal>
    </>
  );
}