import { supabase } from "@/lib/supabase/client";

export interface Budget {
  id: string;
  amount: number;
  currency: string;
  month: number;
  year: number;
}

export async function getBudgetForMonth(
  userId: string,
  month: number,
  year: number
): Promise<Budget | null> {
  const { data, error } = await supabase
    .from("budgets")
    .select("id, amount, currency, month, year")
    .eq("user_id", userId)
    .eq("month", month)
    .eq("year", year)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    amount: parseFloat(Number(data.amount).toFixed(2)),
    currency: data.currency,
    month: data.month,
    year: data.year,
  };
}

export async function upsertBudget(
  userId: string,
  amount: number,
  currency: string,
  month: number,
  year: number
): Promise<void> {
  const { error } = await supabase.from("budgets").upsert(
    {
      user_id: userId,
      amount,
      currency,
      month,
      year,
    },
    {
      onConflict: "user_id,month,year",
    }
  );

  if (error) throw error;
}