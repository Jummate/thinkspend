"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wallet } from "lucide-react";
import clsx from "clsx";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { budgetSchema, BudgetFormData } from "@/lib/validations/settings";
import { upsertBudget, type Budget } from "@/lib/services/budget.service";
import { supabase } from "@/lib/supabase/client";
import {
  formatAmountToNumber,
  formatAmountToString,
} from "@/lib/utils/format-amount";
import { currencyMapping, type CurrencyCode } from "@/lib/types/profile";
import { showError, showSuccess } from "@/lib/ui/toast";
import { SettingsSection, Field, SaveButton } from "./SettingsFormElements";

const currencyOptions = [
  { value: "NGN", label: "₦ Nigerian Naira (NGN)" },
  { value: "USD", label: "$ US Dollar (USD)" },
  { value: "EUR", label: "€ Euro (EUR)" },
  { value: "GBP", label: "£ British Pound (GBP)" },
];

interface BudgetSectionProps {
  userId: string;
  defaultCurrency: CurrencyCode;
  initialBudget: Budget | null;
}

function BudgetSection({
  userId,
  defaultCurrency,
  initialBudget,
}: BudgetSectionProps) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const monthName = new Date(currentYear, currentMonth - 1).toLocaleString(
    "default",
    { month: "long" },
  );

  const [budget, setBudget] = useState<Budget | null>(initialBudget);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    mode: "onTouched",
    defaultValues: initialBudget
      ? {
          amount: formatAmountToString(initialBudget.amount),
          currency: initialBudget.currency as BudgetFormData["currency"],
        }
      : { amount: "", currency: defaultCurrency },
  });

  const onBudgetSave = async (data: BudgetFormData) => {
    try {
      const amount = formatAmountToNumber(data.amount);
      await upsertBudget(
        supabase,
        userId,
        amount,
        data.currency,
        currentMonth,
        currentYear,
      );
      // No cross-page cache to invalidate — /dashboard is a Server
      // Component that re-fetches fresh on every navigation, so this
      // local update is only for this section's own "Current budget"
      // line below.
      setBudget({
        id: budget?.id ?? "",
        amount,
        currency: data.currency,
        month: currentMonth,
        year: currentYear,
      });
      showSuccess("Budget saved successfully");
    } catch {
      showError("Failed to save budget. Please try again.");
    }
  };

  return (
    <SettingsSection
      icon={Wallet}
      title="Monthly Budget"
      description={`Set your spending limit for ${monthName} ${currentYear}.`}
    >
      <form
        onSubmit={handleSubmit(onBudgetSave)}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Budget Amount" error={errors.amount?.message}>
            <div
              className={clsx(
                "flex items-center overflow-hidden rounded-lg border bg-card transition-all",
                errors.amount
                  ? "border-danger focus-within:ring-1 focus-within:ring-danger"
                  : "border-muted-foreground/30 focus-within:ring-1 focus-within:ring-primary",
              )}
            >
              <span className="border-r border-muted-foreground/30 px-3 text-sm font-bold text-muted-foreground">
                {currencyMapping[defaultCurrency]}
              </span>
              <Input
                id="budgetAmount"
                placeholder="200,000"
                error={!!errors.amount}
                styles="rounded-none border-none outline-none px-3 py-2.5 text-sm"
                {...register("amount")}
              />
            </div>
          </Field>
          <Field label="Currency" error={errors.currency?.message}>
            <Select
              id="budgetCurrency"
              options={currencyOptions}
              error={!!errors.currency}
              styles="bg-card py-2.5 text-sm"
              {...register("currency")}
            />
          </Field>
        </div>
        {budget && (
          <p className="text-xs text-muted-foreground">
            Current budget: {currencyMapping[defaultCurrency]}
            {formatAmountToString(budget.amount)} for {monthName}
          </p>
        )}
        <SaveButton isSubmitting={isSubmitting} />
      </form>
    </SettingsSection>
  );
}

export default BudgetSection;