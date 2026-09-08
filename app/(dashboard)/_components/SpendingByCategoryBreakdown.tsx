"use client";

import { useState } from "react";
import { formatAmountToString } from "@/lib/utils/format-amount";

export interface ChartCategory {
  category: string;
  amount: number;
  /** CSS var() reference, e.g. "var(--category-food)" — not a hex value. */
  color: string;
}

interface SpendingByCategoryBreakdownProps {
  data: ChartCategory[];
  currencySymbol: string;
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-secondary"
      }`}
    >
      {children}
    </button>
  );
}

function SpendingByCategoryBreakdown({
  data,
  currencySymbol,
}: SpendingByCategoryBreakdownProps) {
  // NOTE: this toggle is currently cosmetic — dashboard.service.ts has no
  // weekly-aggregation query, only monthly. Both views show the same
  // data until that's built. Flagged, not silently faked.
  const [chartView, setChartView] = useState<"weekly" | "monthly">("monthly");

  // Each bar's width is its share of total spending this month — matches
  // the "storage breakdown" convention this UI pattern visually implies
  // (colored dot + label + proportional bar = percentage of a whole).
  const totalAmount = data.reduce((sum, d) => sum + d.amount, 0);

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
          Spending by Category
        </h3>
        <div className="flex gap-2">
          <ToggleButton
            active={chartView === "weekly"}
            onClick={() => setChartView("weekly")}
          >
            Weekly
          </ToggleButton>
          <ToggleButton
            active={chartView === "monthly"}
            onClick={() => setChartView("monthly")}
          >
            Monthly
          </ToggleButton>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {data.map((item) => {
          const widthPercent =
            totalAmount > 0 ? (item.amount / totalAmount) * 100 : 0;

          return (
            <div key={item.category}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-semibold text-foreground">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.category}
                </span>
                <span className="text-muted-foreground">
                  {item.amount > 0
                    ? `${currencySymbol}${formatAmountToString(item.amount)}`
                    : "—"}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${widthPercent}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SpendingByCategoryBreakdown;