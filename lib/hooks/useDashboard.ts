"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getDashboardStats,
  getCategorySpending,
  getRecentExpenses,
  DashboardStats,
  CategorySpending,
  RecentExpense,
} from "@/lib/services/dashboard.service";
import { getBudgetForMonth, Budget } from "@/lib/services/budget.service";
import { ALL_CHART_CATEGORIES } from "@/lib/utils/category-meta";

export interface ChartCategory {
  category: string;
  amount: number;
  color: string;
}

export interface UseDashboardReturn {
  stats: DashboardStats | null;
  categorySpending: ChartCategory[];
  recentExpenses: RecentExpense[];
  budget: Budget | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useDashboard(userId: string | undefined): UseDashboardReturn {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [categorySpending, setCategorySpending] = useState<ChartCategory[]>([]);
  const [recentExpenses, setRecentExpenses] = useState<RecentExpense[]>([]);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    try {
      const [fetchedStats, fetchedCategorySpending, fetchedRecent, fetchedBudget] =
        await Promise.all([
          getDashboardStats(userId),
          getCategorySpending(userId),
          getRecentExpenses(userId),
          getBudgetForMonth(userId, currentMonth, currentYear),
        ]);

      setStats(fetchedStats);

      // Merge real spending into all known categories (so chart always shows all bars)
      const spendingMap: Record<string, number> = {};
      for (const item of fetchedCategorySpending) {
        spendingMap[item.category] = item.amount;
      }

      const mergedChart: ChartCategory[] = ALL_CHART_CATEGORIES.map(
        ({ category, color }) => ({
          category,
          amount: spendingMap[category] ?? 0,
          color,
        })
      );

      setCategorySpending(mergedChart);
      setRecentExpenses(fetchedRecent);
      setBudget(fetchedBudget);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Failed to load dashboard data. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    stats,
    categorySpending,
    recentExpenses,
    budget,
    loading,
    error,
    refetch: fetchAll,
  };
}