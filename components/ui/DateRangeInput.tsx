"use client";

import DatePicker from "./DatePicker";
import { cn } from "@/lib/utils";

interface DateRangeInputProps {
  fromValue: string;
  toValue: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  className?: string;
  // When the range is part of a larger filter form, callers often need
  // to constrain the pickable range (e.g. "no earlier than account
  // creation"). Both default to undefined = unbounded.
  min?: string;
  max?: string;
}

function DateRangeInput({
  fromValue,
  toValue,
  onFromChange,
  onToChange,
  className,
  min,
  max,
}: DateRangeInputProps) {
  return (
    <div className={cn("flex items-center gap-2 min-w-0", className)}>
      <div className="flex-1 min-w-0">
        <DatePicker
          aria-label="Start date"
          value={fromValue}
          onValueChange={onFromChange}
          min={min}
          // "From" shouldn't be able to land after "To" — if it would,
          // cap it at the current `toValue`.
          max={toValue || max}
          placeholder="From"
        />
      </div>

      <span className="text-sm text-muted-foreground shrink-0">to</span>

      <div className="flex-1 min-w-0">
        <DatePicker
          aria-label="End date"
          value={toValue}
          onValueChange={onToChange}
          // Symmetrically, "To" shouldn't land before "From".
          min={fromValue || min}
          max={max}
          placeholder="To"
        />
      </div>
    </div>
  );
}

export default DateRangeInput;