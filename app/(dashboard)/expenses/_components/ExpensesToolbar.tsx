"use client";

import { Search, SlidersHorizontal } from "lucide-react";
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
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
      {/* Search — full width on mobile, fixed width on sm+. */}
      <div className="relative w-full sm:w-64 sm:shrink-0">
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

      {/* Controls + total */}
      <div className="flex items-center justify-between gap-2 sm:flex-1">
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
            onChange={(value) => onSortChange(value as ExpenseSort)}
          />
        </div>

        <div className="flex items-center gap-3">
          <ViewToggle value={viewMode} onChange={onViewModeChange} />
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
    </div>
  );
}

export default ExpensesToolbar;