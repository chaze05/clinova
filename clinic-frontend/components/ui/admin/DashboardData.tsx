// "use client";

// import { useMemo } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Users, Building2, Calendar, Activity, TrendingUp } from "lucide-react";

// export default function DashboardData() {
//   const stats = useMemo(
//     () => [
//       {
//         title: "Total Clinics",
//         value: "128",
//         icon: Building2,
//         change: "+12%",
//         color: "from-emerald-500/20 to-emerald-600/10",
//       },
//       {
//         title: "Active Patients",
//         value: "8,420",
//         icon: Users,
//         change: "+8%",
//         color: "from-blue-500/20 to-blue-600/10",
//       },
//       {
//         title: "Appointments Today",
//         value: "312",
//         icon: Calendar,
//         change: "+5%",
//         color: "from-violet-500/20 to-violet-600/10",
//       },
//       {
//         title: "System Activity",
//         value: "99.9%",
//         icon: Activity,
//         change: "Stable",
//         color: "from-orange-500/20 to-orange-600/10",
//       },
//     ],
//     []
//   );

//   return (
//     <div className="p-6 space-y-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen text-white">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold">Clinova Dashboard</h1>
//           <p className="text-slate-400 text-sm">
//             Admin / Developer Overview of Clinic System
//           </p>
//         </div>

//         <div className="flex gap-2 items-center">
//           <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs">
//             System Healthy
//           </span>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {stats.map((item, idx) => {
//           const Icon = item.icon;
//           return (
//             <Card
//               key={idx}
//               className={`border border-white/10 bg-gradient-to-br ${item.color} backdrop-blur-xl rounded-2xl shadow-lg`}
//             >
//               <CardContent className="p-5">
//                 <div className="flex items-center justify-between">
//                   <div className="space-y-2">
//                     <p className="text-xs text-slate-400">{item.title}</p>
//                     <h2 className="text-2xl font-semibold">{item.value}</h2>
//                     <p className="text-xs text-emerald-400">
//                       {item.change}
//                     </p>
//                   </div>

//                   <div className="p-3 rounded-xl bg-white/10">
//                     <Icon className="w-5 h-5 text-white" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       {/* Middle Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//         {/* Activity Feed */}
//         <div className="lg:col-span-2">
//           <Card className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl">
//             <CardContent className="p-5">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-medium">Recent System Activity</h3>
//                 <TrendingUp className="w-4 h-4 text-slate-400" />
//               </div>

//               <div className="space-y-3">
//                 {[1, 2, 3, 4, 5].map((i) => (
//                   <div
//                     key={i}
//                     className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition"
//                   >
//                     <div>
//                       <p className="text-sm">Clinic #{i} updated profile</p>
//                       <p className="text-xs text-slate-400">2 hours ago</p>
//                     </div>
//                     <span className="text-xs text-slate-400">OK</span>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Panel */}
//         <div>
//           <Card className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl">
//             <CardContent className="p-5">
//               <h3 className="font-medium mb-4">System Insights</h3>

//               <div className="space-y-4">
//                 <div>
//                   <p className="text-xs text-slate-400">Server Load</p>
//                   <div className="w-full bg-white/10 rounded-full h-2 mt-2">
//                     <div className="bg-emerald-500 h-2 rounded-full w-[68%]" />
//                   </div>
//                 </div>

//                 <div>
//                   <p className="text-xs text-slate-400">Database Usage</p>
//                   <div className="w-full bg-white/10 rounded-full h-2 mt-2">
//                     <div className="bg-blue-500 h-2 rounded-full w-[42%]" />
//                   </div>
//                 </div>

//                 <div>
//                   <p className="text-xs text-slate-400">API Health</p>
//                   <div className="w-full bg-white/10 rounded-full h-2 mt-2">
//                     <div className="bg-violet-500 h-2 rounded-full w-[91%]" />
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useMemo } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Users,
//   Building2,
//   Calendar,
//   Activity,
//   TrendingUp,
// } from "lucide-react";

// export default function DashboardData() {
//   const stats = useMemo(
//     () => [
//       {
//         title: "Total Clinics",
//         value: "128",
//         icon: Building2,
//         change: "+12%",
//         color: "from-emerald-500/20 to-emerald-600/10",
//       },
//       {
//         title: "Active Patients",
//         value: "8,420",
//         icon: Users,
//         change: "+8%",
//         color: "from-blue-500/20 to-blue-600/10",
//       },
//       {
//         title: "Appointments Today",
//         value: "312",
//         icon: Calendar,
//         change: "+5%",
//         color: "from-violet-500/20 to-violet-600/10",
//       },
//       {
//         title: "System Activity",
//         value: "99.9%",
//         icon: Activity,
//         change: "Stable",
//         color: "from-orange-500/20 to-orange-600/10",
//       },
//     ],
//     []
//   );

//   return (
//     <div className="space-y-6">
      
//       {/* HEADER */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-xl sm:text-2xl font-semibold">
//             Clinova Dashboard
//           </h1>
//           <p className="text-slate-400 text-sm">
//             Admin overview of clinic system performance
//           </p>
//         </div>

//         <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs">
//           System Healthy
//         </span>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//         {stats.map((item, idx) => {
//           const Icon = item.icon;
//           return (
//             <Card
//               key={idx}
//               className={`border border-white/10 bg-gradient-to-br ${item.color} backdrop-blur-xl rounded-2xl`}
//             >
//               <CardContent className="p-5">
//                 <div className="flex items-center justify-between">
                  
//                   <div className="space-y-2">
//                     <p className="text-xs text-slate-400">
//                       {item.title}
//                     </p>
//                     <h2 className="text-xl sm:text-2xl font-semibold">
//                       {item.value}
//                     </h2>
//                     <p className="text-xs text-emerald-400">
//                       {item.change}
//                     </p>
//                   </div>

//                   <div className="p-3 rounded-xl bg-white/10">
//                     <Icon className="w-5 h-5 text-white" />
//                   </div>

//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       {/* BOTTOM GRID */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

//         {/* ACTIVITY */}
//         <div className="lg:col-span-2">
//           <Card className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl">
//             <CardContent className="p-5">
              
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-medium">
//                   Recent Activity
//                 </h3>
//                 <TrendingUp className="w-4 h-4 text-slate-400" />
//               </div>

//               <div className="space-y-3">
//                 {[1, 2, 3, 4, 5].map((i) => (
//                   <div
//                     key={i}
//                     className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition"
//                   >
//                     <div>
//                       <p className="text-sm">
//                         Clinic #{i} updated records
//                       </p>
//                       <p className="text-xs text-slate-400">
//                         2 hours ago
//                       </p>
//                     </div>
//                     <span className="text-xs text-slate-400">
//                       OK
//                     </span>
//                   </div>
//                 ))}
//               </div>

//             </CardContent>
//           </Card>
//         </div>

//         {/* INSIGHTS */}
//         <div>
//           <Card className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl">
//             <CardContent className="p-5">

//               <h3 className="font-medium mb-4">
//                 System Insights
//               </h3>

//               <div className="space-y-4 text-sm">

//                 <div>
//                   <p className="text-xs text-slate-400">
//                     Server Load
//                   </p>
//                   <div className="w-full bg-white/10 rounded-full h-2 mt-2">
//                     <div className="bg-emerald-500 h-2 rounded-full w-[68%]" />
//                   </div>
//                 </div>

//                 <div>
//                   <p className="text-xs text-slate-400">
//                     Database Usage
//                   </p>
//                   <div className="w-full bg-white/10 rounded-full h-2 mt-2">
//                     <div className="bg-blue-500 h-2 rounded-full w-[42%]" />
//                   </div>
//                 </div>

//                 <div>
//                   <p className="text-xs text-slate-400">
//                     API Health
//                   </p>
//                   <div className="w-full bg-white/10 rounded-full h-2 mt-2">
//                     <div className="bg-violet-500 h-2 rounded-full w-[91%]" />
//                   </div>
//                 </div>

//               </div>

//             </CardContent>
//           </Card>
//         </div>

//       </div>
//     </div>
//   );
// }

"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Building2,
  Calendar,
  Activity,
  TrendingUp,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

/* -----------------------------
   FAKE CLINIC ANALYTICS DATA
------------------------------*/

const patientGrowth = [
  { month: "Jan", patients: 120 },
  { month: "Feb", patients: 220 },
  { month: "Mar", patients: 180 },
  { month: "Apr", patients: 300 },
  { month: "May", patients: 450 },
  { month: "Jun", patients: 620 },
];

const appointmentsTrend = [
  { day: "Mon", count: 40 },
  { day: "Tue", count: 65 },
  { day: "Wed", count: 50 },
  { day: "Thu", count: 90 },
  { day: "Fri", count: 120 },
];

const clinicRevenue = [
  { clinic: "Clinic A", revenue: 12000 },
  { clinic: "Clinic B", revenue: 18000 },
  { clinic: "Clinic C", revenue: 9500 },
  { clinic: "Clinic D", revenue: 22000 },
];

/* -----------------------------
   MAIN DASHBOARD COMPONENT
------------------------------*/

export default function DashboardData() {
  const stats = useMemo(
    () => [
      {
        title: "Total Clinics",
        value: "128",
        icon: Building2,
        change: "+12%",
        color: "from-emerald-500/20 to-emerald-600/10",
      },
      {
        title: "Active Patients",
        value: "8,420",
        icon: Users,
        change: "+8%",
        color: "from-blue-500/20 to-blue-600/10",
      },
      {
        title: "Appointments Today",
        value: "312",
        icon: Calendar,
        change: "+5%",
        color: "from-violet-500/20 to-violet-600/10",
      },
      {
        title: "System Activity",
        value: "99.9%",
        icon: Activity,
        change: "Stable",
        color: "from-orange-500/20 to-orange-600/10",
      },
    ],
    []
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">
            Clinova Dashboard
          </h1>
          <p className="text-slate-400 text-sm">
            Admin overview of clinic system performance
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs">
          System Healthy
        </span>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;

          return (
            <Card
              key={idx}
              className={`border border-white/10 bg-gradient-to-br ${item.color} backdrop-blur-xl rounded-2xl`}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">

                  <div className="space-y-2">
                    <p className="text-xs text-slate-400">
                      {item.title}
                    </p>
                    <h2 className="text-xl sm:text-2xl font-semibold">
                      {item.value}
                    </h2>
                    <p className="text-xs text-emerald-400">
                      {item.change}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/10">
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ANALYTICS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Patient Growth */}
        <div className="lg:col-span-2">
          <Card className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl">
            <CardContent className="p-5">
              <h3 className="font-medium mb-4">Patient Growth</h3>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={patientGrowth}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="patients"
                    stroke="#22c55e"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>

            </CardContent>
          </Card>
        </div>

        {/* Appointments Trend */}
        <div>
          <Card className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl">
            <CardContent className="p-5">
              <h3 className="font-medium mb-4">Appointments</h3>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={appointmentsTrend}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

            </CardContent>
          </Card>
        </div>

      </div>

      {/* CLINIC REVENUE */}
      <Card className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl">
        <CardContent className="p-5">

          <h3 className="font-medium mb-4">
            Clinic Revenue Overview
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={clinicRevenue}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
              <XAxis dataKey="clinic" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

        </CardContent>
      </Card>

    </div>
  );
}