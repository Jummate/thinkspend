"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign } from "lucide-react";
import Select from "@/components/ui/Select";
import { currencyBudgetSchema } from "@/lib/validations/settings";
import { updateCurrency } from "@/lib/services/settings.service";
import { supabase } from "@/lib/supabase/client";
import { CURRENCY_OPTIONS, type CurrencyCode } from "@/lib/config/currencies";
import { showError, showSuccess } from "@/lib/ui/toast";
import { SettingsSection, Field, SaveButton } from "./SettingsFormElements";

const currencySchema = currencyBudgetSchema.pick({ currency: true });

type CurrencyFormData = { currency: CurrencyCode };

interface CurrencySectionProps {
  userId: string;
  currentCurrency: CurrencyCode;
  locked: boolean;
}

function CurrencySection({
  userId,
  currentCurrency,
  locked,
}: CurrencySectionProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CurrencyFormData>({
    resolver: zodResolver(currencySchema),
    mode: "onTouched",
    defaultValues: { currency: currentCurrency },
  });

  const onSave = async (data: CurrencyFormData) => {
    try {
      await updateCurrency(supabase, userId, data.currency);
      showSuccess("Currency updated");
    } catch {
      showError("Failed to save currency. Please try again.");
    }
  };

  return (
    <SettingsSection
      icon={DollarSign}
      title="Currency"
      description="Used across the app for all your expenses."
    >
      <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-4">
        <Field label="Default Currency" error={errors.currency?.message}>
          <Select
            id="currency"
            options={CURRENCY_OPTIONS}
            error={!!errors.currency}
            disabled={locked}
            styles="bg-card py-2.5 text-sm"
            {...register("currency")}
          />
        </Field>

        {locked && (
          <p className="text-xs text-muted-foreground">
            Your expenses and budget are recorded in this currency, so it
            can&apos;t be changed. If you need to switch, contact support.
          </p>
        )}

        {!locked && <SaveButton isSubmitting={isSubmitting} />}
      </form>
    </SettingsSection>
  );
}

export default CurrencySection;