"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api"; // your axios instance

export default function Profile() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    display_name: "",
    specialty: "",
    sub_specialty: "",
    years_experience: "",
    license_number: "",
    board_certifications: "",
    bio: "",
    education: "",
    experience: "",
    photo: "",
  });

  // 🔵 Load profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/profile");
        console.log(res.data[0].doctor_profile);
        setForm(res.data[0].doctor_profile);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  // 🔵 Handle change
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔵 Update profile
  const handleUpdate = async () => {
    setLoading(true);
    try {
      await api.put("/doctor/profile/update", form);
      alert("Profile updated successfully!");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT - PHOTO */}
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 overflow-hidden">
            {form.photo ? (
              <img src={form.photo} className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Photo
              </div>
            )}
          </div>
{/* 
          <input
            className="mt-4 w-full text-sm"
            placeholder="Photo URL"
            name="photo"
            value={form.photo}
            onChange={handleChange}
          /> */}
        </div>

        {/* RIGHT - FORM */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow space-y-4">

          {/* NAME */}
          <div className="grid grid-cols-2 gap-3">
            <input
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="First Name"
            />
            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Last Name"
            />
          </div>

          <input
            name="display_name"
            value={form.display_name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Display Name"
          />

          {/* SPECIALTY */}
          <div className="grid grid-cols-2 gap-3">
            <input
              name="specialty"
              value={form.specialty}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Specialty"
            />
            <input
              name="sub_specialty"
              value={form.sub_specialty}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Sub Specialty"
            />
          </div>

          {/* LICENSE */}
          <div className="grid grid-cols-2 gap-3">
            <input
              name="license_number"
              value={form.license_number}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="License Number"
            />
            <input
              name="years_experience"
              value={form.years_experience}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Years Experience"
              type="number"
            />
          </div>

          {/* LONG TEXT */}
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Bio"
          />

          <textarea
            name="education"
            value={form.education}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Education"
          />

          <textarea
            name="experience"
            value={form.experience}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Experience"
          />

          <textarea
            name="board_certifications"
            value={form.board_certifications}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Board Certifications"
          />

          {/* ACTION */}
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}