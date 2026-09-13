"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCategoryConfig } from "@/lib/config/categories";
import { formatExpenseDate } from "@/lib/utils/date";
import { formatAmountToString } from "@/lib/utils/format-amount";
import { ROUTES } from "@/lib/routes";
import type { Expense } from "@/lib/types/expense";

interface ExpenseGridCardProps {
  expense: Expense;
  currencySymbol: string;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

function ExpenseGridCard({
  expense,
  currencySymbol,
  onEdit,
  onDelete,
}: ExpenseGridCardProps) {
  const category = getCategoryConfig(expense.category);
  const Icon = category.icon;
  const label = expense.description || expense.category;

  return (
    <div className="group relative flex flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:border-muted-foreground/30">
      {/* Full-card link to the detail page. Sits behind the action
          buttons, which are rendered on top with their own z-index.
          Same pattern as ExpenseListRow — avoids nesting <button>
          inside <a>, keeps the whole surface navigable. */}
      <Link
        href={ROUTES.EXPENSES_DETAIL(expense.id)}
        className="absolute inset-0 z-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={`View ${label}`}
      />

      {/* Top: icon tile + amount */}
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
            category.badgeClass,
          )}
        >
          <Icon size={20} />
        </div>
        <p className="text-right text-lg font-bold text-foreground">
          {currencySymbol}
          {formatAmountToString(expense.amount)}
        </p>
      </div>

      {/* Description */}
      <p className="relative z-10 mt-4 truncate text-sm font-semibold text-foreground">
        {label}
      </p>

      {/* Category badge + date */}
      <div className="relative z-10 mt-2 flex items-center gap-2">
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

      {/* Actions — always visible, two full-width buttons */}
      <div className="relative z-10 mt-4 flex gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onEdit(expense);
          }}
          aria-label={`Edit ${label}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-card py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          <Pencil size={14} />
          Edit
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onDelete(expense);
          }}
          aria-label={`Delete ${label}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-card py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseGridCard;