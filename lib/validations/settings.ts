import { z } from "zod";
import { formatAmountToNumber } from "../utils/format-amount";
import { passwordSchema } from "./password";

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required").trim(),
  lastName: z.string().min(1, "Last name is required").trim(),
});

export const currencyBudgetSchema = z.object({
  currency: z.enum(["NGN", "USD", "EUR", "GBP"], {
    error: "Please select a valid currency",
  }),
  budgetAmount: z
    .string()
    .min(1, "Budget amount is required")
    .refine(
      (val) => {
        const num = formatAmountToNumber(val);
        return !Number.isNaN(num) && num > 0 && num < 1_000_000_000;
      },
      { message: "Enter a valid amount between 0 and 1,000,000,000" }
    ),
});

export const changePasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ProfileFormData = z.infer<typeof profileSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type CurrencyBudgetFormData = z.infer<typeof currencyBudgetSchema>;