"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/lib/hooks/useUser";
import { useExpenses } from "@/lib/hooks/useExpenses";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { currencyMapping } from "@/lib/types/profile";
import type { Expense } from "@/lib/types/expense";
import type { ExpenseSort } from "@/lib/services/expense.service";
import type { ViewMode } from "@/components/ui/ViewToggle";
import Pagination from "@/components/ui/Pagination";
import ExpensesToolbar from "./_components/ExpensesToolbar";
import ExpenseListRow from "./_components/ExpenseListRow";
import ExpenseGridCard from "./_components/ExpenseGridCard";

import {
  EMPTY_FILTERS,
  hasAppliedFilters,
  PAGE_SIZE,
  type AppliedFilters,
} from "./_lib/filters";
import ExpensesFilterPanel from "./_components/ExpensesFilterPanel";
import BottomSheet from "@/components/ui/BottomSheet";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

const DEBOUNCE_MS = 300;

export default function ExpensesPage() {
  const { user, profile } = useUser();
  const currencySymbol = profile ? currencyMapping[profile.currency] : "";

  const isMobile = useMediaQuery("(max-width: 639px)");

  // --- Search (live, debounced) ---
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, DEBOUNCE_MS);

  // --- Sort + view + pagination (live) ---
  const [sort, setSort] = useState<ExpenseSort>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [page, setPage] = useState(1);

  // --- Filter panel UI ---
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] =
    useState<AppliedFilters>(EMPTY_FILTERS);

  // --- Data ---
  const { data, isLoading, error } = useExpenses(user?.id, {
    search: debouncedSearch || undefined,
    sort,
    page,
    pageSize: PAGE_SIZE,
    categories:
      appliedFilters.categories.length > 0
        ? appliedFilters.categories
        : undefined,
    dateFrom: appliedFilters.dateFrom,
    dateTo: appliedFilters.dateTo,
    minAmount: appliedFilters.minAmount,
    maxAmount: appliedFilters.maxAmount,
  });

  const expenses = data?.expenses ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalAmount = data?.totalAmount ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const isFiltered =
    Boolean(debouncedSearch) || hasAppliedFilters(appliedFilters);

  // Reset to page 1 whenever the result set changes shape. Without this,
  // applying a filter while on page 5 can leave the user stranded on an
  // empty page.
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sort, appliedFilters]);

  // --- Placeholder handlers (modals come later) ---
  const handleEdit = (_expense: Expense) => {
    // TODO: open edit modal
  };

  const handleDelete = (_expense: Expense) => {
    // TODO: open delete confirmation modal
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Expenses</h1>
        <p className="text-sm text-muted-foreground">
          Manage and track all your expenses in one place.
        </p>
      </div>

      <ExpensesToolbar
        search={searchInput}
        onSearchChange={setSearchInput}
        filtersOpen={filtersOpen}
        onFiltersToggle={() => setFiltersOpen((prev) => !prev)}
        hasActiveFilters={hasAppliedFilters(appliedFilters)}
        sort={sort}
        onSortChange={setSort}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        total={totalAmount}
        currencySymbol={currencySymbol}
        isFiltered={isFiltered}
      />

{/* Desktop: inline panel below the toolbar */}
{filtersOpen && !isMobile && (
  <ExpensesFilterPanel
    appliedFilters={appliedFilters}
    onApply={setAppliedFilters}
    currencySymbol={currencySymbol}
  />
)}

{/* Mobile: bottom sheet. Closes on apply (and on clear-all, which
    also calls onApply), matching the commit-and-dismiss convention. */}
{filtersOpen && isMobile && (
  <BottomSheet
    isOpen={filtersOpen}
    onClose={() => setFiltersOpen(false)}
    title="Filter expenses"
  >
    <ExpensesFilterPanel
      appliedFilters={appliedFilters}
      onApply={(filters) => {
        setAppliedFilters(filters);
        setFiltersOpen(false);
      }}
      currencySymbol={currencySymbol}
      bare
    />
  </BottomSheet>
)}

      {!isLoading && !error && expenses.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Showing {expenses.length} of {totalCount} expenses
        </p>
      )}
      {/* Results */}
      {isLoading ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          Loading expenses...
        </p>
      ) : error ? (
        <p className="py-12 text-center text-sm text-danger">
          Failed to load expenses. Please refresh.
        </p>
      ) : expenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card py-16">
          <p className="text-sm text-muted-foreground">
            {isFiltered
              ? "No expenses match your filters."
              : "No expenses yet. Add your first one to get started."}
          </p>
        </div>
      ) : viewMode === "list" ? (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {expenses.map((expense, index) => (
            <ExpenseListRow
              key={expense.id}
              expense={expense}
              currencySymbol={currencySymbol}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isLast={index === expenses.length - 1}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {expenses.map((expense) => (
            <ExpenseGridCard
              key={expense.id}
              expense={expense}
              currencySymbol={currencySymbol}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {!isLoading && !error && expenses.length > 0 && totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
