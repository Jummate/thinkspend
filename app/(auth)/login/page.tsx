"use client";

import AppLogo from "@/components/AppLogo";
import LoginForm from "@/components/auth/LoginForm";
import { ROUTES } from "@/lib/routes";
import { supabase } from "@/lib/supabase/client";
import { getFriendlyErrorMessage } from "@/lib/utils/errorMessages";
import { LoginFormData } from "@/lib/validations/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";


function LoginPage() {
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || ROUTES.DASHBOARD;

  const handleLogin = async (data: LoginFormData) => {
    try {
      setAuthError(null); // Clear previous errors

      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        // Map Supabase errors to user-friendly messages
        setAuthError(getFriendlyErrorMessage(error.message));
        return;
      }

      // Success! Redirect to dashboard
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      setAuthError("An unexpected error occurred. Please try again.");
    }
  };
  return (
    <main className="flex items-center justify-center h-full p-6">
      {/* <header>
      </header> */}
      {/* <div className='flex flex-col items-center justify-center shadow-lg rounded-lg bg-red-500 w-full mx-auto max-w-lg p-4'> */}
      <div className="shadow-lg rounded-xl w-full mx-auto max-w-lg overflow-hidden">
        <section className="flex flex-col items-center justify-center text-center p-4 bg-primary">
          <AppLogo />
          <h1 className="text-white text-2xl mb-4 font-bold">Welcome Back</h1>
          <p className="text-sm text-white/80">
            Track your spending effortlessly.
          </p>
        </section>

        <section className="flex flex-col items-center justify-center py-10 px-5 sm:px:7 md:px-10 gap-10">
          <LoginForm
            onSubmit={handleLogin}
            error={authError}
          />
          <p className="text-muted/80">
            Don't have an account?{" "}
            <Link
              href={ROUTES.SIGNUP}
              className="text-primary cursor-pointer hover:underline font-bold"
            >
              Sign up
            </Link>
          </p>
        </section>

        {/* <section className='p-4 text-center flex flex-col justify-center items-center gap-2'>
          <p className='text-muted-foreground mb-4'>Log in to manage your finances</p>

        </section> */}
      </div>
    </main>
  );
}

export default LoginPage;
