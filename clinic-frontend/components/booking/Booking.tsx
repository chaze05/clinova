"use client"

import React, { useEffect, useState } from 'react'
import Modal from '../ui/modal/Modal'
import Modalheader from '../ui/modal/ModalHeader'
import ModalBody from '../ui/modal/ModalBody'
import { set } from 'zod'
import BookingForm from '../forms/BookingForm'
import { useSearchParams } from "next/navigation";
import { AnimatedToaster } from '../ui/animatedToast'

export default function Booking({clinic,theme}:any) {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("openModal") === "true") {
      setOpen(true);
    }
  }, [searchParams]);

  
  return (
    <>
      <AnimatedToaster />
      <div>
          <button className={`mt-6 px-6 py-3 ${theme.primary} rounded-xl`} onClick={()=>(setOpen(true))}>
            Book Appointment
          </button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Modalheader title="Book Appointment" />
        <ModalBody>
          <BookingForm clinicData={clinic} theme={theme} mode={'public'} onClose={() => setOpen(false)} />
        </ModalBody>
      </Modal>
    </>
  )
}
