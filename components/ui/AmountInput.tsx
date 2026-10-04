"use client";

import { forwardRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { formatAmountToString } from "@/lib/utils/format-amount";

interface AmountInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "type"
  > {
  // Raw, unformatted value — e.g. "15500" or "25.50". The input displays
  // the grouped form ("15,500", "25.50") but always reports the raw
  // string back, so callers can send it straight to Supabase without
  // re-stripping.
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

/** Groups the integer part with commas: "15500" -> "15,500". */
function formatInteger(intPart: string): string {
  if (!intPart) return "";
  const num = Number(intPart);
  if (!Number.isFinite(num)) return "";
  return num.toLocaleString("en-US");
}

/**
 * Formats a raw amount string for display.
 *
 * `padDecimals` controls whether a partial decimal is padded to 2 places:
 *   - false (while typing): "25.4" -> "25.4"   — do NOT pad, or the user
 *     can't edit what they typed (the trailing 0 regenerates on delete)
 *   - true  (on blur / external change): "25.4" -> "25.40"
 *
 * Trailing and leading dots are always preserved, so "25." and ".5"
 * remain typeable as intermediate states.
 */
function formatRaw(raw: string, padDecimals: boolean): string {
  if (!raw) return "";

  // Trailing dot — preserve, group the integer part only.
  if (raw.endsWith(".")) {
    const intPart = raw.slice(0, -1);
    return intPart ? `${formatInteger(intPart)}.` : ".";
  }

  // Leading dot — preserve as-is. ".5" is a valid intermediate state
  // on the way to "0.5".
  if (raw.startsWith(".")) {
    return raw;
  }

  const [intPart, decPart] = raw.split(".");

  // No decimal point at all — just group the integer.
  if (decPart === undefined) {
    return formatInteger(intPart);
  }

  // There is a decimal point. When padding (blur / external), delegate
  // to the full formatter so "25.4" becomes "25.40". While typing,
  // keep exactly what the user has entered.
  if (padDecimals) {
    const num = Number(raw);
    if (!Number.isFinite(num)) return "";
    return formatAmountToString(num);
  }

  return `${formatInteger(intPart)}.${decPart}`;
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
      onBlur,
      ...props
    },
    ref,
  ) => {
    // Local display state so the grouped formatting doesn't fight the
    // caret while typing. Kept in sync with `value` via the effect below.
    // Initial value is padded — it came from outside, not from typing.
    const [display, setDisplay] = useState(() => formatRaw(value, true));

    useEffect(() => {
      setDisplay(formatRaw(value, true));
    }, [value]);

    return (
      <input
        {...props}
        ref={ref}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        disabled={disabled}
        value={display}
        onChange={(e) => {
          const raw = e.target.value.replace(/,/g, "");

          // Digits, optional single dot, up to 2 decimals. Rejects
          // "25.999" (3rd decimal), "25.5.5" (second dot), and anything
          // non-numeric. "25." and ".5" pass — they're valid intermediate
          // states while typing.
          if (!/^\d*\.?\d{0,2}$/.test(raw)) return;

          // While typing, do NOT pad decimals — "25.4" stays "25.4" so
          // the user can keep editing without a regenerating trailing 0.
          setDisplay(formatRaw(raw, false));
          onValueChange(raw);
        }}
        onBlur={(e) => {
          // Normalize on blur: "25." -> "25", ".5" -> "0.5".
          // Trailing/leading dots are only valid mid-typing.
          let normalized = value;
          if (normalized.endsWith(".")) {
            normalized = normalized.slice(0, -1);
          }
          if (normalized.startsWith(".")) {
            normalized = `0${normalized}`;
          }

          if (normalized !== value) {
            onValueChange(normalized);
          }
          // Always re-render padded on blur, whether or not raw changed —
          // this is where "25.4" becomes "25.40".
          setDisplay(formatRaw(normalized, true));

          onBlur?.(e);
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