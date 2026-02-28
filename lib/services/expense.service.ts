import { supabase } from "@/lib/supabase/client";
import { formatAmountToNumber } from "@/lib/utils/format-amount";
import { mapValueToAICategory } from "@/lib/utils/category-mapper";
import { ExpenseFormData } from "@/lib/validations/expense";

export async function saveExpense(
  userId: string,
  data: ExpenseFormData
) {
  const expenseToSave = {
    amount: formatAmountToNumber(data.amount),
    currency: data.currency,
    category: mapValueToAICategory(data.category),
    description: data.description,
    date: data.date,
  };

  const { error } = await supabase.from("expenses").insert({
    ...expenseToSave,
    user_id: userId,
  });

  if (error) throw error;
}