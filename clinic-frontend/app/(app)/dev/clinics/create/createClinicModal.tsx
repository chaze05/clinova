"use client";

import { useState } from "react";
import Modal from "@/components/ui/modal/Modal";
import ModalHeader from "@/components/ui/modal/ModalHeader";
import ModalBody from "@/components/ui/modal/ModalBody";
import CreateClinicForm from "./createClinicForm";

export default function CreateClinicModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-green-600 text-white rounded-lg"
      >
        Add Clinic
      </button>

      {/* THIS is where your snippet belongs */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader title="Create Clinic" />
        <ModalBody>
          <CreateClinicForm onClose={() => setOpen(false)} />
        </ModalBody>
      </Modal>
    </>
  );
}