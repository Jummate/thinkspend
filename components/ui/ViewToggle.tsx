"use client";

import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewMode = "list" | "grid";

interface ViewToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

function ViewToggle({ value, onChange }: ViewToggleProps) {
  const buttonClass = (isActive: boolean) =>
    cn(
      "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
      isActive
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:bg-secondary",
    );

  return (
    <div
      role="radiogroup"
      aria-label="View mode"
      className="flex items-center gap-1 rounded-lg border border-border bg-card p-1"
    >
      <button
        type="button"
        role="radio"
        aria-checked={value === "list"}
        aria-label="List view"
        onClick={() => onChange("list")}
        className={buttonClass(value === "list")}
      >
        <List size={16} />
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={value === "grid"}
        aria-label="Grid view"
        onClick={() => onChange("grid")}
        className={buttonClass(value === "grid")}
      >
        <LayoutGrid size={16} />
      </button>
    </div>
  );
}

export default ViewToggle;