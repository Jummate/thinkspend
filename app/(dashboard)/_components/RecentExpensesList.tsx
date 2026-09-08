import Link from "next/link";
import { Plus, ScanLine } from "lucide-react";
import { getCategoryConfig } from "@/lib/config/categories";
import { formatExpenseDate } from "@/lib/utils/date";
import { formatAmountToString } from "@/lib/utils/format-amount";
import { ROUTES } from "@/lib/routes";
import type { RecentExpense } from "@/lib/services/dashboard.service";

interface RecentExpensesListProps {
  expenses: RecentExpense[];
  currencySymbol: string;
}

function RecentExpensesList({
  expenses,
  currencySymbol,
}: RecentExpensesListProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6">
      <div
        className="absolute left-0 right-0 top-0 h-[3px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--border) 0 8px, transparent 8px 14px)",
        }}
      />
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">
          Recent Expenses
        </h3>
        <Link
          href={ROUTES.EXPENSES}
          className="text-sm text-primary hover:underline"
        >
          View All
        </Link>
      </div>

      {expenses.length === 0 ? (
        <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
          No expenses yet.
        </div>
      ) : (
        <div className="space-y-4">
          {expenses.map((expense) => {
            const category = getCategoryConfig(expense.category);
            const Icon = category.icon;

            return (
              <div
                key={expense.id}
                className="flex items-center gap-3 rounded-lg p-2 transition-all hover:opacity-70"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${category.badgeClass}`}
                >
                  <Icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {expense.description || expense.category}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatExpenseDate(expense.date)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">
                    {currencySymbol}
                    {formatAmountToString(
                      parseFloat(expense.amount.toFixed(2)),
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Link
        href={ROUTES.EXPENSES_NEW}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card py-3 transition-all hover:bg-secondary"
      >
        <Plus size={18} />
        <span className="font-semibold text-foreground text-sm">Add New Expense</span>
      </Link>
    </div>
  );
}

export default RecentExpensesList;