import { useEffect, useState } from "react";
import { getClinicData } from "@/lib/auth";

export function useClinic(clinicId?: number) {
  const [clinic, setClinic] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!clinicId) return;

    setLoading(true);

    getClinicData(clinicId)
      .then((data) => {
        setClinic(data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [clinicId]);

  return { clinic, loading, error };
}