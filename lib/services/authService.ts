import { supabase } from "../supabase/client";
import { getFriendlyErrorMessage } from "../utils/errorMessages";

export async function login(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      message: getFriendlyErrorMessage(error.message),
    };
  }

  return {
    success: true,
  };
}

export async function signup(email: string, password: string) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      message: getFriendlyErrorMessage(error.message),
    };
  }

  return {
    success: true,
  };
}
