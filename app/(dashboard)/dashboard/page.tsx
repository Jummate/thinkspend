// "use client";

// import { useUser, currencyMapping } from "@/lib/hooks/useUser";
// import { ROUTES } from "@/lib/routes";
// import { getCurrentMonth } from "@/lib/utils/date";
// import { formatAmountToString } from "@/lib/utils/format-amount";
// import {
//   CarFront,
//   Coffee,
//   CreditCard,
//   Package,
//   ScanLine,
//   ShoppingBag,
//   ShoppingBasket,
//   TrendingDown,
//   TrendingUp,
//   Zap,
// } from "lucide-react";
// import Link from "next/link";
// import React, { useState } from "react";
// import { getCategoryMeta } from "@/lib/utils/category-meta";
// import { useDashboard } from "@/lib/hooks/useDashboard";

// function CategoryIcon({ iconName }: { iconName: string }) {
//   const icons: Record<string, React.ReactNode> = {
//     Coffee: <Coffee size={18} />,
//     CarFront: <CarFront size={18} />,
//     ShoppingBasket: <ShoppingBasket size={18} />,
//     Zap: <Zap size={18} />,
//     ShoppingBag: <ShoppingBag size={18} />,
//     Package: <Package size={18} />,
//   };
//   return <>{icons[iconName] ?? <Package size={18} />}</>;
// }

// function formatExpenseDate(dateStr: string): string {
//   const date = new Date(dateStr + "T00:00:00");
//   const today = new Date();
//   const yesterday = new Date();
//   yesterday.setDate(today.getDate() - 1);

//   const isSameDay = (a: Date, b: Date) =>
//     a.getFullYear() === b.getFullYear() &&
//     a.getMonth() === b.getMonth() &&
//     a.getDate() === b.getDate();

//   if (isSameDay(date, today)) return "Today";
//   if (isSameDay(date, yesterday)) return "Yesterday";

//   return date.toLocaleDateString("en-GB", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });
// }

// const Dashboard = () => {
//   const [chartView, setChartView] = useState<"weekly" | "monthly">("monthly");
//   const { profile, user } = useUser();
//   const { stats, categorySpending, recentExpenses, budget, loading, error } =
//     useDashboard(user?.id);

//   const currencySymbol = profile ? currencyMapping[profile.currency] : "";

//   const budgetAmount = budget?.amount ?? 0;
//   const totalSpending = stats?.totalSpendingThisMonth ?? 0;
//   const budgetUsedPercent =
//     budgetAmount > 0
//       ? Math.min((totalSpending / budgetAmount) * 100, 100)
//       : 0;

//   const spendingChange = stats?.spendingChangePercent ?? 0;
//   const isDecrease = spendingChange <= 0;

//   if (loading) {
//     return (
//       <div className="min-h-screen p-6 flex items-center justify-center">
//         <p className="text-muted-foreground">Loading dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-6">
//       {/* Header Section */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
//         <p className="text-gray-500">
//           Welcome back, {profile?.firstName || ""}. Here&apos;s a summary of your
//           financial health.
//         </p>
//       </div>

//       {error && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
//           {error}
//         </div>
//       )}

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         {/* Total Spending Card */}
//         <div className="bg-white rounded-2xl p-6 border border-gray-200">
//           <div className="flex items-center justify-between mb-2">
//             <p className="text-gray-400 font-bold text-sm uppercase tracking-wide">
//               Total Spending ({getCurrentMonth()})
//             </p>
//             <div className="bg-blue-100 p-2 rounded-lg">
//               <CreditCard size={20} className="text-blue-500" />
//             </div>
//           </div>
//           <div className="flex flex-col">
//             <h2 className="text-4xl font-bold mb-1">
//               {currencySymbol}
//               {formatAmountToString(parseFloat(totalSpending.toFixed(2)))}
//             </h2>
//             <div
//               className={`flex items-center gap-1 ${isDecrease ? "text-green-500" : "text-red-500"}`}
//             >
//               {isDecrease ? (
//                 <TrendingDown size={16} />
//               ) : (
//                 <TrendingUp size={16} />
//               )}
//               <span className="text-sm font-semibold">
//                 {Math.abs(spendingChange)}% from last month
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Monthly Budget Card */}
//         <div className="bg-white rounded-2xl p-6 border border-gray-200">
//           <div className="flex items-center justify-between mb-2">
//             <p className="text-gray-400 font-bold text-sm uppercase tracking-wide">
//               Monthly Budget
//             </p>
//             <div className="bg-purple-100 p-2 rounded-lg">
//               <TrendingUp size={20} className="text-purple-500" />
//             </div>
//           </div>
//           {budgetAmount > 0 ? (
//             <>
//               <h2 className="text-4xl font-bold mb-3">
//                 {currencySymbol}
//                 {formatAmountToString(parseFloat(budgetAmount.toFixed(2)))}
//               </h2>
//               <div className="w-full bg-muted-foreground/30 rounded-full h-2">
//                 <div
//                   className={`h-2 rounded-full transition-all ${
//                     budgetUsedPercent >= 90
//                       ? "bg-red-500"
//                       : budgetUsedPercent >= 70
//                         ? "bg-amber-500"
//                         : "bg-purple-500"
//                   }`}
//                   style={{ width: `${budgetUsedPercent}%` }}
//                 />
//               </div>
//               <p className="text-xs text-muted-foreground mt-1">
//                 {budgetUsedPercent.toFixed(1)}% used
//               </p>
//             </>
//           ) : (
//             <div className="mt-2">
//               <p className="text-muted-foreground text-sm">No budget set.</p>
//               <Link
//                 href={ROUTES.SETTINGS}
//                 className="text-primary text-sm font-semibold hover:underline"
//               >
//                 Set a budget →
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Charts and Recent Expenses Row */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Spending by Category Chart */}
//         <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-xl font-semibold">Spending by Category</h3>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setChartView("weekly")}
//                 className={`px-4 py-1.5 rounded-lg text-sm transition-all ${
//                   chartView === "weekly"
//                     ? "bg-gray-700 text-white"
//                     : "text-gray-400 hover:text-white hover:bg-primary"
//                 }`}
//               >
//                 Weekly
//               </button>
//               <button
//                 onClick={() => setChartView("monthly")}
//                 className={`px-4 py-1.5 rounded-lg text-sm transition-all ${
//                   chartView === "monthly"
//                     ? "bg-primary text-white"
//                     : "text-gray-400 hover:text-white hover:bg-primary"
//                 }`}
//               >
//                 Monthly
//               </button>
//             </div>
//           </div>

//           {categorySpending.every((c) => c.amount === 0) ? (
//             <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
//               No spending recorded this month yet.
//             </div>
//           ) : (
//             <>
//               <div className="flex items-end justify-between h-64 gap-4 mb-4">
//                 {categorySpending.map((item) => {
//                   const maxAmount = Math.max(
//                     ...categorySpending.map((c) => c.amount),
//                     1
//                   );
//                   const height = (item.amount / maxAmount) * 100;
//                   return (
//                     <div
//                       key={item.category}
//                       className="flex-1 flex flex-col items-center"
//                     >
//                       <div className="w-full flex items-end justify-center h-full">
//                         <div
//                           className="w-full rounded-t-lg transition-all hover:opacity-80"
//                           style={{
//                             height: `${height}%`,
//                             backgroundColor: item.color,
//                             minHeight: item.amount > 0 ? "20px" : "0px",
//                           }}
//                         />
//                       </div>
//                       <p className="text-xs text-gray-400 mt-3 uppercase truncate w-full text-center">
//                         {item.category.split(" ")[0]}
//                       </p>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
//                 {categorySpending
//                   .filter((item) => item.amount > 0)
//                   .map((item) => (
//                     <div key={item.category} className="flex items-center gap-2">
//                       <div
//                         className="w-3 h-3 rounded-full"
//                         style={{ backgroundColor: item.color }}
//                       />
//                       <span className="text-sm text-muted-foreground">
//                         <b>{item.category}:</b> {currencySymbol}
//                         {formatAmountToString(
//                           parseFloat(item.amount.toFixed(2))
//                         )}
//                       </span>
//                     </div>
//                   ))}
//               </div>
//             </>
//           )}
//         </div>

//         {/* Recent Expenses */}
//         <div className="bg-white rounded-2xl p-6 border border-gray-200">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-xl font-semibold">Recent Expenses</h3>
//             <Link
//               href={ROUTES.EXPENSES}
//               className="text-primary text-sm hover:underline"
//             >
//               View All
//             </Link>
//           </div>

//           {recentExpenses.length === 0 ? (
//             <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
//               No expenses yet.
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {recentExpenses.map((expense) => {
//                 const meta = getCategoryMeta(expense.category);
//                 return (
//                   <div
//                     key={expense.id}
//                     className="flex items-center gap-3 hover:opacity-70 p-2 rounded-lg transition-all cursor-pointer"
//                   >
//                     <div
//                       className={`w-10 h-10 ${meta.colorClass} rounded-lg flex items-center justify-center`}
//                     >
//                       <CategoryIcon iconName={meta.iconName} />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="font-semibold text-sm truncate">
//                         {expense.description || expense.category}
//                       </p>
//                       <p className="text-xs text-gray-400">
//                         {formatExpenseDate(expense.date)}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-bold">
//                         {currencySymbol}
//                         {formatAmountToString(
//                           parseFloat(expense.amount.toFixed(2))
//                         )}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           <Link
//             href={ROUTES.EXPENSES_NEW}
//             className="w-full mt-6 bg-white hover:bg-gray-200 border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-2 transition-all"
//           >
//             <ScanLine size={18} />
//             <span className="font-semibold">Add New Expense</span>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;







"use client";

import { useUser, currencyMapping } from "@/lib/hooks/useUser";
import { useDashboard } from "@/lib/hooks/useDashboard";
import { ROUTES } from "@/lib/routes";
import { getCurrentMonth } from "@/lib/utils/date";
import { formatAmountToString } from "@/lib/utils/format-amount";
import { getCategoryMeta } from "@/lib/utils/category-meta";
import {
  CarFront,
  Coffee,
  CreditCard,
  Package,
  ScanLine,
  ShoppingBag,
  ShoppingBasket,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// ── Category icon renderer ────────────────────────────────────────────────────
function CategoryIcon({ iconName }: { iconName: string }) {
  const icons: Record<string, React.ReactNode> = {
    Coffee: <Coffee size={18} />,
    CarFront: <CarFront size={18} />,
    ShoppingBasket: <ShoppingBasket size={18} />,
    Zap: <Zap size={18} />,
    ShoppingBag: <ShoppingBag size={18} />,
    Package: <Package size={18} />,
  };
  return <>{icons[iconName] ?? <Package size={18} />}</>;
}

// ── Date formatter ────────────────────────────────────────────────────────────
function formatExpenseDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (isSameDay(date, today)) return "Today";
  if (isSameDay(date, yesterday)) return "Yesterday";

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ── Custom Recharts tooltip ───────────────────────────────────────────────────
function CustomTooltip({
  active,
  payload,
  currencySymbol,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: { category: string; color: string } }>;
  currencySymbol: string;
}) {
  if (!active || !payload?.length) return null;
  const { value, payload: item } = payload[0];
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-md text-sm">
      <p className="font-semibold text-gray-700">{item.category}</p>
      <p className="text-gray-500">
        {currencySymbol}
        {formatAmountToString(parseFloat(value.toFixed(2)))}
      </p>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const [chartView, setChartView] = useState<"weekly" | "monthly">("monthly");
  const { profile, user } = useUser();
  const { stats, categorySpending, recentExpenses, budget, loading, error } =
    useDashboard(user?.id);

  const currencySymbol = profile ? currencyMapping[profile.currency] : "";

  const budgetAmount = budget?.amount ?? 0;
  const totalSpending = stats?.totalSpendingThisMonth ?? 0;
  const budgetUsedPercent =
    budgetAmount > 0 ? Math.min((totalSpending / budgetAmount) * 100, 100) : 0;

  const spendingChange = stats?.spendingChangePercent ?? 0;
  const isDecrease = spendingChange <= 0;

  const hasSpending = categorySpending.some((c) => c.amount > 0);

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-500">
          Welcome back, {profile?.firstName || ""}. Here&apos;s a summary of
          your financial health.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Spending */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 font-bold text-sm uppercase tracking-wide">
              Total Spending ({getCurrentMonth()})
            </p>
            <div className="bg-blue-100 p-2 rounded-lg">
              <CreditCard size={20} className="text-blue-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-4xl font-bold mb-1">
              {currencySymbol}
              {formatAmountToString(parseFloat(totalSpending.toFixed(2)))}
            </h2>
            <div
              className={`flex items-center gap-1 ${isDecrease ? "text-green-500" : "text-red-500"}`}
            >
              {isDecrease ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
              <span className="text-sm font-semibold">
                {Math.abs(spendingChange)}% from last month
              </span>
            </div>
          </div>
        </div>

        {/* Monthly Budget */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 font-bold text-sm uppercase tracking-wide">
              Monthly Budget
            </p>
            <div className="bg-purple-100 p-2 rounded-lg">
              <TrendingUp size={20} className="text-purple-500" />
            </div>
          </div>
          {budgetAmount > 0 ? (
            <>
              <h2 className="text-4xl font-bold mb-3">
                {currencySymbol}
                {formatAmountToString(parseFloat(budgetAmount.toFixed(2)))}
              </h2>
              <div className="w-full bg-muted-foreground/30 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    budgetUsedPercent >= 90
                      ? "bg-red-500"
                      : budgetUsedPercent >= 70
                        ? "bg-amber-500"
                        : "bg-purple-500"
                  }`}
                  style={{ width: `${budgetUsedPercent}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {budgetUsedPercent.toFixed(1)}% used
              </p>
            </>
          ) : (
            <div className="mt-2">
              <p className="text-muted-foreground text-sm">No budget set.</p>
              <Link
                href={ROUTES.SETTINGS}
                className="text-primary text-sm font-semibold hover:underline"
              >
                Set a budget →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Chart + Recent Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recharts Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Spending by Category</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setChartView("weekly")}
                className={`px-4 py-1.5 rounded-lg text-sm transition-all ${
                  chartView === "weekly"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:text-white hover:bg-primary"
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setChartView("monthly")}
                className={`px-4 py-1.5 rounded-lg text-sm transition-all ${
                  chartView === "monthly"
                    ? "bg-primary text-white"
                    : "text-gray-400 hover:text-white hover:bg-primary"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {!hasSpending ? (
            <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
              No spending recorded this month yet.
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={256}>
                <BarChart
                  data={categorySpending}
                  margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                  barSize={36}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val: string) => val.split(" ")[0]}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val: number) =>
                      val >= 1000 ? `${(val / 1000).toFixed(0)}k` : `${val}`
                    }
                    width={40}
                  />
                  <Tooltip
                    content={<CustomTooltip currencySymbol={currencySymbol} />}
                    cursor={{ fill: "rgba(0,0,0,0.04)" }}
                  />
                  <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                    {categorySpending.map((entry) => (
                      <Cell key={entry.category} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 mt-2">
                {categorySpending
                  .filter((item) => item.amount > 0)
                  .map((item) => (
                    <div key={item.category} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
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

        {/* Recent Expenses */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Recent Expenses</h3>
            <Link
              href={ROUTES.EXPENSES}
              className="text-primary text-sm hover:underline"
            >
              View All
            </Link>
          </div>

          {recentExpenses.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
              No expenses yet.
            </div>
          ) : (
            <div className="space-y-4">
              {recentExpenses.map((expense) => {
                const meta = getCategoryMeta(expense.category);
                return (
                  <div
                    key={expense.id}
                    className="flex items-center gap-3 hover:opacity-70 p-2 rounded-lg transition-all cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 ${meta.colorClass} rounded-lg flex items-center justify-center`}
                    >
                      <CategoryIcon iconName={meta.iconName} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">
                        {expense.description || expense.category}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatExpenseDate(expense.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        {currencySymbol}
                        {formatAmountToString(
                          parseFloat(expense.amount.toFixed(2))
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
            className="w-full mt-6 bg-white hover:bg-gray-200 border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-2 transition-all"
          >
            <ScanLine size={18} />
            <span className="font-semibold">Add New Expense</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
