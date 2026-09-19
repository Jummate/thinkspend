"use client";

import { useRef, useState } from "react";
import { ArrowUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/lib/hooks/useClickOutside";

export interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
  /**
   * Which edge of the trigger the menu aligns to. "left" makes the menu
   * extend rightward (correct when the trigger is on the left side of
   * its container, as in the Expenses toolbar). "right" makes it extend
   * leftward (correct for a right-anchored trigger).
   */
  align?: "left" | "right";
}

function SortDropdown({
  options,
  value,
  onChange,
  align = "left",
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsOpen(false), isOpen);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? "";

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
      >
        <ArrowUpDown size={16} />
        <span className="hidden sm:inline">{selectedLabel}</span>
      </button>

      {isOpen && (
        <div
          role="listbox"
          className={cn(
            "absolute top-full z-20 mt-2 w-48 rounded-xl border border-border bg-card p-1.5 shadow-lg",
            align === "left" ? "left-0" : "right-0",
          )}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-secondary",
                option.value === value
                  ? "font-semibold text-primary"
                  : "text-foreground",
              )}
            >
              {option.label}
              {option.value === value && <Check size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortDropdown;