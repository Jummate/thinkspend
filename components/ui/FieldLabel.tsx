import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FieldLabelProps {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  className?: string;
}

/**
 * Standard form label. Owns the app's label styling so every labeled
 * field renders identically, whether the label comes from a
 * self-labeling component (FormAmountInput, DatePicker) or is written
 * inline in a form.
 */
function FieldLabel({
  htmlFor,
  children,
  required,
  className,
}: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("text-sm font-medium text-muted-foreground", className)}
    >
      {children}
      {required && <span className="ml-1 text-danger">*</span>}
    </label>
  );
}

export default FieldLabel;