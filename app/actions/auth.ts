// app/actions/auth.ts
"use server";

import { loginSchema } from "@/lib/validations/auth";

export async function loginAction(formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // Validate with the same schema!
  const result = loginSchema.safeParse(data);
  
  if (!result.success) {
    return { error: result.error.flatten() };
  }

  // Your login logic here
  // await signIn(result.data);
  
  return { success: true };
}