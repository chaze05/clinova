import { ReactNode } from "react";

interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

export default function ModalBody({ children, className }: ModalBodyProps) {
  return (
    <div className={`space-y-4 ${className ?? ""}`}>
      {children}
    </div>
  );
}