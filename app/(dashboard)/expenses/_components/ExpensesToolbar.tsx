"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import SortDropdown, { type SortOption } from "@/components/ui/SortDropdown";
import ViewToggle, { type ViewMode } from "@/components/ui/ViewToggle";
import { formatAmountToString } from "@/lib/utils/format-amount";
import type { ExpenseSort } from "@/lib/services/expense.service";

const SORT_OPTIONS: SortOption[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "highest", label: "Highest amount" },
  { value: "lowest", label: "Lowest amount" },
];

interface ExpensesToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  filtersOpen: boolean;
  onFiltersToggle: () => void;
  hasActiveFilters: boolean;

  sort: ExpenseSort;
  onSortChange: (value: ExpenseSort) => void;

  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;

  total: number;
  currencySymbol: string;
  isFiltered: boolean;
}

function ExpensesToolbar({
  search,
  onSearchChange,
  filtersOpen,
  onFiltersToggle,
  hasActiveFilters,
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
  total,
  currencySymbol,
  isFiltered,
}: ExpensesToolbarProps) {
  // Mobile-only: whether the collapsed search input is expanded.
  // The input itself is always rendered on sm+; below sm it's hidden
  // until the icon is tapped.
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      {/* Row 1 — desktop/tablet: search left, total right.
          Mobile: total only, plus a search icon that expands the input. */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search — hidden below sm unless expanded */}
        <div
          className={cn(
            "relative w-full sm:block sm:max-w-xs",
            mobileSearchOpen ? "block" : "hidden",
          )}
        >
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search expenses..."
            className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center justify-between gap-2 sm:block sm:shrink-0 sm:text-right">
          {/* Mobile-only search icon toggle */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen((prev) => !prev)}
            aria-label={mobileSearchOpen ? "Close search" : "Open search"}
            aria-expanded={mobileSearchOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:hidden"
          >
            {mobileSearchOpen ? <X size={16} /> : <Search size={16} />}
          </button>

          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {isFiltered ? "Total (Filtered)" : "Total"}
            </p>
            <p className="text-xl font-bold text-foreground">
              {currencySymbol}
              {formatAmountToString(total)}
            </p>
          </div>
        </div>
      </div>

      {/* Row 2 — filter toggle + sort + view toggle */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onFiltersToggle}
            aria-expanded={filtersOpen}
            className={cn(
              "flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition-colors",
              hasActiveFilters
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-foreground hover:bg-secondary",
            )}
          >
            <SlidersHorizontal size={16} />
            <span className="hidden sm:inline">Filter</span>
          </button>

          <SortDropdown
            options={SORT_OPTIONS}
            value={sort}
            // SortDropdown is not generic over its value type, so the
            // string it emits is narrowed here. Safe because SORT_OPTIONS
            // is the only source of values this dropdown can produce.
            onChange={(value) => onSortChange(value as ExpenseSort)}
          />
        </div>

        {/* ViewToggle is desktop/tablet only — hidden below sm per the
            earlier decision that a single-column "grid" is visually
            identical to a list row at mobile width, so the control
            would offer no real choice. */}
        <div className="hidden sm:block">
          <ViewToggle value={viewMode} onChange={onViewModeChange} />
        </div>
      </div>
    </div>
  );
}

export default ExpensesToolbar;