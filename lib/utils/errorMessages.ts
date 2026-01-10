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
  return error; // Fallback to original error
}
