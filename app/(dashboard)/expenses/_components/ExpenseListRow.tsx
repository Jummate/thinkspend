"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCategoryConfig } from "@/lib/config/categories";
import { formatExpenseDate } from "@/lib/utils/date";
import { formatAmountToString } from "@/lib/utils/format-amount";
import { ROUTES } from "@/lib/routes";
import type { Expense } from "@/lib/types/expense";

interface ExpenseListRowProps {
  expense: Expense;
  currencySymbol: string;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
  isLast: boolean;
}

function ExpenseListRow({
  expense,
  currencySymbol,
  onEdit,
  onDelete,
  isLast,
}: ExpenseListRowProps) {
  const category = getCategoryConfig(expense.category);
  const Icon = category.icon;
  const label = expense.description || expense.category;

  return (
    <div
      className={cn(
        "group relative transition-colors hover:bg-secondary",
        "px-4 py-3",
      )}
    >
      {/* Full-row link. Sits behind everything; the content is
          pointer-events-none so clicks and cursor pass through. The
          action buttons re-enable pointer events for themselves. */}
      <Link
        href={ROUTES.EXPENSES_DETAIL(expense.id)}
        className="absolute inset-0 z-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
        aria-label={`View ${label}`}
      />

      {/* ─────────────────────────────────────────────────────────
          MOBILE — grid layout.
          Row 1: icon | description | amount
          Row 2: icon | meta (spans description + amount)
          Row 3: actions (spans all, right-aligned)
          ───────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1 sm:hidden">
        {/* Icon */}
        <div
          className={cn(
            "pointer-events-none relative z-10 col-start-1 row-start-1 row-span-2 flex h-12 w-12 items-center justify-center rounded-lg",
            category.badgeClass,
          )}
        >
          <Icon size={20} />
        </div>

        {/* Description */}
        <p className="pointer-events-none relative z-10 col-start-2 row-start-1 min-w-0 truncate text-sm font-semibold text-foreground">
          {label}
        </p>

        {/* Amount */}
        <p className="pointer-events-none relative z-10 col-start-3 row-start-1 shrink-0 text-right font-bold text-foreground">
          {currencySymbol}
          {formatAmountToString(expense.amount)}
        </p>

        {/* Badge + date — spans the description and amount columns */}
        <div className="pointer-events-none relative z-10 col-start-2 col-span-2 row-start-2 flex min-w-0 items-center gap-2">
          <span
            className={cn(
              "inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-xs font-medium",
              category.badgeClass,
            )}
          >
            {category.label}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {formatExpenseDate(expense.date)}
          </span>
        </div>

        {/* Actions — own row, right-aligned, always visible on mobile */}
        <div className="pointer-events-auto relative z-10 col-start-1 col-span-3 row-start-3 flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onEdit(expense);
            }}
            aria-label={`Edit ${label}`}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            <Pencil size={16} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onDelete(expense);
            }}
            aria-label={`Delete ${label}`}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-background hover:text-danger"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          DESKTOP — flex layout, unchanged from the working version.
          icon | description+badge+date | amount | actions
          Actions are hover-revealed.
          ───────────────────────────────────────────────────────── */}
      <div className="hidden items-center gap-3 sm:flex">
        {/* Icon tile */}
        <div
          className={cn(
            "pointer-events-none relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
            category.badgeClass,
          )}
        >
          <Icon size={20} />
        </div>

        {/* Description + category badge + date */}
        <div className="pointer-events-none relative z-10 min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {label}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <span
              className={cn(
                "inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-xs font-medium",
                category.badgeClass,
              )}
            >
              {category.label}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatExpenseDate(expense.date)}
            </span>
          </div>
        </div>

        {/* Amount */}
        <div className="pointer-events-none relative z-10 shrink-0 text-right">
          <p className="font-bold text-foreground">
            {currencySymbol}
            {formatAmountToString(expense.amount)}
          </p>
        </div>

        {/* Actions — hover-revealed on desktop */}
        <div
          className={cn(
            "pointer-events-auto relative z-10 flex shrink-0 items-center gap-1",
            "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
            "transition-opacity",
          )}
        >
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onEdit(expense);
            }}
            aria-label={`Edit ${label}`}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            <Pencil size={16} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onDelete(expense);
            }}
            aria-label={`Delete ${label}`}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-background hover:text-danger"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Divider — inset from the edges, hidden on the last row. */}
      {!isLast && (
        <div className="pointer-events-none absolute bottom-0 left-4 right-4 h-px bg-border" />
      )}
    </div>
  );
}

export default ExpenseListRow;