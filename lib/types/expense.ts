// lib/types/expense.ts

export type ExpenseCategory =
  | "Food & Drinks"
  | "Transport"
  | "Groceries"
  | "Bills"
  | "Shopping"
  | "Other";

export interface ParsedExpense {
  amount: number;
  currency: string;
  category: ExpenseCategory;
  description: string;
  date: string;
}

export interface MistralResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

/**
 * Mirrors the public.expenses table. `icon` and `color` are deliberately
 * absent — they're derived from getCategoryConfig(category) at render
 * time, since the DB has no such columns.
 */
export interface Expense {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  category: string;
  description: string | null;
  notes: string | null;
  date: string;
  created_at: string;
  updated_at: string;
}