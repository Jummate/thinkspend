import { z } from "zod";
import { formatAmountToNumber } from "../utils/format-amount";

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required").trim(),
  lastName: z.string().min(1, "Last name is required").trim(),
});

export const currencySchema = z.object({
  currency: z.enum(["NGN", "USD", "EUR", "GBP"], {
    error: "Please select a valid currency",
  }),
});

export const budgetSchema = z.object({
  amount: z
    .string()
    .min(1, "Budget amount is required")
    .refine(
      (val) => {
        const num = formatAmountToNumber(val);
        return !Number.isNaN(num) && num > 0 && num < 1_000_000_000;
      },
      { message: "Enter a valid amount between 0 and 1,000,000,000" }
    ),
  currency: z.enum(["NGN", "USD", "EUR", "GBP"], {
    error: "Please select a valid currency",
  }),
});

export const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ProfileFormData = z.infer<typeof profileSchema>;
export type CurrencyFormData = z.infer<typeof currencySchema>;
export type BudgetFormData = z.infer<typeof budgetSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;