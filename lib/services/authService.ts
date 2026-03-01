// import { supabase } from "../supabase/client";
// import { getFriendlyErrorMessage } from "../utils/errorMessages";

// export async function login(email: string, password: string) {
//   const { error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     return {
//       success: false,
//       message: getFriendlyErrorMessage(error.message),
//     };
//   }

//   return {
//     success: true,
//   };
// }

// export async function signup(email: string, password: string) {
//   const { error } = await supabase.auth.signUp({
//     email,
//     password,
//   });

//   if (error) {
//     return {
//       success: false,
//       message: getFriendlyErrorMessage(error.message),
//     };
//   }

//   return {
//     success: true,
//   };
// }

// lib/services/authService.ts
// import { supabase } from "../supabase/client";
// import { getFriendlyErrorMessage } from "../utils/errorMessages";

// async function handleSupabaseCall<T>(callback: () => Promise<{ data: T; error: any }>) {
//   const { error } = await callback();
//   if (error) {
//     return {
//       success: false,
//       message: getFriendlyErrorMessage(error.message),
//     };
//   }
//   return { success: true };
// }

// export async function login(email: string, password: string) {
//   return handleSupabaseCall(() =>
//     supabase.auth.signInWithPassword({ email, password })
//   );
// }

// export async function signup(email: string, password: string) {
//   return handleSupabaseCall(() =>
//     supabase.auth.signUp({ email, password })
//   );
// }

// lib/services/authService.ts
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
