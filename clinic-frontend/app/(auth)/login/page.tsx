"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";


export default function LoginPage() {
    // const setToken = useAuthStore((s) => s.setToken);
    const router = useRouter();
    const [loading,setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // async function handleLogin() {
    //     try {
    //         const res = await login(email, password);
    //         // IMPORTANT: redirect AFTER storing token
  
    //         if(res.user.role == "admin"){
    //             router.push("/dev/dashboard");
    //         }else{
    //             router.push("/clinic/dashboard");
    //         }
            
    //     } catch {
    //     alert("Login failed");
    //     }
    // }
  async function handleLogin() {
    try {
      setLoading(true);
      const user = await login(email, password);

      console.log("LOGGED USER:", user);

      if (!user || !user.role) {
        throw new Error("Invalid user response");
      }

      if (user.role === "admin") {
        router.push("/dev/dashboard");
      } else if (user.role === "doctor") {
        router.push("/clinic/dashboard");
      } else {
        router.push("/clinic/dashboard");
      }

    } catch(err) {
      console.error(err);
      alert("Login failed");
    }
  }

    return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">

      {/* 🔵 Animated background blobs */}
      <div className="absolute inset-0">
        <div className="absolute w-[400px] h-[400px] bg-green-500/30 rounded-full blur-3xl animate-pulse top-[-100px] left-[-100px]" />
        <div className="absolute w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-3xl animate-pulse bottom-[-150px] right-[-120px]" />
        <div className="absolute w-[300px] h-[300px] bg-lime-400/20 rounded-full blur-3xl animate-pulse top-[40%] left-[50%]" />
      </div>

      {/* 🌫 Glass card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-[380px] backdrop-blur-xl bg-white/10 border border-white/20 text-white p-8 rounded-2xl shadow-2xl"
      >
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-1">
          Welcome to <span className="text-green-400">Clinova</span>
        </h1>
        <p className="text-center text-sm text-gray-300 mb-6">
          Clinic Management System Login
        </p>

        {/* Inputs */}
        <div className="space-y-3">
          <input
            className="w-full bg-white/10 border border-white/20 p-3 rounded-xl outline-none text-white placeholder-gray-300 focus:border-green-400"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full bg-white/10 border border-white/20 p-3 rounded-xl outline-none text-white placeholder-gray-300 focus:border-green-400"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-green-500 hover:bg-green-600 transition p-3 rounded-xl font-semibold shadow-lg"
        >
          
          {loading ? "Logging In....": "Login"}
        </button>

        {/* Footer text */}
        <p className="text-xs text-center text-gray-400 mt-4">
          Secure access for clinic administrators
        </p>
      </motion.div>
    </div>
    );
}