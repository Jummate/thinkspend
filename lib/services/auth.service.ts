import { supabase } from "../supabase/client";
import {
  getFriendlyErrorMessage,
  extractRetryAfterSeconds,
} from "../utils/errorMessages";
import type { AuthResponse } from "@supabase/supabase-js";

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

type ForgotPasswordResult =
  | { success: true }
  | { success: false; message: string; retryAfterSeconds?: number };

/**
 * Sends a password reset email to the user. On Supabase's own
 * rate-limit error, also returns retryAfterSeconds (parsed from the raw
 * error, before it gets converted into a friendly display string) so
 * the UI can resync its cooldown timer to the real remaining wait
 * instead of guessing.
 */
export async function forgotPassword(
  email: string,
): Promise<ForgotPasswordResult> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/confirm`,
    });

    if (error) {
      const retryAfterSeconds = extractRetryAfterSeconds(error.message);
      return {
        success: false,
        message: getFriendlyErrorMessage(error.message),
        ...(retryAfterSeconds !== null ? { retryAfterSeconds } : {}),
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Forgot password error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
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
    console.error("Reactivate account error:", error);
    return {
      success: false,
      message: getFriendlyErrorMessage(error.message),
    };
  }

  return { success: true };
}

/**
 * Updates the user's password.
 */
export async function updatePassword(newPassword: string) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return {
        success: false,
        message: getFriendlyErrorMessage(error.message),
      };
    }

    return {
      success: true,
      data,
      message: "Password updated successfully.",
    };
  } catch (error) {
    console.error("Update password error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
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