"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import {
  getExpenses,
  type ExpenseFilters,
  type ExpensePage,
} from "@/lib/services/expense.service";

export function useExpenses(
  userId: string | undefined,
  filters: ExpenseFilters = {},
) {
  return useQuery<ExpensePage>({
    queryKey: ["expenses", userId, filters],
    queryFn: () => getExpenses(supabase, userId!, filters),
    enabled: !!userId,
  });
}