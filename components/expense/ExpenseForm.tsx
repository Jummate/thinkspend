"use client";

import { Check } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "../ui/Select";
import Textarea from "../ui/TextArea";
import FormAmountInput from "../ui/FormAmountInput";
import {
  expenseDataSchema,
  type ExpenseFormData,
} from "@/lib/validations/expense";
import { CATEGORIES } from "@/lib/config/categories";
import { currencyMapping, type CurrencyCode } from "@/lib/types/profile";
import { cn } from "@/lib/utils";
import DatePicker from "../ui/DatePicker";
import FieldLabel from "../ui/FieldLabel";

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => Promise<void>;
  currency: CurrencyCode;
  initialValues?: Omit<Partial<ExpenseFormData>, "currency">;
}

const categoryOptions = CATEGORIES.map((category) => ({
  value: category.value,
  label: `${category.emoji} ${category.label}`,
}));

const ExpenseForm = ({
  onSubmit,
  currency,
  initialValues,
}: ExpenseFormProps) => {
  const currencySymbol = currencyMapping[currency];

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseDataSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
      currency,
      category: "",
      description: "",
      date: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({ ...initialValues, currency });
    }
  }, [initialValues, currency, reset]);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Amount + Category */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <FormAmountInput
            control={control}
            name="amount"
            label="Amount"
            id="amount"
            required
            error={errors.amount?.message}
            prefix={currencySymbol}
            placeholder="0.00"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <FieldLabel
            htmlFor="category"
            required
          >
            Category
          </FieldLabel>

          <Select
            {...register("category")}
            id="category"
            options={categoryOptions}
            placeholder="Select a category"
            error={!!errors.category}
            styles="bg-card"
          />

          {errors.category && (
            <p className="text-xs text-danger">{errors.category.message}</p>
          )}
        </div>
      </div>
      <Controller
        control={control}
        name="date"
        render={({ field, fieldState }) => (
          <DatePicker
            label="Date"
            id="date"
            required
            error={fieldState.error?.message}
            value={field.value ?? ""}
            onValueChange={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />

      <div className="flex flex-col gap-2">
        <FieldLabel htmlFor="description">Description</FieldLabel>

        <Textarea
          {...register("description")}
          id="description"
          placeholder="Coffee at Starbucks"
          error={!!errors.description}
          rows={3}
          styles="border border-muted-foreground/30 rounded-lg p-3 bg-card px-3 outline-none focus:shadow-sm focus:ring-1 focus:ring-primary text-sm"
        />

        {errors.description && (
          <p className="text-xs text-danger">{errors.description.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "mt-4 flex items-center justify-center gap-1 self-start rounded-lg bg-primary px-6 py-2 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-dark",
          isSubmitting && "pointer-events-none cursor-not-allowed opacity-50",
        )}
      >
        {isSubmitting ? (
          "Saving..."
        ) : (
          <>
            Save Expense
            <Check size={15} />
          </>
        )}
      </button>
    </form>
  );
};

export default ExpenseForm;
