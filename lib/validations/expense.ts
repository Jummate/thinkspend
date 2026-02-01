import { z } from "zod";

export const expenseInputSchema = z.object({
  expenseInput: z
    .string()
    .trim()
    .min(1, "Please enter an expense to parse")
    .max(80, "Keep it short — under 80 characters"),
});

export const expenseDataSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0 && num < 1000000000;
      },
      {
        message: "Enter a valid amount between 0 and 1,000,000,000",
      }
    ),

  category: z.string().min(1, "Category is required"),

  description: z
    .string()
    .trim()
    .max(200, "Description is too long")
    .optional()
    .or(z.literal("")),

  date: z
    .string()
    .min(1, "Date is required")
    .refine(
      (val) => {
        const parsedDate = new Date(val);
        const now = new Date();
        return !Number.isNaN(parsedDate.getTime()) && parsedDate <= now;
      },
      {
        message: "Date cannot be in the future",
      }
    ),
});

export type ExpenseFormData = z.infer<typeof expenseDataSchema>;
export type ExpenseInputData = z.infer<typeof expenseInputSchema>;
