export function getFriendlyErrorMessage(error: string): string {
  if (error.includes("Invalid login credentials")) {
    return "Email or password is incorrect. Please try again.";
  }
  if (error.includes("Email not confirmed")) {
    return "Please verify your email address before logging in.";
  }
  if (error.includes("Too many requests")) {
    return "Too many login attempts. Please wait a moment and try again.";
  }
  if (/you can only request this after \d+ seconds/i.test(error)) {
    return "You've recently requested a reset link — please wait a moment before trying again.";
  }
  return error;
}

/**
 * Pulls the wait time out of Supabase's rate-limit error, e.g.
 * "For security purposes, you can only request this after 57 seconds."
 * Returns null if the error doesn't match that shape (a different error
 * entirely, or Supabase changes its wording) — callers should fall back
 * to a safe default rather than assume a number.
 */
export function extractRetryAfterSeconds(error: string): number | null {
  const match = error.match(/after (\d+) seconds/i);
  return match ? parseInt(match[1], 10) : null;
}