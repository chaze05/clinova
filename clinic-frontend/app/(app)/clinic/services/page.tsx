"use client"

import ServicesPage from "@/components/services/ServicesPage";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";
import { useEffect, useState } from "react";

export default function Page() {
    const [clinicData, setClinicData] = useState(null);
    const clinicId = useAuthStore((s) => s.user?.clinic_id);
    useEffect(() => {
        const load = async () => {
            const res = await api.get(`/api/services/${clinicId}`);
            setClinicData(res.data);
        };

        load();
    }, []);


    if (!clinicData) return <div>Loading...</div>;

    return <ServicesPage clinicData={clinicData} />;
}   