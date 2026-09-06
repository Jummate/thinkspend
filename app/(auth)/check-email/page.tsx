"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import AuthCard from "@/components/auth/AuthCard";
import AuthCardHeader from "@/components/auth/AuthCardHeader";
import AuthStatusIcon from "@/components/auth/AuthStatusIcon";
import CheckEmailForm, {
  RESEND_COOLDOWN_SECONDS,
  ResendOutcome,
} from "@/components/auth/CheckEmailForm";
import { forgotPassword } from "@/lib/services/auth.service";
import { showError } from "@/lib/ui/toast";
import { ROUTES } from "@/lib/routes";

function getInitialCooldownSeconds(sentAtParam: string | null): number {
  const sentAt = sentAtParam ? Number(sentAtParam) : NaN;

  // Missing or malformed sentAt (direct navigation, edited URL, etc.):
  // fail safe to the full cooldown rather than optimistically enabling
  // the button — better to make someone wait unnecessarily than repeat
  // the "enabled button immediately throws a Supabase error" bug.
  if (!sentAt || Number.isNaN(sentAt)) {
    return RESEND_COOLDOWN_SECONDS;
  }

  const elapsedSeconds = Math.floor((Date.now() - sentAt) / 1000);
  return Math.min(
    RESEND_COOLDOWN_SECONDS,
    Math.max(0, RESEND_COOLDOWN_SECONDS - elapsedSeconds),
  );
}

function CheckEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      router.push(ROUTES.FORGOT_PASSWORD);
    }
  }, [email, router]);

  if (!email) return null;

  const initialCooldownSeconds = getInitialCooldownSeconds(
    searchParams.get("sentAt"),
  );

  const handleResend = async (targetEmail: string): Promise<ResendOutcome> => {
    const result = await forgotPassword(targetEmail);

    if (!result.success) {
      showError(result.message || "Failed to resend reset link.");

      if (result.retryAfterSeconds) {
        // Blocked by Supabase's real rate limit — hand the actual
        // remaining wait back so the form can resync its countdown,
        // rather than throwing (which would leave the cooldown at 0
        // and invite the same mistake again).
        return { retryAfterSeconds: result.retryAfterSeconds };
      }

      throw new Error(result.message);
    }

    return {};
  };

  return (
    <main className="flex h-full items-center justify-center p-6">
      <AuthCard>
        <AuthCardHeader
          icon={
            <AuthStatusIcon
              icon={Mail}
              variant="success"
            />
          }
          title="Check your email"
        />

        <div className="flex flex-col items-center justify-center px-8 pb-9">
          <CheckEmailForm
            email={email}
            onResend={handleResend}
            initialCooldownSeconds={initialCooldownSeconds}
          />
        </div>
      </AuthCard>
    </main>
  );
}

export default CheckEmailPage;
