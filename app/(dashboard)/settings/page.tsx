"use client";

import { useQueries } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";
import { useUser } from "@/lib/hooks/useUser";
import { useCurrency } from "@/lib/hooks/useCurrency";
import { supabase } from "@/lib/supabase/client";
import { getBudgetForMonth } from "@/lib/services/budget.service";
import { getExpenseCount } from "@/lib/services/expense.service";
import { budgetKeys } from "@/lib/query-keys/budgets";
import { expenseKeys } from "@/lib/query-keys/expenses";
import ProfileSection from "./_components/ProfileSection";
import PasswordSection from "./_components/PasswordSection";
import CurrencySection from "./_components/CurrencySection";
import BudgetSection from "./_components/BudgetSection";
import DangerZoneSection from "./_components/DangerZoneSection";

export default function SettingsPage() {
  const { user, profile, loading } = useUser();
  const currency = useCurrency();

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const [budgetQuery, countQuery] = useQueries({
    queries: [
      {
        queryKey: budgetKeys.forMonth(
          user?.id ?? "",
          currentMonth,
          currentYear,
        ),
        queryFn: () =>
          getBudgetForMonth(
            supabase,
            user!.id,
            currentMonth,
            currentYear,
          ),
        enabled: !!user,
      },
      {
        queryKey: expenseKeys.count(user?.id ?? ""),
        queryFn: () => getExpenseCount(supabase, user!.id),
        enabled: !!user,
      },
    ],
  });

  // Auth is still resolving — show a plain loading state.
  if (loading || !user || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading settings...</p>
      </div>
    );
  }

  // Either fetch failed — show a recoverable error state.
  const isError = budgetQuery.isError || countQuery.isError;
  if (isError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-danger/10">
          <AlertTriangle className="h-6 w-6 text-danger" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Couldn&apos;t load settings
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Something went wrong loading your budget and account data.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            budgetQuery.refetch();
            countQuery.refetch();
          }}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-dark"
        >
          Try again
        </button>
      </div>
    );
  }

  // Still loading one or both queries.
  if (budgetQuery.isPending || countQuery.isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading settings...</p>
      </div>
    );
  }

  const budget = budgetQuery.data ?? null;
  const expenseCount = countQuery.data ?? 0;
  const currencyLocked = expenseCount > 0 || budget !== null;

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