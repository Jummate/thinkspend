"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatAmountToString } from "@/lib/utils/format-amount";

export interface ChartCategory {
  category: string;
  amount: number;
  /** CSS var() reference, e.g. "var(--category-food)" — not a hex value. */
  color: string;
}

interface SpendingByCategoryChartProps {
  data: ChartCategory[];
  currencySymbol: string;
}

interface TooltipPayloadEntry {
  value: number;
  payload: { category: string; color: string };
}

function CustomTooltip({
  active,
  payload,
  currencySymbol,
}: {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  currencySymbol: string;
}) {
  if (!active || !payload?.length) return null;
  const { value, payload: item } = payload[0];
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-sm shadow-md">
      <p className="font-semibold text-card-foreground">{item.category}</p>
      <p className="text-muted-foreground">
        {currencySymbol}
        {formatAmountToString(parseFloat(value.toFixed(2)))}
      </p>
    </div>
  );
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

function SpendingByCategoryChart({
  data,
  currencySymbol,
}: SpendingByCategoryChartProps) {
  // NOTE: this toggle is currently cosmetic — dashboard.service.ts has no
  // weekly-aggregation query, only monthly. Both views show the same
  // data until that's built. Flagged, not silently faked.
  const [chartView, setChartView] = useState<"weekly" | "monthly">("monthly");

  const hasSpending = data.some((c) => c.amount > 0);

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
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

      {!hasSpending ? (
        <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          No spending recorded this month yet.
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={256}>
            <BarChart
              data={data}
              margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
              barSize={36}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border)"
              />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val: string) => val.split(" ")[0]}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val: number) =>
                  val >= 1000 ? `${(val / 1000).toFixed(0)}k` : `${val}`
                }
                width={40}
              />
              <Tooltip
                content={<CustomTooltip currencySymbol={currencySymbol} />}
                cursor={{ fill: "var(--secondary)" }}
              />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {data.map((entry) => (
                  <Cell key={entry.category} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-2 flex flex-wrap gap-4 border-t border-border pt-4">
            {data
              .filter((item) => item.amount > 0)
              .map((item) => (
                <div key={item.category} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    <b>{item.category}:</b> {currencySymbol}
                    {formatAmountToString(parseFloat(item.amount.toFixed(2)))}
                  </span>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SpendingByCategoryChart;