// import { useAuthStore } from "@/store/auth.store";
// import api from "./api";
// import axios from "axios";
// import { notFound } from "next/navigation";
// /**
//  * LOGIN
//  * - Returns user + token from Laravel
//  * - Store token in localStorage after calling this
//  */
// // export async function login(email: string, password: string) {
// //   // 1. Initialize CSRF + session
// //   await api.get("/sanctum/csrf-cookie");

// //   // 2. Login via web.php (NOT api.php)
// //   await api.post("/auth/login", {
// //     email,
// //     password,
// //   });

// //   // 3. Get authenticated user (web.php route)
// //   const me = await api.get("/auth/user");

// //   if (!me.data) {
// //     throw new Error("Login failed");
// //   }

// //   useAuthStore.getState().setUser(me.data);

// //   return me.data;
// // }

// export async function login(email: string, password: string) {
//   await api.get("/sanctum/csrf-cookie");

//   await api.post("/auth/login", {
//     email,
//     password,
//   });

//   const me = await api.get("/auth/user");

//   useAuthStore.getState().setUser(me.data);

//   return me.data;
// }

// // export async function login(email: string, password: string) {
// //   await api.get("/sanctum/csrf-cookie");

// //   const res = await api.post("/api/auth/login", {
// //     email,
// //     password,
// //   });

// //   return res.data;
// // }


// /**
//  * GET LOGGED IN USER
//  * - Uses Bearer token (Sanctum Personal Access Token)
//  */
// export const getUser = async () => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     throw new Error("No token found");
//   }
//   const res = await api.get('api/clinic/clinics');
//   return res.data;
// };
// /**
//  * GET CLINICS
//  * - Uses Bearer token (Sanctum Personal Access Token)
//  */
// export const getClinicList = async (token: string | null) => {

//   const res = await api.get("/api/clinics", {
//     headers: {
//       Authorization: token ? `Bearer ${token}` : "",
//       Accept: "application/json",
//     },
//   });

//   return res.data;
// };

// /**
//  * GET CLINIC DATA
//  * - Uses Bearer token (Sanctum Personal Access Token)
//  */
// // export const getClinicData = async (
// //   token: string | null,
// //   clinicId: number
// // ) => {
// //   const res = await api.get(`/api/clinic/${clinicId}`, {
// //     headers: {
// //       Authorization: token ? `Bearer ${token}` : "",
// //       Accept: "application/json",
// //     },
// //   });

// //   return res.data;
// // }


// export const getClinicData = async (clinicId: number) => {
//   const res = await api.get(`/api/clinic/${clinicId}`);
//   return res.data;
// };

// export async function getClinic(slug: string) {
//   try {
//     const res = await axios.get(`http://localhost:8000/api/public/${slug}`);

//     const clinic = res.data;

//     console.log({ clinic });

//     return clinic;
//   } catch (error: any) {
//     if (error.response?.status === 404) {
//       return notFound();
//     }

//     throw error;
//   }
// }


// /**
//  * LOGOUT
//  * - Clears token + calls backend logout (optional)
//  */
// // export async function logout() {
// //   try {
// //     await api.post("/api/auth/logout");

// //     // clear frontend state
// //     useAuthStore.getState().clear();

// //     // clear any leftover storage (optional cleanup)
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("role");
// //     localStorage.removeItem("clinic_id");

// //   } catch (err) {
// //     console.log("Logout error ignored:", err);
// //   }
// // }


// export async function logout() {
//   await api.post("/auth/logout");

//   useAuthStore.getState().clear();
// }

import api from "./api";
import { useAuthStore } from "@/store/auth.store";

/**
 * LOGIN (Sanctum SPA)
 */
  export async function login(email: string, password: string) {
    // 1. CSRF cookie 
    await api.get("/sanctum/csrf-cookie");

    // 2. Login (session created here)
    const res = await api.post("/api/auth/login", {
      email,
      password,
    });

    // 3. Use login response directly (NO second request)
  
  const { user, token,clinic_id,role } = res.data;
    
    useAuthStore.getState().setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("clinic_id", clinic_id);
    localStorage.setItem("role", role);

    return user;
  }

/**
 * GET CURRENT USER
 */
export async function getUser() {
  const res = await api.get("/auth/user");
  return res.data;
}

/**
 * GET CLINICS (NO TOKEN, NO BEARER)
 */
export async function getClinicList() {
  const res = await api.get("/api/clinics");
  return res.data;
}


// for toggle
type ToggleServicePayload = {
  service_id: number;
  is_active: boolean;
  [key: string]: any;
};

export async function toggleService(payload: ToggleServicePayload) {
  const res = await api.post(
    "/api/clinic/services/toggle",
    payload
  );

  return res.data;
}
/**
 * GET CLINIC BY ID
 */
export async function getClinicData(clinicId: number) {
  const res = await api.get(`/api/clinic/${clinicId}`);
  return res.data;
}

export async function getPatients() {
  const res = await api.get(`/api/patients/`);
  return res.data;
}

/**
 * GET PUBLIC CLINIC (no auth needed)
 */
export async function getClinic(slug: string) {
  const res = await api.get(`/api/public/${slug}`);
  return res.data;
}

/**
 * LOGOUT (Sanctum SPA)
 */
export async function logout() {
  await api.post("/auth/logout");

  useAuthStore.getState().setUser(null);
  useAuthStore.getState().setToken(null);
  useAuthStore.getState().setHydrated(false);
}