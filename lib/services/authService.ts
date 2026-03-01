import { supabase } from "../supabase/client";
import { getFriendlyErrorMessage } from "../utils/errorMessages";
import type { AuthResponse } from "@supabase/supabase-js";

async function handleSupabaseCall(callback: () => Promise<AuthResponse>) {
  const { data, error } = await callback();
  if (error) {
    return {
      success: false,
      message: getFriendlyErrorMessage(error.message),
    };
  }
  return {
    success: true,
    data,
  };
}

export async function login(email: string, password: string) {
  return handleSupabaseCall(() =>
    supabase.auth.signInWithPassword({ email, password }),
  );
}

export async function signup(email: string, password: string) {
  return handleSupabaseCall(() => supabase.auth.signUp({ email, password }));
}
