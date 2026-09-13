"use client";

import type { ReactNode } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";
import AmountInput from "./AmountInput";

interface FormAmountInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  placeholder?: string;
  id?: string;
  // When provided, renders a bordered shell with this content pinned to
  // the left (typically a currency symbol like "₦"). The input draws no
  // border of its own in that case — the shell owns it.
  prefix?: ReactNode;
  containerClassName?: string;
  inputClassName?: string;
}

function FormAmountInput<T extends FieldValues>({
  control,
  name,
  label,
  required,
  error,
  hint,
  placeholder,
  id,
  prefix,
  containerClassName,
  inputClassName,
}: FormAmountInputProps<T>) {
  const inputId = id ?? name;
  const hasError = !!error;

  return (
    <div className={cn("flex w-full flex-col gap-1.5", containerClassName)}>
      <label htmlFor={inputId} className="text-sm font-medium text-muted-foreground">
        {label}
        {required && <span className="text-danger ml-1">*</span>}
      </label>

      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const input = (
            <AmountInput
              id={inputId}
              placeholder={placeholder}
              error={hasError}
              bare={!!prefix}
              value={field.value ?? ""}
              onValueChange={field.onChange}
              onBlur={field.onBlur}
              inputClassName={inputClassName}
            />
          );

          if (!prefix) return input;

          return (
            <div
              className={cn(
                "flex items-center overflow-hidden rounded-lg border bg-card transition-all",
                hasError
                  ? "border-danger focus-within:ring-1 focus-within:ring-danger"
                  : "border-muted-foreground/30 focus-within:ring-1 focus-within:ring-primary",
              )}
            >
              <span className="border-r border-muted-foreground/30 px-3 text-sm font-bold text-muted-foreground">
                {prefix}
              </span>
              {input}
            </div>
          );
        }}
      />

      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}

export default FormAmountInput;