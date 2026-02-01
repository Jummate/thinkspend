"use client";

import {
  ExpenseInputData,
  expenseInputSchema,
} from "@/lib/validations/expense";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { FaBoltLightning } from "react-icons/fa6";
import Input from "../ui/Input";
import clsx from "clsx";
import { Sparkles } from "lucide-react";

interface ExpenseInputFormProps {
  onSubmit: (data: ExpenseInputData) => Promise<void>;
  error?: string | null;
}

const ExpenseInputForm = ({ error, onSubmit }: ExpenseInputFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseInputData>({
    resolver: zodResolver(expenseInputSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-4 rounded-lg flex flex-col">
        <div
          className={clsx(
            "flex items-center bg-muted rounded-lg border border-muted-foreground/30 overflow-auto",
            { "border border-red-500": errors.expenseInput }
          )}
        >
          <div className="flex items-center justify-center px-2">
            <Sparkles className="text-primary/80" />
          </div>
          <Input
            type="text"
            id="expenseInput"
            styles="px-2 py-3 font-bold rounded-none border-none outline-none focus:shadow-sm focus:ring-1 focus:ring-primary text-sm"
            error={!!errors.expenseInput}
            {...register("expenseInput")}
          />
        </div>

        {errors.expenseInput && (
          <span className="text-red-600 text-sm">
            {errors.expenseInput.message}
          </span>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={clsx(
            "flex items-center justify-center gap-1 cursor-pointer self-end bg-primary hover:bg-primary-dark rounded-lg px-8 py-1.5 mt-3 text-white",
            {
              "opacity-50 pointer-events-none cursor-not-allowed": isSubmitting,
            }
          )}
        >
          {isSubmitting ? (
            "Parsing..."
          ) : (
            <span className="font-bold flex justify-center items-center gap-1">
              Parse
              <FaBoltLightning size={15} />
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default ExpenseInputForm;
