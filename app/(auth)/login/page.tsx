"use client";

import { useState } from "react";
import AppLogo from "@/components/AppLogo";
import AuthCard from "@/components/auth/AuthCard";
import AuthCardHeader from "@/components/auth/AuthCardHeader";
import LoginForm from "@/components/auth/LoginForm";
import { ROUTES } from "@/lib/routes";
import { login, reactivateAccount } from "@/lib/services/auth.service";
import { showError } from "@/lib/ui/toast";
import { LoginFormData } from "@/lib/validations/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import PausedAccountCard from "@/components/auth/PausedAccountCard";

type PausedState = {
  userId: string;
  pausedAt: string;
};

function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || ROUTES.DASHBOARD;

  const [paused, setPaused] = useState<PausedState | null>(null);
  const [reactivating, setReactivating] = useState(false);

  const handleLogin = async (data: LoginFormData) => {
    try {
      const result = await login(data.email, data.password);

      if (!result.success) {
        showError(result.message || "");
        return;
      }

      if (result.status === "paused") {
        setPaused({ userId: result.userId, pausedAt: result.pausedAt });
        return;
      }

      // Success! Redirect to dashboard
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);

      showError("An unexpected error occurred. Please try again.");
    }
  };

  const handleReactivate = async () => {
    if (!paused) return;

    setReactivating(true);
    try {
      const result = await reactivateAccount(paused.userId);

      if (!result.success) {
        showError(result.message || "");
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      console.error("Reactivate account error:", err);
      showError("An unexpected error occurred. Please try again.");
    } finally {
      setReactivating(false);
    }
  };

  if (paused) {
    return (
      <main className="flex h-full items-center justify-center p-6">
        <PausedAccountCard
          pausedAt={paused.pausedAt}
          onReactivate={handleReactivate}
          reactivating={reactivating}
          // TODO: point this at the real account-deletion route once the
          // Settings deletion flow exists.
          deleteHref="/settings/account"
        />
      </main>
    );
  }

  return (
    <main className="flex h-full items-center justify-center p-6">
      <AuthCard>
        <AuthCardHeader
          icon={<AppLogo />}
          title="Welcome back"
          subtitle="Track your spending effortlessly."
        />

        <div className="flex flex-col items-center justify-center gap-6 px-8 pb-9">
          <LoginForm onSubmit={handleLogin} />
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href={ROUTES.SIGNUP}
              className="cursor-pointer font-bold text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </AuthCard>
    </main>
  );
}

export default LoginPage;
