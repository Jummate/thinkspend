"use client";

import { useCallback, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

export const currencyMapping = {
  NGN: "₦",
  USD: "$",
} as const;

type CurrencyCode = keyof typeof currencyMapping;

interface Profile {
  firstName: string;
  lastName: string;
  currency: CurrencyCode;
}

interface UseUserReturn {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
}

/**
 * Pure auth-state hook. Reports who (if anyone) is currently logged in —
 * it never redirects. Safe to call from public pages (e.g. the landing
 * page or Navigation) where "no user" is an expected, normal state.
 *
 * For pages that should redirect unauthenticated visitors to /login,
 * use `useRequireAuth` instead.
 */
export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserAndProfile = useCallback(
    async (currentUser: User | null = null) => {
      try {
        let activeUser = currentUser;

        if (!activeUser) {
          const { data, error } = await supabase.auth.getUser();
          if (error || !data.user) {
            setUser(null);
            setProfile(null);
            return;
          }
          activeUser = data.user;
        }

        setUser(activeUser);

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", activeUser.id)
          .maybeSingle();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
          setProfile(null);
        } else if (profileData) {
          setProfile({
            firstName: profileData.first_name,
            lastName: profileData.last_name,
            currency: profileData.currency,
          });
        }
      } catch (err) {
        console.error("useUser error:", err);
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    // Initial fetch on mount
    fetchUserAndProfile();

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserAndProfile(session.user);
      } else {
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchUserAndProfile]);

  return { user, profile, loading };
}