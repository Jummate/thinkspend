import type { ExpenseFilters } from "@/lib/services/expense.service";

export const expenseKeys = {
  all: ["expenses"] as const,
  list: (userId: string, filters: ExpenseFilters) =>
    [...expenseKeys.all, userId, filters] as const,
  count: (userId: string) =>
    [...expenseKeys.all, "count", userId] as const,
};