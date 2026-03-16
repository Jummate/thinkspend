import { supabase } from "@/lib/supabase/client";

export interface CategorySpending {
  category: string;
  amount: number;
}

export interface RecentExpense {
  id: string;
  description: string;
  category: string;
  date: string;
  amount: number;
  currency: string;
}

export interface DashboardStats {
  totalSpendingThisMonth: number;
  totalSpendingLastMonth: number;
  spendingChangePercent: number; // negative = decrease, positive = increase
}

function getMonthDateRange(month: number, year: number) {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59); // last day of month
  return {
    start: start.toISOString().split("T")[0],
    end: end.toISOString().split("T")[0],
  };
}

export async function getDashboardStats(
  userId: string
): Promise<DashboardStats> {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  // Last month (handle January → December of previous year)
  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;

  const currentRange = getMonthDateRange(currentMonth, currentYear);
  const lastRange = getMonthDateRange(lastMonth, lastMonthYear);

  const [currentResult, lastResult] = await Promise.all([
    supabase
      .from("expenses")
      .select("amount")
      .eq("user_id", userId)
      .gte("date", currentRange.start)
      .lte("date", currentRange.end),
    supabase
      .from("expenses")
      .select("amount")
      .eq("user_id", userId)
      .gte("date", lastRange.start)
      .lte("date", lastRange.end),
  ]);

  if (currentResult.error) throw currentResult.error;
  if (lastResult.error) throw lastResult.error;

  const totalThisMonth = (currentResult.data ?? []).reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );
  const totalLastMonth = (lastResult.data ?? []).reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  let spendingChangePercent = 0;
  if (totalLastMonth > 0) {
    spendingChangePercent =
      ((totalThisMonth - totalLastMonth) / totalLastMonth) * 100;
  }

  return {
    totalSpendingThisMonth: totalThisMonth,
    totalSpendingLastMonth: totalLastMonth,
    spendingChangePercent: parseFloat(spendingChangePercent.toFixed(1)),
  };
}

export async function getCategorySpending(
  userId: string
): Promise<CategorySpending[]> {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const { start, end } = getMonthDateRange(currentMonth, currentYear);

  const { data, error } = await supabase
    .from("expenses")
    .select("category, amount")
    .eq("user_id", userId)
    .gte("date", start)
    .lte("date", end);

  if (error) throw error;

  // Group and sum by category client-side
  const grouped: Record<string, number> = {};
  for (const expense of data ?? []) {
    const cat = expense.category as string;
    grouped[cat] = (grouped[cat] ?? 0) + Number(expense.amount);
  }

  return Object.entries(grouped).map(([category, amount]) => ({
    category,
    amount: parseFloat(amount.toFixed(2)),
  }));
}

export async function getRecentExpenses(
  userId: string
): Promise<RecentExpense[]> {
  const { data, error } = await supabase
    .from("expenses")
    .select("id, description, category, date, amount, currency")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) throw error;

  return (data ?? []).map((e) => ({
    id: e.id,
    description: e.description ?? "",
    category: e.category,
    date: e.date,
    amount: parseFloat(Number(e.amount).toFixed(2)),
    currency: e.currency,
  }));
}