"use client";

import type { ReactNode } from "react";
import ModalBackdrop from "./ModalBackdrop";
import { useOverlayBehavior } from "@/lib/hooks/useOverlayBehavior";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  useOverlayBehavior(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <ModalBackdrop onClose={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-card p-8 shadow-2xl">
        {children}
      </div>
    </div>
  );
}

export default Modal;