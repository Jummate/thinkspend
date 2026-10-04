import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FieldLabelProps {
  /**
   * The id of the input this label is for. When omitted, the label
   * renders without an association — used by wrappers like Settings'
   * `Field`, which can't know the child input's id.
   */
  htmlFor?: string;
  children: ReactNode;
  required?: boolean;
  className?: string;
}

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