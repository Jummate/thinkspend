"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./useUser";

/**
 * Guard for pages that require an authenticated user (dashboard,
 * settings, etc.). Wraps `useUser` and redirects to /login once loading
 * has settled and no user was found. Call this at the top of any
 * protected page instead of `useUser` directly — it returns the same
 * shape, so it's a drop-in replacement.
 */
export function useRequireAuth() {
  const router = useRouter();
  const { user, profile, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  return { user, profile, loading };
}