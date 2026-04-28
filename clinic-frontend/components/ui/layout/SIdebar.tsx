// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   Building2,
//   Users,
//   Calendar,
//   Settings,
//   Activity,
// } from "lucide-react";

// const items = [
//   { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
//   { label: "Clinics", href: "/admin/clinics", icon: Building2 },
//   { label: "Doctors", href: "/admin/doctors", icon: Activity },
//   { label: "Patients", href: "/admin/patients", icon: Users },
//   { label: "Appointments", href: "/admin/appointments", icon: Calendar },
//   { label: "Settings", href: "/admin/settings", icon: Settings },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();

//   return (
//     <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      
//       {/* BRAND */}
//       <div className="p-5 border-b">
//         <h1 className="text-lg font-bold text-green-600">
//           Clinic SaaS
//         </h1>
//         <p className="text-xs text-gray-400">
//           Admin Panel
//         </p>
//       </div>

//       {/* NAV */}
//       <nav className="flex-1 p-3 space-y-1">
//         {items.map((item) => {
//           const active = pathname === item.href;

//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition ${
//                 active
//                   ? "bg-green-50 text-green-600 font-medium"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               <item.icon className="w-4 h-4" />
//               {item.label}
//             </Link>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { menuByRole, Role } from "@/lib/sidebar.items";
import {
  LayoutDashboard,
  Building2,
  Users,
  Calendar,
  Settings,
  Activity,
  Menu,
  X,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import { useAuthStore } from "@/store/auth.store";
import ProBadge from "../badge";

export default function Sidebar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const userRole = 'doctor';
  const role: Role = userRole; // later from auth store
  const items = menuByRole[role];
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login')
  }

  return (
    <>
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* MOBILE TOGGLE */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-950/80 backdrop-blur-xl border-r border-white/10  rounded-xl text-white"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static z-50 h-full
          transition-all duration-300
          bg-slate-950/80 backdrop-blur-xl border-r border-white/10
          flex flex-col text-white

          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "left-0" : "-left-full lg:left-0"}
        `}
      >
        {/* HEADER */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-emerald-400">
                Admin Panel
              </h1>
              <p className="text-xs text-slate-400">Admin Panel</p>
            </div>
          )}

          {/* Desktop collapse button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-2 rounded-lg hover:bg-white/10"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Mobile close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 p-3 space-y-1">
          {items?.map((item,i) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            
            return (
              item.href== '' ? 
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition cursor-pointer"   key={i} onClick={handleLogout}>  
                  <Icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </div>
                :
              item.isActive == 0 ? 
                <div className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition cursor-pointe                    
                   ${item.isActive == 0 ? 'bg-gray-600 hover:bg-gray-600 cursor-not-allowed': ''}`}   key={i}>  
                  <Icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <> <span>{item.label}</span> {item.isActive != 0 ? '' : <ProBadge /> }</>}
                </div>
                :
                <Link
                  key={i}
                  href={item.href}
                  onClick={() => {setMobileOpen(false);}}
                  aria-disabled={true}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition
                    ${
                      active
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "text-slate-300 hover:bg-white/5"
                    }
                  `}
                > 
                  <Icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        {!collapsed && (
          <div className="p-3 border-t border-white/10 text-xs text-slate-500">
            Clinova v1.0
          </div>
        )}
      </aside>
    </>
  );
}