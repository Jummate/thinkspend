"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign } from "lucide-react";
import clsx from "clsx";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import {
  currencyBudgetSchema,
  CurrencyBudgetFormData,
} from "@/lib/validations/settings";
import { updateCurrency } from "@/lib/services/settings.service";
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

interface CurrencyBudgetSectionProps {
  userId: string;
  currentCurrency: CurrencyCode;
  initialBudget: Budget | null;
}

function CurrencyBudgetSection({
  userId,
  currentCurrency,
  initialBudget,
}: CurrencyBudgetSectionProps) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const monthLabel = now.toLocaleString("default", { month: "long" });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CurrencyBudgetFormData>({
    resolver: zodResolver(currencyBudgetSchema),
    mode: "onTouched",
    defaultValues: {
      currency: currentCurrency,
      budgetAmount: initialBudget
        ? formatAmountToString(initialBudget.amount)
        : "",
    },
  });

  // Live-updates as the user picks a different currency, instead of
  // always showing the profile's currency regardless of selection.
  const selectedCurrency = watch("currency") as CurrencyCode;

  const onSave = async (data: CurrencyBudgetFormData) => {
    try {
      const amount = formatAmountToNumber(data.budgetAmount);
      await Promise.all([
        updateCurrency(supabase, userId, data.currency),
        upsertBudget(
          supabase,
          userId,
          amount,
          data.currency,
          currentMonth,
          currentYear,
        ),
      ]);
      showSuccess("Currency and budget updated");
    } catch {
      showError("Failed to save changes. Please try again.");
    }
  };

  return (
    <SettingsSection
      icon={DollarSign}
      title="Currency & Budget"
      description="Shown across your dashboard. Budget resets monthly."
    >
      <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Default Currency" error={errors.currency?.message}>
            <Select
              id="currency"
              options={currencyOptions}
              error={!!errors.currency}
              styles="bg-card py-2.5 text-sm"
              {...register("currency")}
            />
          </Field>
          <Field
            label={`Monthly Budget — ${monthLabel} ${currentYear}`}
            error={errors.budgetAmount?.message}
          >
            <div
              className={clsx(
                "flex items-center overflow-hidden rounded-lg border bg-card transition-all",
                errors.budgetAmount
                  ? "border-danger focus-within:ring-1 focus-within:ring-danger"
                  : "border-muted-foreground/30 focus-within:ring-1 focus-within:ring-primary",
              )}
            >
              <span className="border-r border-muted-foreground/30 px-3 text-sm font-bold text-muted-foreground">
                {currencyMapping[selectedCurrency] ?? ""}
              </span>
              <Input
                id="budgetAmount"
                placeholder="200,000"
                error={!!errors.budgetAmount}
                styles="rounded-none border-none outline-none px-3 py-2.5 text-sm"
                {...register("budgetAmount")}
              />
            </div>
          </Field>
        </div>
        <SaveButton isSubmitting={isSubmitting} />
      </form>
    </SettingsSection>
  );
}

export default CurrencyBudgetSection;