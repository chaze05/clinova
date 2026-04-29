import { useEffect, useState } from "react";
import axios from "axios";
import api from "@/lib/api";
import { Calendar, Check, X, Eye} from "lucide-react";
import ProBadge from "../ui/badge";
import {toast} from "react-hot-toast";
import Modal from "../ui/modal/Modal";
import ModalHeader from "../ui/modal/ModalHeader";
import ModalBody from "../ui/modal/ModalBody";
import AppointmentDetails from "./AppointmentDetails";

export default function RequestsTable() {
  const [data, setData] = useState<any[]>([]);
  const [tab, setTab] = useState<"pending" | "rejected">("pending");
  const [loading, setLoading] = useState(false);
  const [open,setOpen] = useState(false);
  const [selectedAppointment,setSelectedAppointment] = useState();
  const [appointment,setAppointment] = useState();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 8;

  // =========================
  // FETCH DATA
  // =========================
  const fetchRequests = async (status: string) => {
    try {
      setLoading(true);

    const res = await api.get('/api/appointments', {
      params: { status: status }
    });

      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  
  // =========================
  // RESCHEDULE
  // =========================
  // const handleSaveReschedule = async (date: string, time: string) => {
  //   await api.post("/api/appointments/reschedule", {
  //     id: selectedAppointment.id,
  //     date,
  //     time,
  //   });

  //   setData((prev) =>
  //     prev.map((item) =>
  //       item.id === selectedAppointment.id
  //         ? { ...item, appointment_date: date, start_time: time }
  //         : item
  //     )
  //   );

  //   setOpen(false);
  // };

  // =========================
  // RESCHEDULE
  // =========================
  const handleReschedule = (item: any) => {
    setSelectedAppointment(item);
    setOpen(true);
  };
  // =========================
  // EFFECT (TAB CHANGE)
  // =========================
  useEffect(() => {
    setPage(1);
    fetchRequests(tab);
  }, [tab]);

  // =========================
  // ACTIONS
  // =========================
  const handleApprove = async (id: number) => {
    try {
      setData((prev) => prev.filter((item) => item.id !== id));

      await api.patch(`/api/appointments/${id}/confirm`);
       toast.success(`Appointment request confirmed!.`);
    } catch (err) {
      console.error(err);
      fetchRequests(tab);
    }
  };

  const handleReject = async (id: number) => {
    try {
      // 1. Optimistically update UI first (instant feel)
      setData((prev) => prev.filter((item) => item.id !== id));
      // 2. Then call backend
      await api.patch(`/api/appointments/${id}/cancel`);
      toast.success(`Appointment request cancelled!.`);
    } catch (err) {
      console.error(err);
      // optional rollback if failed
      fetchRequests(tab);
    }
  };
  // =========================
  // FILTER + SEARCH
  // =========================
  const filtered = data.filter((item: any) => {
    const keyword = search.toLowerCase();

    return (
      item.patient.name.toLowerCase().includes(keyword) ||
      item.patient.contact_number.toLowerCase().includes(keyword)
    );
  });

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginated = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="bg-white p-4 rounded-2xl shadow space-y-4">

      {/* SEARCH */}
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search patient or mobile..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full max-w-sm px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-gray-200"
        />
      </div>

      {/* TABS */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab("pending")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            tab === "pending"
              ? "bg-yellow-400"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Pending
        </button>

        <button
          onClick={() => setTab("rejected")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            tab === "rejected"
              ? "bg-red-400"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Cancelled
        </button>
      </div>

      {/* TABLE */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="text-emerald-700 uppercase text-xs tracking-wider bg-emerald-50">
            <tr>
              <th className="text-left px-6 py-4">Patient</th>
              <th className="text-left px-6 py-4">Mobile</th>
              <th className="text-left px-6 py-4">Date</th>
              <th className="text-left px-6 py-4">Time</th>
              <th className="text-left px-6 py-4">Notes</th>
              {tab === "pending" && (
                <th className="text-left px-6 py-4">Actions</th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">

            {/* LOADING */}
            {loading && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-500">
                  Loading appointments...
                </td>
              </tr>
            )}

            {/* DATA */}
            {!loading && paginated.length > 0 &&
              paginated.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-black text-sm">
                    {item.patient.name}
                  </td>

                  <td className="px-6 py-4 text-black text-sm">
                    {item.patient.contact_number}
                  </td>

                  <td className="px-6 py-4 text-black">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-black text-sm">
                      {item.appointment_date}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-black">
                    {item.start_time}
                  </td>

                  <td className="px-6 py-4 text-black max-w-xs truncate">
                    {item.service.description || "-"}
                  </td>

                  {tab === "pending" && (
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {setAppointment(item); setOpen(true); console.log(item)}}
                          className="cursor-pointer p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="cursor-pointer p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition"
                          title="Approve"
                        >
                          <Check size={18} />
                        </button>

                        <button
                          onClick={() => handleReject(item.id)}
                          className="cursor-pointer p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                          title="Reject"
                        >
                          <X size={18} />
                        </button>
                        <button
                          disabled
                          onClick={() => handleReschedule(item)}
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-50 flex items-center cursor-not-allowed"
                          title="Reschedule"
                        >
                          <Calendar size={16} /> <ProBadge />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}

            {/* EMPTY */}
            {!loading && paginated.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-500">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="md:hidden space-y-3">
        {loading && (
          <div className="text-center py-10 text-gray-500">
            Loading appointments...
          </div>
        )}

        {!loading &&
          paginated.map((item: any) => (
            <div
              key={item.id}
              className="border rounded-xl p-4 shadow-sm bg-white space-y-2"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <p className="font-semibold text-black">
                  {item.patient.name}
                </p>

                <span className="text-xs px-2 py-1 rounded-md bg-gray-100">
                  {item.appointment_date}
                </span>
              </div>

              {/* Info */}
              <div className="text-sm text-gray-600 space-y-1">
                <p>📱 {item.patient.contact_number}</p>
                <p>⏰ {item.start_time}</p>
                <p className="text-gray-500">
                  {item.service.description || "-"}
                </p>
              </div>

              {/* Actions */}
              {tab === "pending" && (
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="flex-1 p-2 rounded-lg bg-green-50 text-green-600"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(item.id)}
                    className="flex-1 p-2 rounded-lg bg-red-50 text-red-600"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => handleReschedule(item)}
                    className="flex-1 p-2 rounded-lg bg-blue-50 text-blue-600"
                  >
                    Reschedule
                  </button>
                </div>
              )}
            </div>
          ))}

        {!loading && paginated.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No appointments found.
          </div>
        )}
      </div>
      {/* PAGINATION */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-gray-500">
          Page {page} of {totalPages || 1}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 text-sm border rounded-lg disabled:opacity-40"
          >
            Prev
          </button>

          <button
            onClick={() =>
              setPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={page === totalPages || totalPages === 0}
            className="px-3 py-1 text-sm border rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="w-full max-w-2xl mx-auto px-3 sm:px-6">
            <ModalHeader title="Appointment Details" />
            <ModalBody>
                <AppointmentDetails appointment={appointment} />
            </ModalBody>
          </div>
        </Modal>
    </div>
  );
}