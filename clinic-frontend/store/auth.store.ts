// import { create } from "zustand";

// interface AuthState {
//   token: string | null;
//   user: any;
//   setToken: (token: string | null) => void;
//   setUser: (user: any) => void;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   token: null,
//   user: null,

//   setToken: (token) => set({ token }),
//   setUser: (user) => set({ user }),

//   logout: () => {
//     localStorage.removeItem("token");
//     set({ token: null, user: null });
//   },
// }));

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface AuthState {
//   token: string | null;
//   user: any;
//   setToken: (token: string | null) => void;
//   setUser: (user: any) => void;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       token: null,
//       user: null,

//       setToken: (token) => set({ token }),
//       setUser: (user) => set({ user }),

//       logout: () => {
//         set({ token: null, user: null });
//         localStorage.removeItem("token"); // optional (persist already handles it)
//       },
//     }),
//     {
//       name: "auth-storage", // 👈 key in localStorage
//     }
//   )
// );



// interface AuthState {
//   user: any;
//   setUser: (user: any) => void;
//   logout: () => void;
// }






// interface AuthState {
//   user: any | null;
//   hydrated: boolean;
//   setUser: (user: any | null) => void;
//   setHydrated: (value: boolean) => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,

//   setUser: (user) => set({ user }),

//   logout: () => {
//     set({ user: null });
//   },
// }));

import { create } from "zustand";

interface  AuthState {
  user: any | null;
  hydrated: boolean;
  token:string|null;
  setToken: (token: string | null) => void;
  setUser: (user: any | null) => void;
  setHydrated: (value: boolean) => void;
  clear:() => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  hydrated: false,
  

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setHydrated: (hydrated) => set({ hydrated }),

  clear: () =>
    set({
      user: null,
      token: null,
      hydrated: false,
    }),
  logout: () =>
    set({
      user: null,
      token: null,
      hydrated: false,
    }),
}));