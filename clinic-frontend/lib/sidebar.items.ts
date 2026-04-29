import {
  LayoutDashboard,
  Building2,
  Users,
  Calendar,
  Settings,
  Activity,
  ClipboardList,
  Stethoscope,
  FileText,
  LogOut,
  Syringe,
} from "lucide-react";

export type Role = "admin" | "doctor" | "secretary";

export const menuByRole: Record<Role, any[]> = {
  admin: [
    { label: "Dashboard", href: "/dev/dashboard", icon: LayoutDashboard },
    { label: "Clinics", href: "/dev/clinics", icon: Building2 },
    { label: "Users", href: "/dev/users", icon: Users },
    { label: "Appointments", href: "/dev/appointments", icon: Calendar },
    { label: "Audit Logs", href: "/dev/logs", icon: FileText },
    { label: "System Health", href: "/dev/system", icon: Activity },
    { label: "Settings", href: "/dev/settings", icon: Settings },
    { label: "Log-out", href:'', icon: LogOut },
  ],

  doctor: [
    { label: "Dashboard", href: "/clinic/dashboard", icon: LayoutDashboard },
    { label: "Patients", href: "/clinic/patients", icon: Users },
    { label: "Appointments", href: "/clinic/appointments", icon: Calendar },
    { label: "Services", href: "/clinic/services", icon: Syringe },
    // { label: "Schedule", href: "/clinic/schedule", icon: Stethoscope, isActive:0 },
    { label: "Settings", href: "/clinic/settings", icon: Settings},
    { label: "Log-out",  href:'' , icon: LogOut },
  ],

  secretary: [
    { label: "Dashboard", href: "/clinic/dashboard", icon: LayoutDashboard },
    { label: "Appointments", href: "/clinic/appointments", icon: Calendar },
    { label: "Patients", href: "/clinic/patients", icon: Users },
    { label: "Services", href: "/clinic/services", icon: Syringe },
    { label: "Check-in", href: "/clinic/checkin", icon: ClipboardList },
    { label: "Settings", href: "/clinic/settings", icon: Settings },
    { label: "Log-out",  href:'', icon: LogOut },
  ],
};