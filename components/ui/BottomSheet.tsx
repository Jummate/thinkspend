"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import ModalBackdrop from "./ModalBackdrop";
import { useOverlayBehavior } from "@/lib/hooks/useOverlayBehavior";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/**
 * Bottom-anchored overlay panel. Mobile-only by convention — the outer
 * container carries `sm:hidden`, since sheets are a mobile pattern and
 * wider viewports use inline layouts instead.
 *
 * Behaviors (Escape to close, backdrop click, body scroll lock) are
 * shared with Modal via useOverlayBehavior. Presentation is deliberately
 * independent: full-width, anchored to the bottom, rounded top corners,
 * capped height with internal scroll, header row with title and close.
 */
function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  useOverlayBehavior(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <ModalBackdrop onClose={onClose} />
      <div className="relative z-10 flex max-h-[80vh] w-full flex-col overflow-y-auto rounded-t-2xl bg-card shadow-2xl">
        <div className="flex items-center justify-between px-6 pb-2 pt-6">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  );
}

export default BottomSheet;