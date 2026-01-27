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

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => Promise<void>;
  error?: string | null; // Auth error from parent
  expenseData?: ParsedExpense;
}

const categoryOptions = [
  { value: "food", label: "🍔 Food & Drinks" },
  { value: "transport", label: "🚗 Transport" },
  { value: "groceries", label: "🛒 Groceries" },
  { value: "bills", label: "⚡ Bills" },
  { value: "other", label: "📦 Other" },
];

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
        category: mapAICategoryToValue(expenseData.category),
        description: expenseData.description || "",
        date: expenseData.date,
      });
    }
  }, [expenseData, reset]);

  return (
    <form className="flex flex-col gap-3">
      <div className="flex gap-4">
        <div className="flex flex-col flex-1">
          <label
            htmlFor="amount"
            className="mb-2 text-muted-foreground text-sm"
          >
            Amount
          </label>

          <Input
            type="text"
            id="amount"
            styles="border border-muted-foreground/30 rounded-lg p-2 bg-white px-3 font-bold outline-none focus:shadow-sm focus:ring-1 focus:ring-primary text-sm"
            error={!!errors.amount}
            {...register("amount")}
          />
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
          htmlFor=""
          className="mb-2 text-muted-foreground text-sm"
        >
          Date
        </label>

        <Input
          type="date"
          id="date"
          styles="border border-muted-foreground/30 rounded-lg p-2 bg-white px-3 font-bold outline-none focus:shadow-sm focus:ring-1 focus:ring-primary text-sm"
          error={!!errors.date}
          {...register("date")}
        />
        {errors.date && (
          <span className="text-red-600 text-sm">{errors.date.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-1 cursor-pointer self-start bg-primary hover:bg-primary-dark rounded-lg px-6 py-2 text-white mt-4"
      >
        <span className="font-bold">Save Expense</span> <Check size={15} />
      </button>
    </form>
  );
};

export default ExpenseForm;
