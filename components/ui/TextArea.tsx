import React, { forwardRef } from "react";
import clsx from "clsx";

type TextareaProps = {
  styles?: string;
  id?: string;
  placeholder?: string;
  error?: boolean;
  rows?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ styles, id, placeholder, error, rows = 3, ...rest }, ref) => {
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          id={id}
          placeholder={placeholder}
          rows={rows}
          className={clsx(
            "border p-2 rounded-lg w-full placeholder:text-muted-foreground/60 transition-colors resize-none outline-none",
            "focus:shadow-sm focus:ring-1",
            error
              ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500"
              : "border-muted-foreground/30 focus:ring-primary",
            styles
          )}
          {...rest}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
