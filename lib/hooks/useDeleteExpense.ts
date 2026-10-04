"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { deleteExpense } from "@/lib/services/expense.service";
import { expenseKeys } from "@/lib/query-keys/expenses";

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteExpense(supabase, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
  });
}