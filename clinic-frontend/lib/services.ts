import api from "./api";


type ToggleServicePayload = {
  service_id: number;
  is_active: boolean;
  price?: number;
  duration?: number;
};

export async function toggleService(payload: ToggleServicePayload) {
  const res = await api.post("/api/clinic/services/toggle", payload);
  return res.data;
}

export async function getClinicServices() {
  const res = await api.get("/api/clinic/services");
  return res.data;
}