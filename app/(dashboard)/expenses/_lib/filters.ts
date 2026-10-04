import type { ExpenseSort } from "@/lib/services/expense.service";

/**
 * The staged filter values owned by the Expenses page. Separate from
 * ExpenseFilters because these are the *applied* values — ExpenseFilters
 * also carries search, sort, and pagination, which aren't staged behind
 * the Apply button.
 *
 * Every field is optional and absent means "no constraint." Empty values
 * should be `undefined`, never `""` — react-query keys compare
 * structurally, and `""` vs `undefined` would produce different keys for
 * what the user perceives as the same state.
 */
export interface AppliedFilters {
  categories: string[];
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
}

export const EMPTY_FILTERS: AppliedFilters = {
  categories: [],
};

/**
 * True when any staged filter would actually constrain the query.
 * Used for the toolbar's "Total (Filtered)" label and the filter
 * button's active state.
 */
export function hasAppliedFilters(filters: AppliedFilters): boolean {
  return (
    filters.categories.length > 0 ||
    filters.dateFrom !== undefined ||
    filters.dateTo !== undefined ||
    filters.minAmount !== undefined ||
    filters.maxAmount !== undefined
  );
}

export const SORT_OPTIONS: { value: ExpenseSort; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "highest", label: "Highest amount" },
  { value: "lowest", label: "Lowest amount" },
];

export const PAGE_SIZE = 20;