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

type ActiveLoginResult = {
  success: true;
  status: "active";
  data: AuthResponse["data"];
};

type PausedLoginResult = {
  success: true;
  status: "paused";
  userId: string;
  pausedAt: string;
};

type FailedLoginResult = {
  success: false;
  message: string;
};

export type LoginResult =
  | ActiveLoginResult
  | PausedLoginResult
  | FailedLoginResult;

export async function login(
  email: string,
  password: string,
): Promise<LoginResult> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      message: getFriendlyErrorMessage(error.message),
    };
  }

  const user = data.user;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("paused_at")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    // Don't block a successful credential check on a profile-read hiccup —
    // fail open to "active" rather than stranding the user.
    console.error("Profile fetch error during login:", profileError);
    return { success: true, status: "active", data };
  }

  if (profile?.paused_at) {
    return {
      success: true,
      status: "paused",
      userId: user.id,
      pausedAt: profile.paused_at,
    };
  }

  return { success: true, status: "active", data };
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

/**
 * Clears paused_at, restoring normal login. Caller is responsible for
 * establishing/continuing the session afterward (the credential check
 * already succeeded once, in login(), before this is ever reachable).
 */
export async function reactivateAccount(userId: string) {
  const { error } = await supabase
    .from("profiles")
    .update({ paused_at: null })
    .eq("id", userId);

  if (error) {
    // Note: this is a Postgrest error, not a Supabase Auth error — worth
    // checking whether getFriendlyErrorMessage (built for auth error
    // codes) produces a sane message here, or whether this needs its own
    // mapping.
    console.error("Reactivate account error:", error);
    return {
      success: false,
      message: getFriendlyErrorMessage(error.message),
    };
  }

  return { success: true };
}

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