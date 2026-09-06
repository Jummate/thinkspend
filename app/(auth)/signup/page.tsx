"use client";

import AppLogo from "@/components/AppLogo";
import AuthCard from "@/components/auth/AuthCard";
import AuthCardHeader from "@/components/auth/AuthCardHeader";
import SignUpForm from "@/components/auth/SignUpForm";
import { ROUTES } from "@/lib/routes";
import { signup } from "@/lib/services/auth.service";
import { showError } from "@/lib/ui/toast";
import { RegisterFormData } from "@/lib/validations/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

function SignUpPage() {
  const router = useRouter();

  const handleSignUp = async (data: RegisterFormData) => {
    try {
      const result = await signup(
        data.email,
        data.password,
        data.firstName,
        data.lastName,
      );

      if (!result.success) {
        showError(result.message || "");
        return;
      }

      // Success! Redirect to dashboard
      router.push(ROUTES.DASHBOARD);
      router.refresh();
    } catch (err) {
      console.error("Sign up error:", err);

      showError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <main className="flex h-full items-center justify-center p-6">
      <AuthCard>
        <AuthCardHeader
          icon={<AppLogo />}
          title="Create account"
          subtitle="Start tracking today — set up your ThinkSpend account."
        />

        <div className="flex flex-col items-center justify-center gap-6 px-8 pb-9">
          <SignUpForm onSubmit={handleSignUp} />
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href={ROUTES.LOGIN}
              className="cursor-pointer font-bold text-primary hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </AuthCard>
    </main>
  );
}

export default SignUpPage;
