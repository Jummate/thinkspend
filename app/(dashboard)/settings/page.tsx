"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/lib/hooks/useUser";
import { supabase } from "@/lib/supabase/client";
import { getBudgetForMonth, type Budget } from "@/lib/services/budget.service";
import { getExpenseCount } from "@/lib/services/expense.service";
import ProfileSection from "./_components/ProfileSection";
import PasswordSection from "./_components/PasswordSection";
import CurrencySection from "./_components/CurrencySection";
import BudgetSection from "./_components/BudgetSection";
import DangerZoneSection from "./_components/DangerZoneSection";
import { useCurrency } from "@/lib/hooks/useCurrency";

export default function SettingsPage() {
  const { user, profile, loading } = useUser();
  const currency = useCurrency();
  const [budget, setBudget] = useState<Budget | null>(null);
  const [expenseCount, setExpenseCount] = useState<number | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  useEffect(() => {
    if (!user) return;

    Promise.all([
      getBudgetForMonth(supabase, user.id, currentMonth, currentYear),
      getExpenseCount(supabase, user.id),
    ])
      .then(([budgetData, count]) => {
        setBudget(budgetData);
        setExpenseCount(count);
      })
      .catch((err) => console.error("Failed to load settings data:", err))
      .finally(() => setDataLoaded(true));
  }, [user]);

  if (loading || !user || !profile || !dataLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading settings...</p>
      </div>
    );
  }

  const currencyLocked = (expenseCount ?? 0) > 0 || budget !== null;

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
        <CurrencySection
          userId={user.id}
          currentCurrency={currency}
          locked={currencyLocked}
        />
        <BudgetSection
          userId={user.id}
          currency={currency}
          initialBudget={budget}
        />
        <PasswordSection />
        <DangerZoneSection userId={user.id} />
      </div>
    </div>
  );
}