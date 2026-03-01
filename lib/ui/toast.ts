import { toast } from "sonner";

const baseStyle = {
  background: "#fff",
  border: "none",
};

export function showSuccess(message: string) {
  toast.success(message, {
    style: {
      ...baseStyle,
      color: "#22c55e",
    },
  });
}

export function showError(message: string) {
  toast.error(message, {
    style: {
      ...baseStyle,
      color: "#f12f2f",
    },
  });
}