import { z } from "zod";
import { passwordSchema } from "./password";



const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email address");


function passwordsMatch(data: { password: string; confirmPassword: string }) {
  return data.password === data.confirmPassword;
}

const passwordMatchRefinement = {
  message: "Passwords don't match",
  path: ["confirmPassword"],
};



export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    consent: z.literal(true, {
      message: "You must agree to the Terms of Service and Privacy Policy",
    }),
  })
  .refine(passwordsMatch, passwordMatchRefinement);


export const forgotPasswordSchema = z.object({
  email: emailSchema,
});
export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine(passwordsMatch, passwordMatchRefinement);


export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;