import { supabase } from "@/lib/supabase/client";

export async function updateProfile(
  userId: string,
  firstName: string,
  lastName: string
): Promise<void> {
  const { error } = await supabase
    .from("profiles")
    .update({ first_name: firstName, last_name: lastName })
    .eq("id", userId);

  if (error) throw error;
}

export async function updateCurrency(
  userId: string,
  currency: string
): Promise<void> {
  const { error } = await supabase
    .from("profiles")
    .update({ currency })
    .eq("id", userId);

  if (error) throw error;
}

export async function changePassword(newPassword: string): Promise<void> {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
}