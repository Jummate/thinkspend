"use client";

import { Check } from "lucide-react";
import React, { useEffect } from "react";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseDataSchema, ExpenseFormData } from "@/lib/validations/expense";
import Select from "../ui/Select";
import Textarea from "../ui/TextArea";
import { ParsedExpense } from "@/lib/types/expense";
import { mapAICategoryToValue } from "@/lib/utils/category-mapper";
import clsx from "clsx";

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => Promise<void>;
  error?: string | null;
  expenseData?: ParsedExpense;
}

const categoryOptions = [
  { value: "food", label: "🍔 Food & Drinks" },
  { value: "transport", label: "🚗 Transport" },
  { value: "groceries", label: "🛒 Groceries" },
  { value: "bills", label: "⚡ Bills" },
  { value: "other", label: "📦 Other" },
];
const currencyOptions = [
  { value: "NGN", label: "₦" },
  { value: "USD", label: "$" },
  { value: "EUR", label: "€" },
  { value: "GBP", label: "£" },
];

// const COMMON_CURRENCIES = [
//   { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
//   { code: 'USD', symbol: '$', name: 'US Dollar' },
//   { code: 'EUR', symbol: '€', name: 'Euro' },
//   { code: 'GBP', symbol: '£', name: 'British Pound' },
// ];

// const formatCurrency = (amount: number, currency: string) => {
//   const symbols = { NGN: '₦', USD: '$', EUR: '€', GBP: '£' };
//   return `${symbols[currency] || currency} ${amount.toLocaleString()}`;
// };

const ExpenseForm = ({ error, onSubmit, expenseData }: ExpenseFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseDataSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (expenseData) {
      reset({
        amount: expenseData.amount.toString(),
        currency: expenseData.currency,
        category: mapAICategoryToValue(expenseData.category),
        description: expenseData.description || "",
        date: expenseData.date,
      });
    }
  }, [expenseData, reset]);

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-4">
        <div className="flex flex-col flex-1">
          <label
            htmlFor="amount"
            className="mb-2 text-muted-foreground text-sm"
          >
            Amount
          </label>

          <div className={clsx(
                      "flex items-center bg-muted rounded-lg border border-muted-foreground/30 overflow-hidden transition-all",
                      "focus-within:ring-1 focus-within:ring-primary focus-within:shadow-sm",
                      { "border-red-500": errors.amount }
                    )}>
                       <div className="w-18"> <Select
              {...register("currency")}
              id="currency"
              options={currencyOptions}
              placeholder="Select a currency"
              styles="bg-muted border-none outline-none rounded-none font-bold"
              defaultValue="NGN"
            /></div>
            <Input
              type="text"
              id="amount"
              styles="rounded-none rounded-r-lg p-2 bg-white px-2 py-2 outline-none border-none"
              error={!!errors.amount}
              {...register("amount")}
            />
          </div>
          {errors.amount && (
            <span className="text-red-600 text-sm">
              {errors.amount.message}
            </span>
          )}
        </div>
        <div className="flex flex-col flex-1">
          <label
            htmlFor="category"
            className="mb-2 text-muted-foreground text-sm"
          >
            Category
          </label>

          <Select
            {...register("category")}
            id="category"
            options={categoryOptions}
            placeholder="Select a category"
            error={!!errors.category}
            styles="bg-white"
          />

          {errors.category && (
            <p className="mt-1 text-xs text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="description"
          className="mb-2 text-muted-foreground text-sm"
        >
          Description
        </label>

        <Textarea
          {...register("description")}
          id="description"
          placeholder="Coffee at Starbucks"
          error={!!errors.description}
          rows={3}
          styles="border border-muted-foreground/30 rounded-lg p-2 bg-white px-3 font-bold outline-none focus:shadow-sm focus:ring-1 focus:ring-primary text-sm"
        />

        {errors.description && (
          <span className="text-red-600 text-sm">
            {errors.description.message}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="date"
          className="mb-2 text-muted-foreground text-sm"
        >
          Date
        </label>

        <Input
          type="date"
          id="date"
          styles="border border-muted-foreground/30 rounded-lg p-2 py-3 bg-white px-3 font-bold outline-none focus:shadow-sm focus:ring-1 focus:ring-primary text-sm"
          error={!!errors.date}
          {...register("date")}
        />
        {errors.date && (
          <span className="text-red-600 text-sm">{errors.date.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={clsx(
          "flex items-center justify-center gap-1 cursor-pointer self-start bg-primary hover:bg-primary-dark rounded-lg px-6 py-2 text-white mt-4",
          { "opacity-50 pointer-events-none cursor-not-allowed": isSubmitting }
        )}
      >
        <span className="font-bold"></span>

        {isSubmitting ? (
          "Saving expense info..."
        ) : (
          <span className="font-bold flex justify-center items-center gap-1">
            Save Expense <Check size={15} />
          </span>
        )}
      </button>
    </form>
  );
};

export default ExpenseForm;
