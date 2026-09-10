"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign } from "lucide-react";
import Select from "@/components/ui/Select";
import {
  currencySchema,
  CurrencyFormData,
} from "@/lib/validations/settings";
import { updateCurrency } from "@/lib/services/settings.service";
import { supabase } from "@/lib/supabase/client";
import { showError, showSuccess } from "@/lib/ui/toast";
import type { CurrencyCode } from "@/lib/types/profile";
import { SettingsSection, Field, SaveButton } from "./SettingsFormElements";

const currencyOptions = [
  { value: "NGN", label: "₦ Nigerian Naira (NGN)" },
  { value: "USD", label: "$ US Dollar (USD)" },
  { value: "EUR", label: "€ Euro (EUR)" },
  { value: "GBP", label: "£ British Pound (GBP)" },
];

interface CurrencySectionProps {
  userId: string;
  currentCurrency: CurrencyCode;
}

function CurrencySection({ userId, currentCurrency }: CurrencySectionProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CurrencyFormData>({
    resolver: zodResolver(currencySchema),
    mode: "onTouched",
    defaultValues: { currency: currentCurrency },
  });

  const onCurrencySave = async (data: CurrencyFormData) => {
    try {
      await updateCurrency(supabase, userId, data.currency);
      showSuccess("Currency preference updated");
    } catch {
      showError("Failed to update currency. Please try again.");
    }
  };

  return (
    <SettingsSection
      icon={DollarSign}
      title="Currency Preference"
      description="This currency will be shown across your dashboard."
    >
      <form
        onSubmit={handleSubmit(onCurrencySave)}
        className="flex flex-col gap-4"
      >
        <Field label="Default Currency" error={errors.currency?.message}>
          <Select
            id="currency"
            options={currencyOptions}
            error={!!errors.currency}
            styles="bg-card py-2.5 text-sm"
            {...register("currency")}
          />
        </Field>
        <SaveButton isSubmitting={isSubmitting} />
      </form>
    </SettingsSection>
  );
}

export default CurrencySection;