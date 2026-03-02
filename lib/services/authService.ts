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

export async function signup(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return {
      success: false,
      message: getFriendlyErrorMessage(error.message),
    };
  }

  if (data.user) {
    await supabase
      .from("profiles")
      .update({ first_name: firstName, last_name: lastName })
      .eq("id", data.user.id);
  }

  return {
    success: true,
    data,
  };
}

// export async function signup(email: string, password: string) {
//   return handleSupabaseCall(() => supabase.auth.signUp({ email, password }));
// }

export async function logout() {
  const { error } = await supabase.auth.signOut();

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

// export async function logout() {
//   return handleSupabaseCall(() => supabase.auth.signOut());
// }

// const handleLogout = async () => {
//   await supabase.auth.signOut();
//   router.push("/login");
// };
