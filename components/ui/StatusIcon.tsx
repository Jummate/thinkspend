import React from "react";
import type { LucideIcon } from "lucide-react";

type StatusIconProps = {
  icon: LucideIcon;
  variant: "success" | "warning" | "danger";
};

const variantStyles = {
  success: "bg-primary/10 text-primary",
  warning: "bg-warning-dim text-warning",
  danger: "bg-danger/10 text-danger",
} as const;

function StatusIcon({ icon: Icon, variant }: StatusIconProps) {
  return (
    <span
      className={`flex h-14 w-14 items-center justify-center rounded-full ${variantStyles[variant]}`}
    >
      <Icon className="h-6 w-6" />
    </span>
  );
}

export default StatusIcon;