// import { useEffect, useState } from "react";
// import { User } from "@supabase/supabase-js";
// import { supabase } from "@/lib/supabase/client";
// import { useRouter } from "next/navigation";

// interface Profile {
//   firstName: string;
//   lastName: string;
// }

// export function useUser() {
//   const [user, setUser] = useState<User | null>(null);
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const {
//           data: { user },
//           error,
//         } = await supabase.auth.getUser();
//         const { data: profile } = await supabase
//           .from("profiles")
//           .select("*")
//           .eq("id", user?.id)
//           .single();

//         if (error || !user) {
//           router.push("/login");
//           return;
//         }

//         setUser(user);
//         setProfile(profile);
//       } catch (err) {
//         console.error("Auth error:", err);
//         router.push("/login");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getUser();

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       if (session?.user) {
//         setUser(session.user);
//         setLoading(false);
//       } else {
//         setUser(null);
//         router.push("/login");
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [router]);

//   return { user, profile, loading };
// }

"use client";

import { useEffect, useState, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


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

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch user + profile together
  const fetchUserAndProfile = useCallback(
    async (currentUser: User | null = null) => {
      try {
        let activeUser = currentUser;

        if (!activeUser) {
          const { data, error } = await supabase.auth.getUser();
          if (error || !data.user) {
            router.push("/login");
            return;
          }
          activeUser = data.user;
        }

        setUser(activeUser);

        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", activeUser.id)
          .single();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
          setProfile(null);
        } else {
          // setProfile(profileData);
          if (profileData) {
            setProfile({
              firstName: profileData.first_name,
              lastName: profileData.last_name,
              currency: profileData.currency,
            });
          }
        }
      } catch (err) {
        console.error("Auth hook error:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    },
    [router],
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
        router.push("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchUserAndProfile, router]);

  return { user, profile, loading };
}
