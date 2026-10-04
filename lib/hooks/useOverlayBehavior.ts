import { useEffect } from "react";

/**
 * Shared behavior for overlay components (Modal, BottomSheet, etc.):
 * closes on Escape, and locks body scroll while open.
 *
 * The `onClose` callback is the caller's responsibility — this hook
 * only wires up the trigger and the scroll lock.
 */
export function useOverlayBehavior(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);
}