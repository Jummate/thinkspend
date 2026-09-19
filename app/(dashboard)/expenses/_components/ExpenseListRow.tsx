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
        "group relative flex items-center gap-3 px-4 py-3",
        "transition-colors hover:bg-secondary",
      )}
    >
      {/* Full-row link to the detail page. Sits behind the content,
          which is pointer-events-none so clicks and cursor pass
          through to this link. The action buttons explicitly re-enable
          pointer events so they remain clickable. */}
      <Link
        href={ROUTES.EXPENSES_DETAIL(expense.id)}
        className="absolute inset-0 z-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
        aria-label={`View ${label}`}
      />

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

      {/* Actions — pointer-events explicitly on, so buttons receive
          clicks instead of passing through to the link. */}
      <div
        className={cn(
          "relative z-10 flex shrink-0 items-center gap-1 pointer-events-auto",
          "opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100",
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

      {/* Row divider — inset from the edges, hidden on the last row. */}
      {!isLast && (
        <div className="pointer-events-none absolute bottom-0 left-4 right-4 h-px bg-border" />
      )}
    </div>
  );
}

export default ExpenseListRow;