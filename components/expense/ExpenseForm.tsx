"use client";

import { Check } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
    defaultValues: { currency },
  });

  useEffect(() => {
    if (initialValues) {
      reset({ ...initialValues, currency });
    }
  }, [initialValues, currency, reset]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
          <label
            htmlFor="category"
            className="text-sm font-medium text-muted-foreground"
          >
            Category
            <span className="ml-1 text-danger">*</span>
          </label>

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

      {/* Date — fixed height, sits above the growing textarea */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="date"
          className="text-sm font-medium text-muted-foreground"
        >
          Date
          <span className="ml-1 text-danger">*</span>
        </label>

        <input
          type="date"
          id="date"
          className={cn(
            "h-10 w-full rounded-lg border px-3 text-sm outline-none transition-shadow",
            errors.date
              ? "border-danger bg-card text-foreground focus:border-transparent focus:ring-2 focus:ring-danger"
              : "border-muted-foreground/30 bg-card text-foreground focus:border-transparent focus:ring-2 focus:ring-primary",
          )}
          {...register("date")}
        />

        {errors.date && (
          <p className="text-xs text-danger">{errors.date.message}</p>
        )}
      </div>

      {/* Description — growing textarea, deliberately last */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="text-sm font-medium text-muted-foreground"
        >
          Description
        </label>

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