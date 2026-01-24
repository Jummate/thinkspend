import { z } from "zod";

// export const expenseDataSchema = z.object({
//   amount: z.string().min(1, "Amount is required"),
//   category: z.string().min(1, "Category is required"),
// });

export const expenseDataSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0 && num < 1000000000; // Max 1 billion
      },
      {
        message: "Enter a valid amount between 0 and 1,000,000,000",
      }
    ),

  category: z.string().min(1, "Category is required"),

  description: z
    .string()
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
        return !isNaN(parsedDate.getTime()) && parsedDate <= now;
      },
      {
        message: "Date cannot be in the future",
      }
    ),
});

export type ExpenseFormData = z.infer<typeof expenseDataSchema>;
// export type RegisterFormData = z.infer<typeof registerSchema>;
