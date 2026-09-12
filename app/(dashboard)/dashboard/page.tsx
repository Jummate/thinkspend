import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/services/profile.service";
import {
  getCategorySpending,
  getDashboardStats,
  getRecentExpenses,
} from "@/lib/services/dashboard.service";
import { getBudgetForMonth } from "@/lib/services/budget.service";
import { CATEGORIES } from "@/lib/config/categories";
import { currencyMapping } from "@/lib/types/profile";
import { getCurrentMonth } from "@/lib/utils/date";
import { ROUTES } from "@/lib/routes";
import TotalSpendingCard from "../_components/TotalSpendingCard";
import MonthlyBudgetCard from "../_components/MonthlyBudgetCard";
import RecentExpensesList from "../_components/RecentExpensesList";
import SpendingByCategoryBreakdown from "../_components/SpendingByCategoryBreakdown";


export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Defense in depth — proxy.ts middleware already blocks unauthenticated
  // requests to /dashboard before they reach here, but this keeps the
  // page correct (and TypeScript happy about `user` below) even if that
  // ever changes.
  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const [profile, stats, categorySpending, recentExpenses, budget] =
    await Promise.all([
      getProfile(supabase, user.id),
      getDashboardStats(supabase, user.id),
      getCategorySpending(supabase, user.id),
      getRecentExpenses(supabase, user.id),
      getBudgetForMonth(supabase, user.id, currentMonth, currentYear),
    ]);

  const currencySymbol = profile ? currencyMapping[profile.currency] : "";

  // Merge real spending into the full category list so the chart always
  // shows every category, including ones with zero spending this month.
  const spendingByCategory: Record<string, number> = {};
  for (const item of categorySpending) {
    spendingByCategory[item.category] = item.amount;
  }
  const chartData = CATEGORIES.map((category) => ({
    category: category.label,
    amount: spendingByCategory[category.id] ?? 0,
    color: category.chartColorVar,
  }));

  return (
    <div className="min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome back, {profile?.firstName || ""}. Here&apos;s a summary of
          your financial health.
        </p>
      </div>



      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <TotalSpendingCard
          currencySymbol={currencySymbol}
          totalSpending={stats.totalSpendingThisMonth}
          spendingChangePercent={stats.spendingChangePercent}
          monthLabel={getCurrentMonth()}
        />
        <MonthlyBudgetCard
          currencySymbol={currencySymbol}
          budgetAmount={budget?.amount ?? 0}
          totalSpending={stats.totalSpendingThisMonth}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SpendingByCategoryBreakdown
            data={chartData}
            currencySymbol={currencySymbol}
          />
        </div>
        <RecentExpensesList
          expenses={recentExpenses}
          currencySymbol={currencySymbol}
        />
      </div>
    </div>
  );
}