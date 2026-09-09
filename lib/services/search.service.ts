import type { SupabaseClient } from "@supabase/supabase-js";
import type { RecentExpense } from "@/lib/services/dashboard.service";

const SEARCH_RESULT_LIMIT = 5;

export async function searchExpenses(
  supabase: SupabaseClient,
  userId: string,
  query: string,
): Promise<RecentExpense[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const { data, error } = await supabase
    .from("expenses")
    .select("id, description, category, date, amount, currency")
    .eq("user_id", userId)
    .or(`description.ilike.%${trimmed}%,category.ilike.%${trimmed}%`)
    .order("date", { ascending: false })
    .limit(SEARCH_RESULT_LIMIT);

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