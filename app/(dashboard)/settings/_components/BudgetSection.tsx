"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wallet } from "lucide-react";
import FormAmountInput from "@/components/ui/FormAmountInput";
import {
  currencyBudgetSchema,
  CurrencyBudgetFormData,
} from "@/lib/validations/settings";
import { upsertBudget, type Budget } from "@/lib/services/budget.service";
import { supabase } from "@/lib/supabase/client";
import { currencyMapping, type CurrencyCode } from "@/lib/config/currencies";
import { showError, showSuccess } from "@/lib/ui/toast";
import { SettingsSection, SaveButton } from "./SettingsFormElements";

interface BudgetSectionProps {
  userId: string;
  currency: CurrencyCode;
  initialBudget: Budget | null;
}

function BudgetSection({
  userId,
  currency,
  initialBudget,
}: BudgetSectionProps) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const monthLabel = now.toLocaleString("default", { month: "long" });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Pick<CurrencyBudgetFormData, "budgetAmount">>({
    resolver: zodResolver(
      currencyBudgetSchema.pick({ budgetAmount: true }),
    ),
    mode: "onTouched",
    defaultValues: {
      budgetAmount: initialBudget ? String(initialBudget.amount) : "",
    },
  });

  const onSave = async (data: { budgetAmount: string }) => {
    try {
      const amount = Number(data.budgetAmount);
      await upsertBudget(
        supabase,
        userId,
        amount,
        currency,
        currentMonth,
        currentYear,
      );
      showSuccess("Budget updated");
    } catch {
      showError("Failed to save budget. Please try again.");
    }
  };

  return (
    <SettingsSection
      icon={Wallet}
      title="Monthly Budget"
      description="Your spending target for the month. Resets each month."
    >
      <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-4">
        <FormAmountInput
          control={control}
          name="budgetAmount"
          label={`Budget — ${monthLabel} ${currentYear}`}
          placeholder="200,000"
          error={errors.budgetAmount?.message}
          prefix={currencyMapping[currency] ?? ""}
        />

        <SaveButton isSubmitting={isSubmitting} />
      </form>
    </SettingsSection>
  );
}

export default BudgetSection;