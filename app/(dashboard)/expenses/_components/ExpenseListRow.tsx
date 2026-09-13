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
}

function ExpenseListRow({
  expense,
  currencySymbol,
  onEdit,
  onDelete,
}: ExpenseListRowProps) {
  const category = getCategoryConfig(expense.category);
  const Icon = category.icon;
  const label = expense.description || expense.category;

  return (
    <div
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-3",
        "transition-colors hover:bg-secondary/50",
      )}
    >
      {/* Full-row link to the detail page. Sits behind the action
          buttons, which are rendered on top with their own z-index.
          Keeps the row keyboard-navigable and avoids nesting
          <button> inside <a>. */}
      <Link
        href={ROUTES.EXPENSES_DETAIL(expense.id)}
        className="absolute inset-0 z-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
        aria-label={`View ${label}`}
      />

      {/* Icon tile */}
      <div
        className={cn(
          "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
          category.badgeClass,
        )}
      >
        <Icon size={20} />
      </div>

      {/* Description + category badge + date */}
      <div className="relative z-10 min-w-0 flex-1">
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
      <div className="relative z-10 shrink-0 text-right">
        <p className="font-bold text-foreground">
          {currencySymbol}
          {formatAmountToString(expense.amount)}
        </p>
      </div>

      {/* Actions — always visible on mobile, hover-revealed on md+ */}
      <div
        className={cn(
          "relative z-10 flex shrink-0 items-center gap-1",
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
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
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
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-danger"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default ExpenseListRow;