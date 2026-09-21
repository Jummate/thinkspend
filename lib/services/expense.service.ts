import type { SupabaseClient } from "@supabase/supabase-js";
import type { Expense } from "@/lib/types/expense";
import type { ExpenseFormData } from "@/lib/validations/expense";
import { formatAmountToNumber } from "@/lib/utils/format-amount";
import { mapValueToAICategory } from "@/lib/utils/category-mapper";

export type ExpenseSort = "newest" | "oldest" | "highest" | "lowest";

export interface ExpenseFilters {
  search?: string;
  categories?: string[];
  dateFrom?: string;    // "2026-08-01"
  dateTo?: string;      // "2026-08-31"
  minAmount?: number;
  maxAmount?: number;
  sort?: ExpenseSort;
  page?: number;        // 1-indexed
  pageSize?: number;
}

export interface ExpensePage {
  expenses: Expense[];
  totalCount: number;
  totalAmount: number;  // sum across ALL matching rows, not just this page
}

const DEFAULT_PAGE_SIZE = 20;

export async function getExpenses(
  supabase: SupabaseClient,
  userId: string,
  filters: ExpenseFilters = {},
): Promise<ExpensePage> {
  const {
    search,
    categories,
    dateFrom,
    dateTo,
    minAmount,
    maxAmount,
    sort = "newest",
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
  } = filters;

  function buildQuery(selectOptions?: { count?: "exact"; head?: boolean }) {
    let query = supabase
      .from("expenses")
      .select("*", selectOptions)
      .eq("user_id", userId);

    if (search) query = query.ilike("description", `%${search}%`);
    if (categories && categories.length > 0) {
      query = query.in("category", categories);
    }
    if (dateFrom) query = query.gte("date", dateFrom);
    if (dateTo) query = query.lte("date", dateTo);
    if (minAmount !== undefined) query = query.gte("amount", minAmount);
    if (maxAmount !== undefined) query = query.lte("amount", maxAmount);

    return query;
  }

  const offset = (page - 1) * pageSize;
  const sortColumn = sort === "highest" || sort === "lowest" ? "amount" : "date";
  const ascending = sort === "oldest" || sort === "lowest";

  const pageQuery = buildQuery()
    .order(sortColumn, { ascending })
    .order("created_at", { ascending: false })
    .range(offset, offset + pageSize - 1);

  const countQuery = buildQuery({ count: "exact", head: true });

  // The sum runs as a Postgres function rather than a PostgREST
  // aggregate because Supabase disables `db-aggregates` by default, and
  // the setting can't be toggled in this project. The function derives
  // user_id from auth.uid() internally — no user parameter, so it can't
  // be called to sum another user's expenses.
  const sumQuery = supabase.rpc("get_expenses_total", {
    p_search: search ?? null,
    p_categories: categories && categories.length > 0 ? categories : null,
    p_date_from: dateFrom ?? null,
    p_date_to: dateTo ?? null,
    p_min_amount: minAmount ?? null,
    p_max_amount: maxAmount ?? null,
  });

  const [pageResult, countResult, sumResult] = await Promise.all([
    pageQuery,
    countQuery,
    sumQuery,
  ]);

  if (pageResult.error) throw pageResult.error;
  if (countResult.error) throw countResult.error;
  if (sumResult.error) throw sumResult.error;

  // numeric columns come back from PostgREST as strings to preserve
  // precision; convert at the service boundary so consumers get numbers.
  const expenses: Expense[] = (pageResult.data ?? []).map((row) => ({
    ...row,
    amount: Number(row.amount),
  }));

  return {
    expenses,
    totalCount: countResult.count ?? 0,
    // The RPC returns numeric, which Supabase types as `number | null`.
    // coalesce() inside the function guarantees 0 for no matches, but
    // the `?? 0` guards against a null sneaking through regardless.
    totalAmount: Number(sumResult.data ?? 0),
  };
}

export async function getExpense(
  supabase: SupabaseClient,
  id: string,
): Promise<Expense | null> {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return { ...data, amount: Number(data.amount) };
}

export async function deleteExpense(
  supabase: SupabaseClient,
  id: string,
): Promise<void> {
  const { error } = await supabase.from("expenses").delete().eq("id", id);
  if (error) throw error;
}

export async function updateExpense(
  supabase: SupabaseClient,
  id: string,
  data: Partial<ExpenseFormData>,
): Promise<Expense> {
  const payload: Record<string, unknown> = {};

  if (data.amount !== undefined) {
    payload.amount = formatAmountToNumber(data.amount);
  }
  if (data.currency !== undefined) {
    payload.currency = data.currency;
  }
  if (data.category !== undefined) {
    payload.category = mapValueToAICategory(data.category);
  }
  if (data.description !== undefined) {
    payload.description = data.description || null;
  }
  if (data.date !== undefined) {
    payload.date = data.date;
  }

  const { data: updated, error } = await supabase
    .from("expenses")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  return { ...updated, amount: Number(updated.amount) };
}

export async function saveExpense(
  supabase: SupabaseClient,
  userId: string,
  data: ExpenseFormData,
): Promise<Expense> {
  const payload = {
    user_id: userId,
    amount: formatAmountToNumber(data.amount),
    currency: data.currency,
    category: mapValueToAICategory(data.category),
    description: data.description || null,
    date: data.date,
  };

  const { data: created, error } = await supabase
    .from("expenses")
    .insert(payload)
    .select("*")
    .single();

  if (error) throw error;

  return { ...created, amount: Number(created.amount) };
}


/**
 * Returns the number of expenses a user has. Used by Settings to
 * decide whether the currency field can be changed — the single-
 * currency policy locks it once any financial data exists.
 */
export async function getExpenseCount(
  supabase: SupabaseClient,
  userId: string,
): Promise<number> {
  const { count, error } = await supabase
    .from("expenses")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) throw error;
  return count ?? 0;
}