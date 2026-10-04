"use client";

import AmountInput from "./AmountInput";
import { cn } from "@/lib/utils";

interface AmountRangeInputProps {
  // Raw integer strings — "5000", "50000". AmountInput handles grouping
  // for display; these stay unformatted so they can go straight to the
  // query builder as Number(...) when non-empty.
  minValue: string;
  maxValue: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  className?: string;
  minPlaceholder?: string;
  maxPlaceholder?: string;
}

function AmountRangeInput({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  className,
  minPlaceholder = "Min",
  maxPlaceholder = "Max",
}: AmountRangeInputProps) {
  // Cross-field clamping. Both values are raw digit strings, so a plain
  // numeric compare works — no need to parse through commas.
  const minNum = minValue ? Number(minValue) : null;
  const maxNum = maxValue ? Number(maxValue) : null;

  const minHasError =
    minNum !== null && maxNum !== null && minNum > maxNum;
  const maxHasError =
    minNum !== null && maxNum !== null && maxNum < minNum;

  return (
    <div className={cn("flex items-center gap-2 min-w-0", className)}>
      <div className="flex-1 min-w-0">
        <AmountInput
          placeholder={minPlaceholder}
          error={minHasError}
          value={minValue}
          onValueChange={onMinChange}
        />
      </div>

      <span className="text-sm text-muted-foreground shrink-0">-</span>

      <div className="flex-1 min-w-0">
        <AmountInput
          placeholder={maxPlaceholder}
          error={maxHasError}
          value={maxValue}
          onValueChange={onMaxChange}
        />
      </div>
    </div>
  );
}

export default AmountRangeInput;