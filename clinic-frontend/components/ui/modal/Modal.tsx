"use client";

import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    // <div className="fixed inset-0 z-50 flex items-center justify-center">
    //   {/* overlay */}
    //   <div
    //     className="absolute inset-0 bg-black/40 backdrop-blur-sm"
    //     onClick={onClose}
    //   />

    //   {/* modal box */}
    //     <div
    //       className="relative w-full max-w-lg bg-white shadow-xl rounded-lg p-3 px-4
    //                 max-h-[90vh] overflow-y-auto overscroll-contain"
    //     >
    //       {children}
    //     </div>
    // </div>

    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal box */}
      <div
        className="relative w-full max-w-lg bg-white shadow-xl rounded-lg p-3 px-4
        max-h-[90vh] overflow-y-auto overscroll-contain top-7">
        {children}
      </div>
    </div>
  );
}