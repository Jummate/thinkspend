// lib/services/expense.service.ts

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
}

const DEFAULT_PAGE_SIZE = 20;

/**
 * Lists a user's expenses with server-side filtering, sorting, and
 * pagination. Two queries run in parallel: one for the page of rows,
 * one for the total matching count (needed for pagination UI and the
 * "Showing N of M" line).
 *
 * `userId` is passed explicitly alongside RLS — RLS is the security
 * boundary, but an explicit equality on the indexed `user_id` column
 * gives the planner a better plan than relying on the policy predicate
 * alone.
 */
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

  // Base query shape, shared by both the page and count queries.
  // Supabase's builder is immutable per-method, so each call starts
  // from a fresh `.from()`.
  function buildQuery(selectOptions?: { count?: "exact"; head?: boolean }) {
    let query = supabase
      .from("expenses")
      .select("*", selectOptions)
      .eq("user_id", userId);

    if (search) {
      // Case-insensitive substring match on description.
      query = query.ilike("description", `%${search}%`);
    }

    if (categories && categories.length > 0) {
      query = query.in("category", categories);
    }

    if (dateFrom) {
      query = query.gte("date", dateFrom);
    }

    if (dateTo) {
      query = query.lte("date", dateTo);
    }

    if (minAmount !== undefined) {
      query = query.gte("amount", minAmount);
    }

    if (maxAmount !== undefined) {
      query = query.lte("amount", maxAmount);
    }

    return query;
  }

  const offset = (page - 1) * pageSize;

  // Sort mapping. `date` is the primary sort; `created_at` is a
  // tiebreaker so rows with the same date have a stable order.
  const sortColumn = sort === "highest" || sort === "lowest" ? "amount" : "date";
  const ascending = sort === "oldest" || sort === "lowest";

  const pageQuery = buildQuery()
    .order(sortColumn, { ascending })
    .order("created_at", { ascending: false })
    .range(offset, offset + pageSize - 1);

  const countQuery = buildQuery({ count: "exact", head: true });

  const [pageResult, countResult] = await Promise.all([
    pageQuery,
    countQuery,
  ]);

  if (pageResult.error) throw pageResult.error;
  if (countResult.error) throw countResult.error;

  // numeric columns come back from PostgREST as strings to preserve
  // precision; convert at the service boundary so consumers get numbers.
  const expenses: Expense[] = (pageResult.data ?? []).map((row) => ({
    ...row,
    amount: Number(row.amount),
  }));

  return {
    expenses,
    totalCount: countResult.count ?? 0,
  };
}

/**
 * Fetches a single expense by id. Returns null if not found (or if
 * RLS blocked it, which is indistinguishable from "doesn't exist" —
 * which is the correct behavior).
 */
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

/**
 * Deletes an expense by id. RLS ensures a user can only delete their
 * own rows — a delete against someone else's id silently affects 0 rows.
 */
export async function deleteExpense(
  supabase: SupabaseClient,
  id: string,
): Promise<void> {
  const { error } = await supabase.from("expenses").delete().eq("id", id);
  if (error) throw error;
}

/**
 * Updates an expense. Only the fields present in `data` are changed.
 * Returns the updated row.
 */
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

/**
 * Creates a new expense for the given user.
 *
 * Note: `userId` is passed explicitly here because the INSERT policy
 * checks `auth.uid() = user_id` — the row's user_id must match the
 * authenticated user, so we can't rely on a column default.
 */
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