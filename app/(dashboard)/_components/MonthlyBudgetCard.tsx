import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { formatAmountToString } from "@/lib/utils/format-amount";
import { ROUTES } from "@/lib/routes";
import StatCard from "./StatCard";

interface MonthlyBudgetCardProps {
  currencySymbol: string;
  budgetAmount: number;
  totalSpending: number;
}

function MonthlyBudgetCard({
  currencySymbol,
  budgetAmount,
  totalSpending,
}: MonthlyBudgetCardProps) {
  const budgetUsedPercent =
    budgetAmount > 0 ? Math.min((totalSpending / budgetAmount) * 100, 100) : 0;

  return (
    <StatCard
      label="Monthly Budget"
      icon={TrendingUp}
      iconClass="bg-category-bills/15 text-category-bills"
    >
      {budgetAmount > 0 ? (
        <>
          <h2 className="mb-3 text-4xl font-bold text-foreground">
            {currencySymbol}
            {formatAmountToString(parseFloat(budgetAmount.toFixed(2)))}
          </h2>
          <div className="h-2 w-full rounded-full bg-muted">
            <div
              className={`h-2 rounded-full transition-all ${
                budgetUsedPercent >= 90
                  ? "bg-danger"
                  : budgetUsedPercent >= 70
                    ? "bg-warning"
                    : "bg-category-bills"
              }`}
              style={{ width: `${budgetUsedPercent}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {budgetUsedPercent.toFixed(1)}% used
          </p>
        </>
      ) : (
        <div className="mt-2">
          <p className="text-sm text-muted-foreground">No budget set.</p>
          <Link
            href={ROUTES.SETTINGS}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Set a budget →
          </Link>
        </div>
      )}
    </StatCard>
  );
}

export default MonthlyBudgetCard;