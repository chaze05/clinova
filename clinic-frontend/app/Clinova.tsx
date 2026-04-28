"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Users, BarChart3, ShieldCheck, Activity } from "lucide-react";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function LandingPage() {
  const [email, setEmail] = useState("");

  /* ================= TESTIMONIALS ================= */
  const testimonials = [
    {
      name: "Dr. Maria Santos",
      text: "Clinova made our clinic operations 10x smoother.",
      role: "Clinic Owner",
      img: "https://i.pravatar.cc/100?img=12",
    },
    {
      name: "John Reyes",
      text: "We reduced patient waiting time drastically.",
      role: "Admin",
      img: "https://i.pravatar.cc/100?img=15",
    },
    {
      name: "Dr. Patel",
      text: "Best clinic system I’ve used so far.",
      role: "Doctor",
      img: "https://i.pravatar.cc/100?img=18",
    },
    {
      name: "Lisa Gomez",
      text: "Scheduling is now effortless and organized.",
      role: "Receptionist",
      img: "https://i.pravatar.cc/100?img=20",
    },
    {
      name: "Dr. Ahmed",
      text: "Clean UI and very fast workflow.",
      role: "Doctor",
      img: "https://i.pravatar.cc/100?img=22",
    },
    {
      name: "Carla Dela Cruz",
      text: "Patient management is finally simple.",
      role: "Nurse",
      img: "https://i.pravatar.cc/100?img=25",
    },
    {
      name: "Dr. Wong",
      text: "Love the automation features.",
      role: "Doctor",
      img: "https://i.pravatar.cc/100?img=30",
    },
    {
      name: "Mark Lopez",
      text: "No more double bookings ever again.",
      role: "Reception",
      img: "https://i.pravatar.cc/100?img=32",
    },
    {
      name: "Grace Lim",
      text: "It improved our revenue tracking massively.",
      role: "Owner",
      img: "https://i.pravatar.cc/100?img=35",
    },
    {
      name: "Dr. Kim",
      text: "Reliable and easy to use daily.",
      role: "Doctor",
      img: "https://i.pravatar.cc/100?img=37",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const plans = [
    {
      name: "Starter",
      price: "₱1,499",
      desc: "Perfect for small clinics & solo doctors",
      features: [
        "Appointment booking system",
        "Patient management (basic)",
        "Doctor schedules",
        "Manual approval system",
        "Calendar view",
        "Basic reports",
        "1 admin account"
      ],
      highlight: false
    },
    {
      name: "Pro",
      price: "₱2,999",
      desc: "Best for growing clinics",
      features: [
        "Everything in Starter",
        "Multi-user access (staff & receptionists)",
        "Role-based access control",
        "Auto approval rules",
        "Advanced analytics",
        "SMS / Email reminders",
        "Export reports (PDF/Excel)",
        "Priority support"
      ],
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "For hospitals & large clinics",
      features: [
        "Multi-branch support",
        "Advanced permissions",
        "API access",
        "Custom integrations",
        "White-label system",
        "Dedicated support"
      ],
      highlight: false
    }
  ];

  const stats = [
    { label: "Appointments Managed", value: "10,000+", icon: CalendarDays },
    { label: "Clinics Onboarded", value: "120+", icon: Users },
    { label: "System Uptime", value: "99.9%", icon: ShieldCheck },
    { label: "Efficiency Boost", value: "70%", icon: Activity }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-white text-gray-800">

      {/* NAV */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-green-600">Clinova</h1>
        <a href="#apply" className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700">
          Get Started
        </a>
      </nav>

      {/* HERO */}
      <motion.section
        className="text-center max-w-5xl mx-auto px-6 pt-20"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.h1 className="text-5xl font-bold" variants={item}>
          Run your clinic smarter with <span className="text-green-600">Clinova</span>
        </motion.h1>

        <motion.p className="mt-6 text-gray-600 text-lg" variants={item}>
          All-in-one clinic management system for appointments, patients, doctors, and analytics.
        </motion.p>

        <motion.div className="mt-8" variants={item}>
          <a href="#pricing" className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700">
            View Pricing
          </a>
        </motion.div>
      </motion.section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
        >
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-2xl shadow text-center"
                variants={item}
              >
                <Icon className="mx-auto text-green-600" size={28} />
                <h3 className="text-2xl font-bold mt-2">{s.value}</h3>
                <p className="text-gray-500 text-sm mt-1">{s.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Clinics Choose Clinova</h2>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
        >
          {[
            {
              title: "Smart Scheduling",
              desc: "Automated appointment system that prevents conflicts and optimizes doctor availability.",
              icon: CalendarDays
            },
            {
              title: "Patient Records",
              desc: "Secure and centralized patient history with fast access for doctors and staff.",
              icon: Users
            },
            {
              title: "Clinic Analytics",
              desc: "Real-time insights on appointments, revenue trends, and clinic performance.",
              icon: BarChart3
            }
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center"
                variants={item}
              >
                <Icon className="mx-auto text-green-600" size={32} />
                <h3 className="text-lg font-semibold mt-4 text-green-600">{f.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{f.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-green-50 py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">Simple, Transparent Pricing</h2>

          <motion.div
            className="grid md:grid-cols-3 gap-6 mt-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
          >
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                className={`p-8 rounded-2xl shadow bg-white relative ${plan.highlight ? "border-2 border-green-600 scale-105" : ""}`}
                variants={item}
                whileHover={{ scale: 1.05 }}
              >
                {plan.highlight && (
                  <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-gray-500 mt-1">{plan.desc}</p>
                <div className="text-3xl font-bold text-green-600 mt-4">{plan.price}</div>

                <ul className="text-left mt-6 space-y-2 text-sm text-gray-600">
                  {plan.features.map((f, i) => (
                    <li key={i}>✔ {f}</li>
                  ))}
                </ul>

                <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700">
                  Choose Plan
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* TESTIMONIAL SLIDER (UPGRADED) */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">What Clinics Say</h2>

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-green-50 to-white p-10 rounded-3xl shadow-xl border"
          >
            <img
              src={testimonials[index].img}
              className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-green-500"
            />

            <p className="text-lg text-gray-700 italic">
              "{testimonials[index].text}"
            </p>

            <h4 className="mt-4 font-semibold text-green-600">
              {testimonials[index].name}
            </h4>

            <p className="text-sm text-gray-400">{testimonials[index].role}</p>
          </motion.div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full cursor-pointer ${
                  i === index ? "bg-green-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* APPLY */}
      <motion.section
        id="apply"
        className="max-w-4xl mx-auto px-6 py-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center">Apply for Clinova Access</h2>

        <form className="mt-10 bg-white p-8 rounded-2xl shadow space-y-4">
          <input className="w-full border p-3 rounded-xl" placeholder="Clinic Name" />
          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea className="w-full border p-3 rounded-xl" placeholder="Message" rows={4} />

          <button className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700">
            Submit Application
          </button>
        </form>
      </motion.section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} <a href="https://clinova-omega.vercel.app">Clinova</a>. All rights reserved.
      </footer>
    </div>
  );
}
