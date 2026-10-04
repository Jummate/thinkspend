"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import StatusIcon from "./StatusIcon";
import Modal from "./Modal";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  icon: LucideIcon;
  variant: "warning" | "danger";
  title: string;
  description: ReactNode;
  confirmLabel: string;
  loadingLabel: string;
  isLoading?: boolean;
  isConfirmDisabled?: boolean;
  /** Extra content between description and buttons — e.g. Delete's
   * "type DELETE to confirm" input. Pause doesn't pass this. */
  children?: ReactNode;
}

const confirmButtonClass = {
  warning: "bg-warning text-white",
  danger: "bg-danger text-white",
} as const;

function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  icon,
  variant,
  title,
  description,
  confirmLabel,
  loadingLabel,
  isLoading,
  isConfirmDisabled,
  children,
}: ConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <StatusIcon icon={icon} variant={variant} />
      <h2 className="mt-4 text-xl font-bold text-foreground">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </div>

      {children}

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="flex-1 rounded-lg bg-secondary px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading || isConfirmDisabled}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-bold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 ${confirmButtonClass[variant]}`}
        >
          {isLoading ? loadingLabel : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;