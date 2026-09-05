"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import Button from "../ui/Button";
import { ROUTES } from "@/lib/routes";

// Matches Supabase's own server-side rate limit on resetPasswordForEmail —
// a shorter client-side cooldown would just let the user hit a confusing
// server error instead of a clean "please wait" state.
export const RESEND_COOLDOWN_SECONDS = 60;

function formatCooldown(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes}:${remaining.toString().padStart(2, "0")}`;
}

export type ResendOutcome = {
  // Set when the resend itself was blocked by Supabase's rate limit —
  // the email was NOT actually resent. The cooldown resyncs to this
  // real value instead of the assumed 60s, and no "Email resent"
  // checkmark is shown. Any other failure should reject the promise
  // instead, leaving the cooldown untouched.
  retryAfterSeconds?: number;
};

interface CheckEmailFormProps {
  email: string;
  onResend: (email: string) => Promise<ResendOutcome>;
  /**
   * Seconds already elapsed toward the 60s window before this component
   * mounted (e.g. the initial send happened on the previous page).
   * Defaults to 0 — a fresh cooldown.
   */
  initialCooldownSeconds?: number;
}

const CheckEmailForm = ({
  email,
  onResend,
  initialCooldownSeconds = 0,
}: CheckEmailFormProps) => {
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(initialCooldownSeconds);
  const [justResent, setJustResent] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((seconds) => {
        if (seconds <= 1) {
          setJustResent(false);
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = async () => {
    setIsResending(true);
    try {
      const outcome = await onResend(email);

      if (outcome.retryAfterSeconds) {
        // Blocked by the real rate limit — resync to Supabase's actual
        // remaining wait rather than our own 60s assumption, and don't
        // claim the email was resent, since it wasn't.
        setJustResent(false);
        setCooldown(outcome.retryAfterSeconds);
      } else {
        setJustResent(true);
        setCooldown(RESEND_COOLDOWN_SECONDS);
      }
    } catch {
      // Any other failure: parent already showed the error toast, and
      // the cooldown is intentionally left untouched.
    } finally {
      setIsResending(false);
    }
  };

  const isDisabled = isResending || cooldown > 0;

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <p className="text-center text-[13.5px] leading-relaxed text-muted-foreground">
        We&apos;ve sent a password reset link to{" "}
        <span className="font-bold text-foreground">{email}</span>. It
        expires in 15 minutes.
      </p>

      <Button
        type="button"
        onClick={handleResend}
        disabled={isDisabled}
        styles="font-bold"
      >
        {isResending
          ? "Sending..."
          : cooldown > 0
            ? `Resend available in ${formatCooldown(cooldown)}`
            : "Resend email"}
      </Button>

      {justResent && (
        <p className="flex items-center gap-1.5 text-sm font-bold text-primary">
          <Check className="h-4 w-4" />
          Email resent
        </p>
      )}

      <div className="flex w-full flex-col items-center gap-2 border-t border-border pt-4">
        <Link
          href={ROUTES.FORGOT_PASSWORD}
          className="text-sm text-muted-foreground hover:underline"
        >
          Wrong email? Try another one
        </Link>
        <Link
          href={ROUTES.LOGIN}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to log in
        </Link>
      </div>
    </div>
  );
};

export default CheckEmailForm;