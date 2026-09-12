"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/lib/hooks/useUser";
import { supabase } from "@/lib/supabase/client";
import { getBudgetForMonth, type Budget } from "@/lib/services/budget.service";
import ProfileSection from "./_components/ProfileSection";
import PasswordSection from "./_components/PasswordSection";
import CurrencyBudgetSection from "./_components/CurrencyBudgetSection";
import DangerZoneSection from "./_components/DangerZoneSection";


export default function SettingsPage() {
  const { user, profile, loading } = useUser();
  const [budget, setBudget] = useState<Budget | null>(null);
  const [budgetLoaded, setBudgetLoaded] = useState(false);

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();



  useEffect(() => {
    if (!user) return;

    getBudgetForMonth(supabase, user.id, currentMonth, currentYear)
      .then(setBudget)
      .catch((err) => console.error("Failed to load budget:", err))
      .finally(() => setBudgetLoaded(true));
  }, [user]);

  if (loading || !user || !profile || !budgetLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading settings...</p>
      </div>
    );
  }

  return (
     <div className="min-h-screen max-w-2xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile, budget, and account preferences.
        </p>
      </div>

    


      <div className="flex flex-col gap-6">
        <ProfileSection
          userId={user.id}
          email={user.email ?? ""}
          firstName={profile.firstName}
          lastName={profile.lastName}
        />
          <CurrencyBudgetSection
          userId={user.id}
          currentCurrency={profile.currency}
          initialBudget={budget}
        />
        <PasswordSection />
        <DangerZoneSection userId={user.id} />
      </div>
    </div>
  );
}