"use client";

import { useEffect, useState } from "react";
import CategoryFilterChips from "./CategoryFilterChips";
import DateRangeInput from "@/components/ui/DateRangeInput";
import AmountRangeInput from "@/components/ui/AmountRangeInput";
import {
  EMPTY_FILTERS,
  type AppliedFilters,
} from "../_lib/filters";

interface ExpensesFilterPanelProps {
  appliedFilters: AppliedFilters;
  onApply: (filters: AppliedFilters) => void;
  currencySymbol: string;
}

function ExpensesFilterPanel({
  appliedFilters,
  onApply,
  currencySymbol,
}: ExpensesFilterPanelProps) {
  // Local staged copy — the user edits this, and it's only pushed up
  // via onApply when the Apply button is clicked. Kept in sync with
  // appliedFilters via the effect below, so an external reset (e.g.
  // the page clearing filters) is reflected here.
  const [draft, setDraft] = useState<AppliedFilters>(appliedFilters);

  useEffect(() => {
    setDraft(appliedFilters);
  }, [appliedFilters]);

  const handleApply = () => {
    onApply(draft);
  };

  const handleClearAll = () => {
    setDraft(EMPTY_FILTERS);
    onApply(EMPTY_FILTERS);
  };

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6">
      {/* Categories — full width; six chips need more room than a
          third-column layout would give them. */}
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Categories
        </p>
        <CategoryFilterChips
          selected={draft.categories}
          onToggle={(categoryId) => {
            setDraft((prev) => ({
              ...prev,
              categories: prev.categories.includes(categoryId)
                ? prev.categories.filter((c) => c !== categoryId)
                : [...prev.categories, categoryId],
            }));
          }}
        />
      </div>

      {/* Date + amount share a row — both are compact. */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Date range
          </p>
          <DateRangeInput
            fromValue={draft.dateFrom ?? ""}
            toValue={draft.dateTo ?? ""}
            onFromChange={(value) =>
              setDraft((prev) => ({
                ...prev,
                dateFrom: value || undefined,
              }))
            }
            onToChange={(value) =>
              setDraft((prev) => ({
                ...prev,
                dateTo: value || undefined,
              }))
            }
          />
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Amount range ({currencySymbol})
          </p>
          <AmountRangeInput
            minValue={
              draft.minAmount !== undefined ? String(draft.minAmount) : ""
            }
            maxValue={
              draft.maxAmount !== undefined ? String(draft.maxAmount) : ""
            }
            onMinChange={(value) =>
              setDraft((prev) => ({
                ...prev,
                minAmount: value ? Number(value) : undefined,
              }))
            }
            onMaxChange={(value) =>
              setDraft((prev) => ({
                ...prev,
                maxAmount: value ? Number(value) : undefined,
              }))
            }
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={handleClearAll}
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          Clear all
        </button>
        <button
          type="button"
          onClick={handleApply}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Apply filters
        </button>
      </div>
    </div>
  );
}

export default ExpensesFilterPanel;