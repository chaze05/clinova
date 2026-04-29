// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
//   // baseURL: process.env.NEXT_PUBLIC_API_URL || "https://clinova.onrender.com/",
//   withCredentials: true,
//   headers: {
//     Accept: "application/json",
//   },
// });

// export default api;

import axios from "axios";

const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  baseURL: process.env.NEXT_PUBLIC_API_UR || "https://clinova.onrender.com/",
  withCredentials: true, // REQUIRED for Sanctum SPA
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

export const publicApi = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_UR || "http://localhost:8000",
  baseURL: process.env.NEXT_PUBLIC_API_UR || "https://clinova.onrender.com/",
});
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000",
//   // baseURL: "https://ff5f-120-29-68-157.ngrok-free.app",
//   withCredentials: true,
//   headers: {
//     Accept: "application/json",
//   },
// });

// // 🔥 THIS IS THE MISSING PIECE
// api.defaults.withXSRFToken = true;
// api.defaults.xsrfCookieName = "XSRF-TOKEN";
// api.defaults.xsrfHeaderName = "X-XSRF-TOKEN";

// export default api;