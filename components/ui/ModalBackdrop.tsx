interface ModalBackdropProps {
  onClose: () => void;
}

/**
 * Full-screen click target behind overlay content. Closes the overlay
 * when clicked. Used by Modal and BottomSheet.
 */
function ModalBackdrop({ onClose }: ModalBackdropProps) {
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={onClose}
      className="fixed inset-0 bg-black/40"
    />
  );
}

export default ModalBackdrop;