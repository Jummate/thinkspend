import clsx from "clsx";
import type { ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "danger-outline";

type ButtonProps = {
  type?: "submit" | "button";
  onClick?: () => void;
  children: ReactNode;
  variant?: ButtonVariant;
  /**
   * When true (default), the button stretches to its container's width.
   * Pass false for content-width buttons — Settings' Save, the header's
   * Add Expense, the Danger Zone rows.
   */
  fullWidth?: boolean;
  styles?: string;
  disabled?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "cursor-pointer bg-primary text-primary-foreground hover:bg-primary-dark",
  secondary:
    "cursor-pointer border border-border bg-card text-foreground hover:bg-secondary",
  danger:
    "cursor-pointer bg-danger text-danger-foreground hover:bg-danger-dark",
  "danger-outline":
    "cursor-pointer border border-danger bg-danger/10 text-danger hover:bg-danger/20",
};

const Button = ({
  type = "button",
  variant = "primary",
  fullWidth = true,
  styles,
  children,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "rounded-lg p-2 transition-colors",
        fullWidth && "w-full",
        disabled
          ? "cursor-not-allowed bg-secondary text-muted-foreground"
          : variantClasses[variant],
        styles,
      )}
    >
      {children}
    </button>
  );
};

export default Button;