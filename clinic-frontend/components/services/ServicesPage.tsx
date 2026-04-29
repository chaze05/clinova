"use client";

import { useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import Modal from "../ui/modal/Modal";
import ModalHeader from "../ui/modal/ModalHeader";
import ModalBody from "../ui/modal/ModalBody";
import ServiceModal from "./ServiceModal";
import { toggleService as toggleServiceAPI } from "@/lib/services";
import toast from "react-hot-toast";
import { Check, Edit } from "lucide-react";

type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number; // minutes
  isActive: boolean;
};

const dummyServices: Service[] = [
  {
    id: 1,
    name: "General Consultation",
    description: "Basic health consultation with the doctor",
    price: 500,
    duration: 30,
    isActive: true,
  },
  {
    id: 2,
    name: "Follow-up Checkup",
    description: "Follow-up consultation for existing patients",
    price: 300,
    duration: 20,
    isActive: true,
  },
  {
    id: 3,
    name: "Medical Certificate",
    description: "Issuance of medical certificate",
    price: 800,
    duration: 15,
    isActive: false,
  },
];

export default function ServicesPage(clinic:any) {
    const [services,setServices] = useState<Service[]>(clinic.clinicData);
    const [selectedService, setSelectedService] = useState<any | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [open,setOpen] = useState(false);
    const [mode,setMode] = useState<'request' | 'edit'>('edit');

    const handleToggle = (service: any) => {
        if (!service.is_active) {
            setSelectedService({
                ...service,
                price: service.price ?? service.default_price,
                duration: service.duration ?? service.default_duration,
                description: service.description ?? "",
            });
            setOpen(true);
            setMode("edit");
        } else {
            // 🔥 OPTIMISTIC UI UPDATE FIRST
            setServices((prev: any[]) =>
                prev.map((s) =>
                    s.id === service.id
                        ? { ...s, is_active: false }
                        : s
                )
            );
            // then API call
            toggleService(service.id, false,service);
        }
    };

    const updateService = (service: any) => {
        if (service.is_active) {
            // activating → open modal first
            setSelectedService({
                ...service,
                price: service.price ?? service.default_price,
                duration: service.duration ?? service.default_duration,
                description: service.description ?? "",
            });
            setOpen(true);
            setMode('edit');
        }
    };

    // const toggleService = async (serviceId: number, isActive: boolean, data?: any) => {
    //     try {
    //         await fetch(`/api/clinic/services/toggle`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 service_id: serviceId,
    //                 is_active: isActive,
    //                 ...data,
    //             }),
    //         });

    //     } catch (err) {
    //         console.error(err);
    //     }
    // };
            
    const toggleService = async (
        serviceId: number,
        isActive: boolean,
        data?: any,
        setServices?: any
    ) => {
        // 🔥 UPDATE UI FIRST (this triggers animation)
        if (setServices) {
            setServices((prev: any[]) =>
                prev.map((s) =>
                    s.id === serviceId
                        ? { ...s, is_active: isActive }
                        : s
                )
            );
        }

        try {
            await toggleServiceAPI({
                service_id: serviceId,
                is_active: isActive,
                ...data,
            });
            const actionDone = isActive ? 'Enabled' : 'Disabled';
            toast.success(`${data?.name || ''} Service ${actionDone} successfully.`);
        } catch (err) {
            console.error(err);

            // 🔁 rollback if API fails
            if (setServices) {
                setServices((prev: any[]) =>
                    prev.map((s) =>
                        s.id === serviceId
                            ? { ...s, is_active: !isActive }
                            : s
                    )
                );
            }
        }
    };

    const handleSave = () => {
        toggleService(
            selectedService.id,
            true,
            {   
                name:selectedService.name,
                price: selectedService.price,
                duration: selectedService.duration,
                description: selectedService.description,
            },
            setServices // 🔥 THIS IS REQUIRED
        );
        setOpen(false);
        setMode("request");
    };
    return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-xl font-semibold">Services</h1>
                <p className="text-sm text-gray-500">
                Manage clinic services and pricing
                </p>
            </div>
            <button 
              onClick={()=>{setOpen(true); setMode("request")}}
              className="bg-emerald-500 text-white px-4 py-2 rounded flex cursor-pointer">
                <Edit className="mr-2"/> Request New Service
            </button>
        </div>

      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {services.map((service: any) => (
          <div
            key={service.id}
            className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition"
          >

            {/* Top */}
            <div className="flex justify-between items-start">
              <h2 className="font-semibold text-lg">{service.name}</h2>

              {/* ✨ Radix Toggle */}
              <Switch.Root
                checked={service.is_active}
                onCheckedChange={() => handleToggle(service)}
                className="w-11 h-6 bg-gray-200 data-[state=checked]:bg-green-500 rounded-full relative transition outline-none cursor-pointer shadow-inner data-[state=checked]:shadow-green-300/50"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow transform translate-x-0.5 data-[state=checked]:translate-x-5 transition" />
              </Switch.Root>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 mt-2">
              {service.description}
            </p>

            {/* Details */}
            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <span>⏱ {service.duration ?? service.default_duration} mins</span>
              <span className="font-semibold text-black">
                ₱ {service.price ?? service.default_price}
              </span>
            </div>

            <button 
                className={`p-2 text-center w-full mt-2  text-white rounded-sm ${service.is_active ? 'bg-emerald-500 cursor-pointer':'bg-gray-400 cursor-not-allowed'}`}
                onClick={()=> { updateService(service)}}>
                Update
            </button>
          </div>
        ))}
      </div>


    {/* THIS is where your snippet belongs */}
    <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader title={`Configure ${selectedService?.name || ''}`} />
        <ModalBody>
            {/* <CreateClinicForm onClose={() => setOpen(false)} /> */}
            <ServiceModal service={selectedService} mode={mode} onClose={() => {setOpen(false)}} onSave={handleSave}/>
        </ModalBody>
    </Modal>

      {/* Modal */}
      {modalOpen && selectedService && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">

            <h2 className="text-lg font-semibold mb-4">
              Configure {selectedService.name}
            </h2>

            {/* Price */}
            <div className="mb-3">
              <label className="text-sm">Price</label>
              <input
                type="number"
                value={selectedService.price ?? ""}
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
                    price: Number(e.target.value),
                  })
                }
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            {/* Duration */}
            <div className="mb-3">
              <label className="text-sm">Duration (mins)</label>
              <input
                type="number"
                value={selectedService.duration ?? ""}
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
                    duration: Number(e.target.value),
                  })
                }
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="text-sm">Description (optional)</label>
              <textarea
                value={selectedService.description ?? ""}
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
                    description: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}


