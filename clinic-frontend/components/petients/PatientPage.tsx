"use client";

import { use, useEffect, useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, Edit, Clock } from "lucide-react";
import ProBadge from "../ui/badge";
import ModalHeader from "../ui/modal/ModalHeader";
import ModalBody from "../ui/modal/ModalBody";
import { PatientForm } from "./PatientForm";
import Modal from "../ui/modal/Modal";
import api from "@/lib/api";

type Patient = {
  id: number;
  patientName: string;
  patientEmail: string;
  patientMobile: string;
  status: number,
  lastVisit: string;
};

const PAGE_SIZE = 5;
const defaultPatient: Patient = {
    id:0,
    patientName: "",
    patientMobile: "",
    patientEmail: "",
    status: 1,
    lastVisit:''
};
export default function PatientsPage() {
    const [search, setSearch] = useState("");
    const [open,setOpen] = useState(false);

    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(defaultPatient);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading,setLoading]  = useState(false);
    const [page, setPage] = useState(1);
    const [mode, setMode] = useState<"add" | "update">("add");
    
    const fetchPatients = async () => {
        setLoading(true);
        const res = await api.get('/api/patients');
            // setEvents(res.data);
        const data = res.data;
        const mappedpatient = data.map((patient:any) => ({
            id: patient.id,
            patientName:patient.name,
            patientEmail:patient.email,
            patientMobile:patient.contact_number,
            status:patient.status,
        }));

        setPatients(mappedpatient);
        setLoading(false);

    }

    useEffect(() => {
        setPage(1);
        fetchPatients();
    }, [])

    const handleSavePatient = (data: Patient) => {
        setPatients((prev) =>
            prev.map((p) => (p.id === data.id ? data : p))
        );

        setOpen(false);
        setSelectedPatient(null);
    };

    // =========================
    // FILTER + SEARCH
    // =========================
    const filtered = patients?.filter((item: any) => {
        const keyword = search.toLowerCase();

        return (
            item.patientName.toLowerCase().includes(keyword) ||
            item.patientMobile.toLowerCase().includes(keyword)
        );
    });

    const handleClose = () => { 
        setOpen(false);
        setSelectedPatient(null);
    };

    const totalPages = Math.ceil(filtered?.length / PAGE_SIZE) ?? 1;

    const paginated = filtered?.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE
    );

    const goNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const goPrev = () => {
        if (page > 1) setPage(page - 1);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
            <h1 className="text-2xl font-semibold text-green-700">Patients</h1>
            <p className="text-sm text-gray-500">Manage clinic patient records</p>
            </div>

            <button
            onClick={() => {setOpen(true);setSelectedPatient(defaultPatient); setMode('add')}}
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl shadow cursor-pointer"
            >
            <Plus size={18} /> Add Patient 
            </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="flex items-center bg-white border rounded-xl px-3 py-2 w-full md:w-1/3 shadow-sm">
            <Search size={18} className="text-gray-400" />
            <input
                value={search}
                onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
                }}
                placeholder="Search patient..."
                className="ml-2 w-full outline-none"
            />
            </div>

            <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50">
            <Filter size={18} /> Filter
            </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full text-sm">
            <thead className="bg-emerald-50 text-emerald-700 text-left">
                <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Status</th>
                <th className="p-4">Last Visit</th>
                <th className="p-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody>
                {loading ? 
                <tr><td colSpan={5} className="text-center">Loading Data..</td></tr>
                :paginated?.map((patient) => (
                <tr key={patient.id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-800">{patient.patientName}</td>
                    <td className="p-4 text-gray-600">
                    <div>{patient.patientEmail}</div>
                    <div className="text-xs text-gray-400">{patient.patientMobile}</div>
                    </td>
                    <td className="p-4">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                        patient.status == 1
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                    >
                        {patient.status ? 'Active' : 'Inactive'}
                        {patient.status}
                    </span>
                    </td>
                    <td className="p-4 text-gray-600">{patient.lastVisit}</td>
                    <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                        <button   
                        onClick={() => {
                            setSelectedPatient(patient);
                            setOpen(true);
                            setMode('update');
                        }} 
                        className="p-2 hover:bg-gray-100 rounded-lg" title="Edit">
                        <Edit size={16} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg" title="History">
                        <Clock size={16} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreHorizontal size={16} />
                        </button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t">
            <p className="text-sm text-gray-500">
                Page {page} of {totalPages}
            </p>

            <div className="flex gap-2">
                <button
                onClick={goPrev}
                disabled={page === 1}
                className="px-3 py-1 rounded-lg border bg-white disabled:opacity-50"
                >
                Prev
                </button>
                <button
                onClick={goNext}
                disabled={page === totalPages}
                className="px-3 py-1 rounded-lg border bg-white disabled:opacity-50"
                >
                Next
                </button>
            </div>
            </div>
        </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalHeader title={`${mode} patient`}/>
                <ModalBody>
                    <PatientForm patient={selectedPatient} onSaveSuccess={handleSavePatient} onCancel={handleClose} mode={mode} />
                </ModalBody>
            </Modal>
        </div>

    );
}
