"use client";

import { forwardRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { formatAmountToString } from "@/lib/utils/format-amount";

interface AmountInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "type"
  > {
  // Raw, unformatted value — e.g. "15500". The input displays the
  // grouped form ("15,500") but always reports the raw string back, so
  // callers can send it straight to Supabase without re-stripping.
  value: string;
  onValueChange: (value: string) => void;
  error?: boolean;
  // When true, emits no border, background, ring, or rounding — the
  // caller is responsible for the shell (e.g. FormAmountInput's
  // currency-prefix wrapper). Prevents the clsx class-conflict problem
  // that would otherwise occur when both this and the wrapper style the
  // border.
  bare?: boolean;
  inputClassName?: string;
}

/**
 * Formats a raw integer string for display: "15500" -> "15,500".
 * Empty stays empty (so the placeholder shows) rather than becoming "0".
 * Non-numeric input returns an empty string — callers never see NaN.
 */
function formatRaw(raw: string): string {
  if (!raw) return "";
  const num = Number(raw);
  if (!Number.isFinite(num)) return "";
  return formatAmountToString(num);
}

const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  (
    {
      value,
      onValueChange,
      error,
      bare,
      disabled,
      inputClassName,
      className,
      ...props
    },
    ref,
  ) => {
    // Local display state so the grouped formatting doesn't fight the
    // caret while typing. Kept in sync with `value` via the effect below.
    const [display, setDisplay] = useState(() => formatRaw(value));

    useEffect(() => {
      setDisplay(formatRaw(value));
    }, [value]);

    return (
      <input
        {...props}
        ref={ref}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        disabled={disabled}
        value={display}
        onChange={(e) => {
          const raw = e.target.value.replace(/,/g, "");

          // Integers only — reject anything that isn't purely digits.
          if (!/^\d*$/.test(raw)) return;

          setDisplay(formatRaw(raw));
          onValueChange(raw);
        }}
        className={cn(
          "h-10 w-full px-3 text-sm transition-shadow",
          "placeholder:text-muted-foreground focus:outline-none",
          // `bare` hands the shell entirely to the caller — no border,
          // background, ring, or rounding from this component.
          // Otherwise, border + ring live in mutually-exclusive branches
          // because `cn` is plain clsx (no tailwind-merge): concatenating
          // e.g. `border-border` with `border-danger` would leave both in
          // the class string and let stylesheet order decide the winner.
          bare
            ? ""
            : disabled
              ? "rounded-lg border border-border bg-secondary text-muted-foreground opacity-50 focus:ring-0 cursor-not-allowed"
              : error
                ? "rounded-lg border border-danger bg-card text-foreground focus:border-transparent focus:ring-2 focus:ring-danger"
                : "rounded-lg border border-muted-foreground/30 bg-card text-foreground focus:border-transparent focus:ring-2 focus:ring-primary",
          inputClassName,
          className,
        )}
      />
    );
  },
);

AmountInput.displayName = "AmountInput";

export default AmountInput;