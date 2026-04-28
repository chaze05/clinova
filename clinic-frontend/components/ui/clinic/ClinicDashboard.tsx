  // // "use client";

  // // import { useEffect, useMemo, useState } from "react";
  // // import { Card, CardContent } from "@/components/ui/card";
  // // import {
  // //   Building2,
  // //   User,
  // //   Calendar,
  // //   Activity,
  // //   TrendingUp,
  // //   Stethoscope,
  // //   Users,
  // // } from "lucide-react";
  // // import api from "@/lib/api";
  // // import { getClinicData } from "@/lib/auth";


  // // export default function ClinicDashboard() {
  // //   const [clinicData, setClinicData] = useState([]);
  // //   const [token, setToken] = useState<string | null>(null);
  // //   const [clinicId, setClinicId] = useState<number | null>(null);

  // //   useEffect(() => {
  // //     const storedToken = localStorage.getItem("token");
  // //     const storedID = localStorage.getItem("clinic_id");
  // //     setToken(storedToken);
  // //     setClinicId(storedID);
  // //   }, []);

  // //     useEffect(() => {
  // //         if (!token) return;
  // //         getClinicData(token,clinicId)
  // //         .then((data) => setClinicData(data))
  // //         .catch((err) => console.error(err));
  // //     }, [token]);
  // //     // Single clinic context (current logged-in clinic)

  // //     const clinic = useMemo(
  // //         () => ({
  // //         name: "Clinova Medical Clinic",
  // //         address: "Angeles City, Pampanga",
  // //         status: "Active",
  // //         doctor: {
  // //             name: "Dr. John Doe",
  // //             specialization: "General Medicine",
  // //         },
  // //         secretary: {
  // //             name: "Jane Smith",
  // //         },
  // //         stats: {
  // //             patients: 124,
  // //             appointmentsToday: 8,
  // //             monthlyVisits: 320,
  // //             systemHealth: "99%",
  // //         },
  // //         }),
  // //         []
  // //     );

  // //     const statsCards = useMemo(
  // //         () => [
  // //         {
  // //             title: "Total Patients",
  // //             value: clinic.stats.patients,
  // //             icon: Users,
  // //             gradient: "from-emerald-400 to-emerald-600",
  // //         },
  // //         {
  // //             title: "Appointments Today",
  // //             value: clinic.stats.appointmentsToday,
  // //             icon: Calendar,
  // //             gradient: "from-blue-400 to-blue-600",
  // //         },
  // //         {
  // //             title: "Monthly Visits",
  // //             value: clinic.stats.monthlyVisits,
  // //             icon: TrendingUp,
  // //             gradient: "from-purple-400 to-purple-600",
  // //         },
  // //         {
  // //             title: "System Health",
  // //             value: clinic.stats.systemHealth,
  // //             icon: Activity,
  // //             gradient: "from-orange-400 to-orange-600",
  // //         },
  // //         ],
  // //         [clinic]
  // //     );

  // //     return (
  // //         <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
  // //         {/* Header */}
  // //         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
  // //             <div>
  // //             <h1 className="text-3xl font-bold text-slate-800">
  // //                 Clinic Dashboard
  // //             </h1>
  // //             <p className="text-slate-500">
  // //                 Overview of your clinic operations and performance
  // //             </p>
  // //             </div>

  // //             <div className="mt-3 md:mt-0 px-4 py-2 rounded-xl bg-white border shadow-sm">
  // //             <span className="text-sm text-slate-600">Status: </span>
  // //             <span className="text-emerald-600 font-semibold">
  // //                 {clinic.status}
  // //             </span>
  // //             </div>
  // //         </div>

  // //         {/* Clinic Info */}
  // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
  // //             <Card className="rounded-2xl border-0 shadow-lg bg-white/70 backdrop-blur-xl">
  // //             <CardContent className="p-5 flex items-center gap-4">
  // //                 <div className="p-3 rounded-xl bg-emerald-500 text-white">
  // //                 <Building2 className="w-5 h-5" />
  // //                 </div>
  // //                 <div>
  // //                 <p className="text-sm text-slate-500">Clinic Name</p>
  // //                 <p className="font-semibold text-slate-800">
  // //                     {clinic.name}
  // //                 </p>
  // //                 <p className="text-xs text-slate-500">
  // //                     {clinic.address}
  // //                 </p>
  // //                 </div>
  // //             </CardContent>
  // //             </Card>

  // //             <Card className="rounded-2xl border-0 shadow-lg bg-white/70 backdrop-blur-xl">
  // //             <CardContent className="p-5 flex items-center gap-4">
  // //                 <div className="p-3 rounded-xl bg-blue-500 text-white">
  // //                 <Stethoscope className="w-5 h-5" />
  // //                 </div>
  // //                 <div>
  // //                 <p className="text-sm text-slate-500">Doctor</p>
  // //                 <p className="font-semibold text-slate-800">
  // //                     {clinic.doctor.name}
  // //                 </p>
  // //                 <p className="text-xs text-slate-500">
  // //                     {clinic.doctor.specialization}
  // //                 </p>
  // //                 </div>
  // //             </CardContent>
  // //             </Card>

  // //             <Card className="rounded-2xl border-0 shadow-lg bg-white/70 backdrop-blur-xl">
  // //             <CardContent className="p-5 flex items-center gap-4">
  // //                 <div className="p-3 rounded-xl bg-purple-500 text-white">
  // //                 <User className="w-5 h-5" />
  // //                 </div>
  // //                 <div>
  // //                 <p className="text-sm text-slate-500">Secretary</p>
  // //                 <p className="font-semibold text-slate-800">
  // //                     {clinic.secretary.name}
  // //                 </p>
  // //                 </div>
  // //             </CardContent>
  // //             </Card>
  // //         </div>

  // //         {/* Stats */}
  // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  // //             {statsCards.map((stat, i) => {
  // //             const Icon = stat.icon;
  // //             return (
  // //                 <Card
  // //                 key={i}
  // //                 className="rounded-2xl border-0 shadow-lg bg-white/70 backdrop-blur-xl"
  // //                 >
  // //                 <CardContent className="p-5 flex items-center justify-between">
  // //                     <div>
  // //                     <p className="text-sm text-slate-500">{stat.title}</p>
  // //                     <h2 className="text-2xl font-bold text-slate-800">
  // //                         {stat.value}
  // //                     </h2>
  // //                     </div>
  // //                     <div
  // //                     className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-md`}
  // //                     >
  // //                     <Icon className="w-5 h-5" />
  // //                     </div>
  // //                 </CardContent>
  // //                 </Card>
  // //             );
  // //             })}
  // //         </div>
  // //         </div>
  // //     );
  // // }


  // "use client";

  // import { useEffect, useMemo, useState } from "react";
  // import { useAuthStore } from "@/store/auth.store";
  // import { Card, CardContent } from "@/components/ui/card";
  // import {
  //   Building2,
  //   User,
  //   Calendar,
  //   Activity,
  //   TrendingUp,
  //   Stethoscope,
  //   Users,
  // } from "lucide-react";
  // import { getClinicData } from "@/lib/auth";

  // export default function ClinicDashboard() {
  //   const user = useAuthStore((s) => s.user);

  //   const [clinicData, setClinicData] = useState<any>(null);

  //   useEffect(() => {
  //     if (!user?.clinic_id) return;

  //     getClinicData(user.clinic_id)
  //       .then(setClinicData)
  //       .catch(console.error);

  //   }, [user?.clinic_id]);

  //   const clinic = useMemo(() => {
  //     return clinicData ?? {
  //       name: "Loading...",
  //       address: "",
  //       status: "Loading",
  //       doctor: {
  //         name: "",
  //         specialization: "",
  //       },
  //       secretary: {
  //         name: "",
  //       },
  //       stats: {
  //         patients: 0,
  //         appointmentsToday: 0,
  //         monthlyVisits: 0,
  //         systemHealth: "0%",
  //       },
  //     };
  //   }, [clinicData]);

  //   const statsCards = useMemo(
  //     () => [
  //       {
  //         title: "Total Patients",
  //         value: clinic.stats.patients,
  //         icon: Users,
  //         gradient: "from-emerald-400 to-emerald-600",
  //       },
  //       {
  //         title: "Appointments Today",
  //         value: clinic.stats.appointmentsToday,
  //         icon: Calendar,
  //         gradient: "from-blue-400 to-blue-600",
  //       },
  //       {
  //         title: "Monthly Visits",
  //         value: clinic.stats.monthlyVisits,
  //         icon: TrendingUp,
  //         gradient: "from-purple-400 to-purple-600",
  //       },
  //       {
  //         title: "System Health",
  //         value: clinic.stats.systemHealth,
  //         icon: Activity,
  //         gradient: "from-orange-400 to-orange-600",
  //       },
  //     ],
  //     [clinic]
  //   );

  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        
  //       {/* Header */}
  //       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
  //         <div>
  //           <h1 className="text-3xl font-bold text-slate-800">
  //             Clinic Dashboard
  //           </h1>
  //           <p className="text-slate-500">
  //             Overview of your clinic operations and performance
  //           </p>
  //         </div>

  //         <div className="mt-3 md:mt-0 px-4 py-2 rounded-xl bg-white border shadow-sm">
  //           <span className="text-sm text-slate-600">Status: </span>
  //           <span className="text-emerald-600 font-semibold">
  //             {clinic.status}
  //           </span>
  //         </div>
  //       </div>

  //       {/* Clinic Info */}
  //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

  //         <Card className="rounded-2xl border-0 shadow-lg bg-white/70 backdrop-blur-xl">
  //           <CardContent className="p-5 flex items-center gap-4">
  //             <div className="p-3 rounded-xl bg-emerald-500 text-white">
  //               <Building2 className="w-5 h-5" />
  //             </div>
  //             <div>
  //               <p className="text-sm text-slate-500">Clinic Name</p>
  //               <p className="font-semibold text-slate-800">
  //                 {clinic.name}
  //               </p>
  //               <p className="text-xs text-slate-500">
  //                 {clinic.address}
  //               </p>
  //             </div>
  //           </CardContent>
  //         </Card>

  //         <Card className="rounded-2xl border-0 shadow-lg bg-white/70 backdrop-blur-xl">
  //           <CardContent className="p-5 flex items-center gap-4">
  //             <div className="p-3 rounded-xl bg-blue-500 text-white">
  //               <Stethoscope className="w-5 h-5" />
  //             </div>
  //             <div>
  //               <p className="text-sm text-slate-500">Doctor</p>
  //               <p className="font-semibold text-slate-800">
  //                 {clinic.doctor.name}
  //               </p>
  //               <p className="text-xs text-slate-500">
  //                 {clinic.doctor.specialization}
  //               </p>
  //             </div>
  //           </CardContent>
  //         </Card>

  //         <Card className="rounded-2xl border-0 shadow-lg bg-white/70 backdrop-blur-xl">
  //           <CardContent className="p-5 flex items-center gap-4">
  //             <div className="p-3 rounded-xl bg-purple-500 text-white">
  //               <User className="w-5 h-5" />
  //             </div>
  //             <div>
  //               <p className="text-sm text-slate-500">Secretary</p>
  //               <p className="font-semibold text-slate-800">
  //                 {clinic.secretary.name}
  //               </p>
  //             </div>
  //           </CardContent>
  //         </Card>

  //       </div>

  //       {/* Stats */}
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  //         {statsCards.map((stat, i) => {
  //           const Icon = stat.icon;
  //           return (
  //             <Card
  //               key={i}
  //               className="rounded-2xl border-0 shadow-lg bg-white/70 backdrop-blur-xl"
  //             >
  //               <CardContent className="p-5 flex items-center justify-between">
  //                 <div>
  //                   <p className="text-sm text-slate-500">{stat.title}</p>
  //                   <h2 className="text-2xl font-bold text-slate-800">
  //                     {stat.value}
  //                   </h2>
  //                 </div>
  //                 <div
  //                   className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-md`}
  //                 >
  //                   <Icon className="w-5 h-5" />
  //                 </div>
  //               </CardContent>
  //             </Card>
  //           );
  //         })}
  //       </div>

  //     </div>
  //   );
  // }

  // "use client";

  // import { useEffect, useMemo, useState } from "react";
  // import { useAuthStore } from "@/store/auth.store";
  // import { Card, CardContent } from "@/components/ui/card";
  // import {
  //   Building2,
  //   User,
  //   Calendar,
  //   Activity,
  //   TrendingUp,
  //   Stethoscope,
  //   Users,
  //   Check,
  //   X,
  // } from "lucide-react";
  // import { getClinicData } from "@/lib/auth";
  // const ProBadge = () => (
  //   <span className="text-[10px] bg-yellow-400 text-black px-2 py-0.5 rounded-full font-bold ml-1">
  //     PRO
  //   </span>
  // );
  // export default function ClinicDashboard() {
  //   const user = useAuthStore((s) => s.user);
  //   const [clinicData, setClinicData] = useState<any>(null);
  //   useEffect(() => {
  //     if (!user?.clinic_id) return;

  //     getClinicData(user.clinic_id)
  //       .then(setClinicData)
  //       .catch(console.error);
  //   }, [user?.clinic_id]);

  //   const clinic = useMemo(() => {
  //     return (
  //       clinicData ?? {
  //         name: "Loading...",
  //         address: "",
  //         status: "Loading",
  //         doctor: { name: "", specialization: "" },
  //         secretary: { name: "" },
  //         stats: {
  //           patients: 0,
  //           appointmentsToday: 0,
  //           newRequests: 0,
  //           upcoming: 0,
  //         },
  //         newRequestList: [],
  //         appointmentsToday: [],
  //         upcomingAppointments: [],
  //       }
  //     );
  //   }, [clinicData]);

  //   const statsCards = useMemo(
  //     () => [
  //       {
  //         title: "New Requests",
  //         value: clinic.newRequestList.length,
  //         icon: Activity,
  //         gradient: "from-yellow-400 to-yellow-600",
  //       },
  //       {
  //         title: "Appointments Today",
  //         value: clinic.stats.appointmentsToday,
  //         icon: Calendar,
  //         gradient: "from-blue-400 to-blue-600",
  //       },
  //       {
  //         title: "Upcoming",
  //         value: clinic.upcomingAppointments.length,
  //         icon: TrendingUp,
  //         gradient: "from-purple-400 to-purple-600",
  //       },
  //       {
  //         title: "Total Patients",
  //         value: clinic.stats.total_patients,
  //         icon: Users,
  //         gradient: "from-emerald-400 to-emerald-600",
  //       },
  //     ],
  //     [clinic]
  //   );

  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-2 sm:p-4">

  //       {/* Header */}
  //       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
  //         <div>
  //           <h1 className="text-3xl font-bold text-slate-800">
  //             {clinic.clinic?.name || clinic.name} Dashboard
  //           </h1>
  //           <p className="text-slate-500">
  //             Focus on today’s operations and requests
  //           </p>
  //         </div>

  //         <div className="mt-3 md:mt-0 px-4 py-2 rounded-xl bg-white border shadow-sm">
  //           <span className="text-sm text-slate-600">Status: </span>
  //           <span className={`text-emerald-600 font-semibold ${clinic.clinic?.status  ? clinic.clinic?.status ? 'text-emerald-400' : 'text-red-400' : ''}`}>
  //             {clinic.clinic?.status  ? clinic.clinic?.status ? 'Active' : 'Inactive' : clinic.name}
  //           </span>
  //         </div>
  //       </div>

  //       {/* Clinic Info */}
  //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

  //         <Card className="rounded-2xl shadow-lg bg-white/70">
  //           <CardContent className="p-5 flex items-center gap-4">
  //             <div className="p-3 rounded-xl bg-emerald-500 text-white">
  //               <Building2 className="w-5 h-5" />
  //             </div>
  //             <div>
  //               <p className="text-sm text-slate-500">Clinic</p>
  //               <p className="font-semibold">{clinic.clinic?.name}</p>
  //               <p className="text-xs text-slate-500">{clinic.address}</p>
  //             </div>
  //           </CardContent>
  //         </Card>

  //         <Card className="rounded-2xl shadow-lg bg-white/70">
  //           <CardContent className="p-5 flex items-center gap-4">
  //             <div className="p-3 rounded-xl bg-blue-500 text-white">
  //               <Stethoscope className="w-5 h-5" />
  //             </div>
  //             <div>
  //               <p className="text-sm text-slate-500">Doctor</p>
  //               <p className="font-semibold">{clinic.doctor.name}</p>
  //               <p className="text-xs text-slate-500">
  //                 {clinic.doctor.specialization}
  //               </p>
  //             </div>
  //           </CardContent>
  //         </Card>

  //         <Card className="rounded-2xl shadow-lg bg-white/70">
  //           <CardContent className="p-5 flex items-center gap-4">
  //             <div className="p-3 rounded-xl bg-purple-500 text-white">
  //               <User className="w-5 h-5" />
  //             </div>
  //             <div>
  //               <p className="text-sm text-slate-500">Secretary</p>
  //               <p className="font-semibold">{clinic.secretary?.name || 'None'}</p>
  //             </div>
  //           </CardContent>
  //         </Card>

  //       </div>

  //       {/* Stats */}
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  //         {statsCards.map((stat, i) => {
  //           const Icon = stat.icon;
  //           return (
  //             <Card key={i} className="rounded-2xl shadow-lg bg-white/70">
  //               <CardContent className="p-5 flex justify-between items-center">
  //                 <div>
  //                   <p className="text-sm text-slate-500">{stat.title}</p>
  //                   <h2 className="text-2xl font-bold">{stat.value}</h2>
  //                 </div>
  //                 <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white`}>
  //                   <Icon className="w-5 h-5" />
  //                 </div>
  //               </CardContent>
  //             </Card>
  //           );
  //         })}
  //       </div>

  //       {/* Main Sections */}
  //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">

  //         {/* New Requests */}
  //         <Card className="rounded-2xl shadow-lg bg-white/70">
  //           <CardContent className="p-5">
  //             <h2 className="font-semibold mb-3">New Requests</h2>

  //             {clinic.newRequestList.length ? (
  //               clinic.newRequestList.map((req: any) => (
  //                 <div key={req.id} className="flex justify-between py-2 border-b items-center">
  //                   <div className="flex gap-10 justify-between items-center">
  //                     <div>
  //                       <p className="font-medium">{req.patient.name}</p>
  //                     </div>
  //                     <div>
  //                         <p className="font-medium">{req.appointment_date}</p>
  //                     </div>
  //                     <div>
  //                         <p className="font-medium">{req.start_time}</p>
  //                     </div>
  //                     <div>
  //                       <p className="font-medium">{req.service.name}</p>
  //                     </div>
  //                   </div>
  //                   <div className="flex gap-2">
  //                     <button
  //                       onClick={() => handleApprove(item.id)}
  //                       className="cursor-pointer p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition"
  //                       title="Approve"
  //                     >
  //                       <Check size={18} />
  //                     </button>

  //                     <button
  //                       onClick={() => handleReject(item.id)}
  //                       className="cursor-pointer p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
  //                       title="Reject"
  //                     >
  //                       <X size={18} />
  //                     </button>
  //                   </div>
  //                 </div>
  //               ))
  //             ) : (
  //               <p className="text-sm text-slate-400">No new requests</p>
  //             )}
  //           </CardContent>
  //         </Card>

  //         {/* Today's Appointments */}
  //         <Card className="rounded-2xl shadow-lg bg-white/70">
  //           <CardContent className="p-5">
  //             <h2 className="font-semibold mb-3">Today’s Appointments</h2>

  //             {clinic.appointmentsToday.length ? (
  //               clinic.appointmentsToday.map((appt: any) => (
  //                 <div key={appt.id} className="flex justify-between py-2 border-b">
  //                   <div>
  //                     <p className="font-medium">{appt.patient.name}</p>
  //                     {/* <p className="text-xs text-slate-500">{appt.appointment_date}</p> */}
  //                   </div>
  //                   <div>
  //                     <p className="font-medium">{appt.start_time}</p>
  //                   </div>
  //                   <div>
  //                     <p className="font-medium">{appt.service.name}</p>
  //                   </div>
  //                   <span className="text-emerald-600 text-xs font-semibold capitalize">
  //                     {appt.status}
  //                   </span>
  //                 </div>
  //               ))
  //             ) : (
  //               <p className="text-sm text-slate-400">No appointments today</p>
  //             )}
  //           </CardContent>
  //         </Card>

  //       </div>

  //       {/* Upcoming */}
  //       <Card className="rounded-2xl shadow-lg bg-white/70 mt-6">
  //         <CardContent className="p-5">
  //           <h2 className="font-semibold mb-3">Upcoming Appointments</h2>

  //           {clinic.upcomingAppointments.length ? (
  //             clinic.upcomingAppointments.map((appt: any) => (
  //               <div key={appt.id} className="flex justify-between py-2 border-b">
  //                 <p>{appt.patient_name}</p>
  //                 <p className="text-xs text-slate-500">{appt.date}</p>
  //               </div>
  //             ))
  //           ) : (
  //             <p className="text-sm text-slate-400">No upcoming appointments</p>
  //           )}
  //         </CardContent>
  //       </Card>

  //       {/* Quick Actions */}
  //       <div className="flex gap-3 mt-6">
  //         <button className="px-4 py-2 bg-gray-600 text-white rounded-xl cursor-not-allowed" disabled>
  //           + Create Appointment <ProBadge />
  //         </button>
  //         <button className="px-4 py-2 bg-gray-600 text-white rounded-xl cursor-not-allowed" disabled>
  //           + Add Patient <ProBadge />
  //         </button>
  //       </div>

  //     </div>
  //   );
  // }

  "use client";

import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  User,
  Calendar,
  Activity,
  TrendingUp,
  Stethoscope,
  Users,
  Check,
  X,
} from "lucide-react";
import { getClinicData } from "@/lib/auth";

const ProBadge = () => (
  <span className="text-[10px] bg-yellow-400 text-black px-2 py-0.5 rounded-full font-bold ml-1">
    PRO
  </span>
);

export default function ClinicDashboard() {
  const user = useAuthStore((s) => s.user);
  const [clinicData, setClinicData] = useState<any>(null);

  useEffect(() => {
    if (!user?.clinic_id) return;

    getClinicData(user.clinic_id)
      .then(setClinicData)
      .catch(console.error);
  }, [user?.clinic_id]);

  const clinic = useMemo(() => {
    return (
      clinicData ?? {
        name: "Loading...",
        address: "",
        status: "Loading",
        doctor: { name: "", specialization: "" },
        secretary: { name: "" },
        stats: {
          patients: 0,
          appointmentsToday: 0,
          newRequests: 0,
          upcoming: 0,
          total_patients: 0,
        },
        newRequestList: [],
        appointmentsToday: [],
        upcomingAppointments: [],
      }
    );
  }, [clinicData]);

  const statsCards = useMemo(
    () => [
      {
        title: "New Requests",
        value: clinic.newRequestList.length,
        icon: Activity,
        gradient: "from-yellow-400 to-yellow-600",
      },
      {
        title: "Appointments Today",
        value: clinic.stats.appointmentsToday,
        icon: Calendar,
        gradient: "from-blue-400 to-blue-600",
      },
      {
        title: "Upcoming",
        value: clinic.upcomingAppointments.length,
        icon: TrendingUp,
        gradient: "from-purple-400 to-purple-600",
      },
      {
        title: "Total Patients",
        value: clinic.stats.total_patients,
        icon: Users,
        gradient: "from-emerald-400 to-emerald-600",
      },
    ],
    [clinic]
  );

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-2 sm:p-4">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            {clinic.clinic?.name || clinic.name} Dashboard
          </h1>
          <p className="text-slate-500">
            Focus on today’s operations and requests
          </p>
        </div>

        <div className="mt-3 md:mt-0 px-4 py-2 rounded-xl bg-white border shadow-sm">
          <span className="text-sm text-slate-600">Status: </span>
          <span className="text-emerald-600 font-semibold">
            {clinic.clinic?.status ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* CLINIC INFO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

        <Card className="rounded-2xl shadow-lg bg-white/70">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500 text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Clinic</p>
              <p className="font-semibold">{clinic.clinic?.name}</p>
              <p className="text-xs text-slate-500">{clinic.address}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg bg-white/70">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-500 text-white">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Doctor</p>
              <p className="font-semibold">{clinic.doctor.name}</p>
              <p className="text-xs text-slate-500">
                {clinic.doctor.specialization}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg bg-white/70">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-500 text-white">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Secretary</p>
              <p className="font-semibold">{clinic.secretary?.name || "None"}</p>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="rounded-2xl shadow-lg bg-white/70">
              <CardContent className="p-5 flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-500">{stat.title}</p>
                  <h2 className="text-2xl font-bold">{stat.value}</h2>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white`}>
                  <Icon className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">

        {/* NEW REQUESTS */}
        <Card className="rounded-2xl shadow-lg bg-white/70">
          <CardContent className="p-5">
            <h2 className="font-semibold mb-3">New Requests</h2>

            {clinic.newRequestList.length ? (
              <div className="space-y-3">
                {clinic.newRequestList.map((req: any) => (
                  <div
                    key={req.id}
                    className="p-3 rounded-xl border bg-white/60 shadow-sm flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between"
                  >
                    <div className="grid grid-cols-2 lg:flex lg:gap-8 text-sm">
                      <div>
                        <p className="text-xs text-slate-400">Patient</p>
                        <p className="font-medium">{req.patient.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Date</p>
                        <p className="font-medium">{req.appointment_date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Time</p>
                        <p className="font-medium">{req.start_time}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Service</p>
                        <p className="font-medium">{req.service.name}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {}}
                        className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100"
                      >
                        <Check size={18} />
                      </button>

                      <button
                        onClick={() => {}}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">No new requests</p>
            )}
          </CardContent>
        </Card>

        {/* TODAY APPOINTMENTS */}
        <Card className="rounded-2xl shadow-lg bg-white/70">
          <CardContent className="p-5">
            <h2 className="font-semibold mb-3">Today’s Appointments</h2>

            {clinic.appointmentsToday.length ? (
              <div className="space-y-3">
                {clinic.appointmentsToday.map((appt: any) => (
                  <div
                    key={appt.id}
                    className="p-3 rounded-xl border bg-white/60 shadow-sm flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between"
                  >
                    <div>
                      <p className="font-medium">{appt.patient.name}</p>
                      <p className="text-xs text-slate-400 capitalize">
                        {appt.status}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 lg:flex lg:gap-8 text-sm">
                      <div>
                        <p className="text-xs text-slate-400">Time</p>
                        <p className="font-medium">{appt.start_time}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Service</p>
                        <p className="font-medium">{appt.service.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">No appointments today</p>
            )}
          </CardContent>
        </Card>

      </div>

      {/* UPCOMING */}
      <Card className="rounded-2xl shadow-lg bg-white/70 mt-6">
        <CardContent className="p-5">
          <h2 className="font-semibold mb-3">Upcoming Appointments</h2>

          {clinic.upcomingAppointments.length ? (
            <div className="space-y-3">
              {clinic.upcomingAppointments.map((appt: any) => (
                <div
                  key={appt.id}
                  className="p-3 rounded-xl border bg-white/60 shadow-sm flex justify-between"
                >
                  <p className="font-medium">{appt.patient_name}</p>
                  <p className="text-xs text-slate-500">{appt.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">No upcoming appointments</p>
          )}
        </CardContent>
      </Card>

      {/* QUICK ACTIONS */}
      <div className="flex gap-3 mt-6">
        <button className="px-4 py-2 bg-gray-600 text-white rounded-xl cursor-not-allowed" disabled>
          + Create Appointment <ProBadge />
        </button>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-xl cursor-not-allowed" disabled>
          + Add Patient <ProBadge />
        </button>
      </div>

    </div>
  );
}