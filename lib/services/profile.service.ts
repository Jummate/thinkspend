import type { SupabaseClient } from "@supabase/supabase-js";
import type { Profile } from "@/lib/types/profile";

export async function getProfile(
  supabase: SupabaseClient,
  userId: string,
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("first_name, last_name, currency")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    firstName: data.first_name,
    lastName: data.last_name,
    currency: data.currency,
  };
}