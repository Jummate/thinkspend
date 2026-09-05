import React from "react";
import type { LucideIcon } from "lucide-react";

type AuthStatusIconProps = {
  icon: LucideIcon;
  variant: "success" | "warning";
};

const variantStyles = {
  success: "bg-primary/10 text-primary",
  warning: "bg-warning-dim text-warning",
} as const;

function AuthStatusIcon({ icon: Icon, variant }: AuthStatusIconProps) {
  return (
    <span
      className={`flex h-14 w-14 items-center justify-center rounded-full ${variantStyles[variant]}`}
    >
      <Icon className="h-6 w-6" />
    </span>
  );
}

export default AuthStatusIcon;