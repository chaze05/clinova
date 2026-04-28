"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import Sidebar from "@/components/ui/layout/SIdebar";
import { useAuthStore } from "@/store/auth.store";
import api from "@/lib/api";
import { Toaster } from "react-hot-toast";
import { AnimatedToaster } from "@/components/ui/animatedToast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const router = useRouter();

    const user = useAuthStore((s) => s.user);
    const hydrated = useAuthStore((s) => s.hydrated);
    const setUser = useAuthStore((s) => s.setUser);
    const setHydrated = useAuthStore((s) => s.setHydrated);

    // 🔥 AUTH CHECK (ONLY ONCE)
    useEffect(() => {
        const checkAuth = async () => {
        try {
            const res = await api.get("/me");
            setUser(res.data);
        } catch {
            setUser(null);
        } finally {
            setHydrated(true);
        }
        };

        checkAuth();
    }, []);

    // 🔥 REDIRECT IF NOT AUTHENTICATED
    useEffect(() => {
        if (!hydrated) return;

        if (!user) {
        //   router.push("/login");
        }
    }, [user, hydrated, router]);

    // 🔥 IMPORTANT: prevent flashing UI
    if (!hydrated) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }




    return (
        <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <AnimatedToaster />

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto">
            <div className="p-2 sm:p-4">
                {children}
            </div>
        </main>

        </div>
    );
}