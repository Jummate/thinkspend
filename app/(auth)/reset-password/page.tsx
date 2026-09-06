"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AppLogo from "@/components/AppLogo";
import AuthCard from "@/components/auth/AuthCard";
import AuthCardHeader from "@/components/auth/AuthCardHeader";
import { logout, updatePassword } from "@/lib/services/auth.service";
import { showError, showSuccess } from "@/lib/ui/toast";
import { ROUTES } from "@/lib/routes";
import { ResetPasswordFormData } from "@/lib/validations/auth";
import { useUser } from "@/lib/hooks/useUser";
import ExpiredLinkCard from "@/components/auth/ExpiredLinkCard";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useUser();
  const hasError = searchParams.get("error") === "link_expired";

  useEffect(() => {
    // A single-use code (or the error flag) has no reason to linger in
    // the address bar or browser history once we've read it.
    if (searchParams.toString()) {
      router.replace(ROUTES.RESET_PASSWORD);
    }
  }, [searchParams, router]);

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    try {
      const result = await updatePassword(data.password);

      if (!result.success) {
        showError(result.message || "");
        return;
      }
      await logout();
      showSuccess("Password updated — log in with your new password.");
      router.push(ROUTES.LOGIN);
    } catch (err) {
      console.error("Reset password error:", err);
      showError("An unexpected error occurred. Please try again.");
    }
  };

  if (hasError) {
    return (
      <main className="flex h-full items-center justify-center p-6">
        <ExpiredLinkCard />
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex h-full items-center justify-center p-6">
        <AuthCard>
          <AuthCardHeader
            icon={<AppLogo />}
            title="Loading..."
          />
        </AuthCard>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex h-full items-center justify-center p-6">
        <ExpiredLinkCard />
      </main>
    );
  }

  return (
    <main className="flex h-full items-center justify-center p-6">
      <AuthCard>
        <AuthCardHeader
          icon={<AppLogo />}
          title="Set a new password"
        />

        <div className="flex flex-col items-center justify-center gap-6 px-8 pb-9">
          <ResetPasswordForm
            email={user.email ?? ""}
            onSubmit={handleResetPassword}
          />
          <p className="text-sm text-muted-foreground">
            Remembered it after all?{" "}
            <Link
              href={ROUTES.LOGIN}
              className="cursor-pointer font-bold text-primary hover:underline"
            >
              Back to log in
            </Link>
          </p>
        </div>
      </AuthCard>
    </main>
  );
}

export default ResetPasswordPage;
