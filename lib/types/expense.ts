// lib/types/expense.types.ts

export type ExpenseCategory = 
  | "Food & Drinks" 
  | "Transport" 
  | "Groceries" 
  | "Bills" 
  | "Shopping" 
  | "Other";

export interface ParsedExpense {
  amount: number;
  currency:string;
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