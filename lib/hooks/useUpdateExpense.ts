"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { updateExpense } from "@/lib/services/expense.service";
import { expenseKeys } from "@/lib/query-keys/expenses";
import type { ExpenseFormData } from "@/lib/validations/expense";

interface UpdateExpenseVariables {
  id: string;
  data: ExpenseFormData;
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateExpenseVariables) =>
      updateExpense(supabase, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
  });
}