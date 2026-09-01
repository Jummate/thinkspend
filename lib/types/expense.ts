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


export interface Expense {
  id: string;
  amount: number;
  currency: string;
  category: string;
  description: string;
  date: string;
  icon?: string;
  color: string;
}
