"use client";

import {
  ExpenseInputData,
  expenseInputSchema,
} from "@/lib/validations/expense";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { FaBoltLightning } from "react-icons/fa6";
import Input from "../ui/Input";
import clsx from "clsx";
import { Sparkles } from "lucide-react";

interface ExpenseInputFormProps {
  onSubmit: (data: ExpenseInputData) => Promise<void>;
  error?: string | null;
}

export interface NaturalLangInputFormHandle {
  reset: () => void;
}

const ExpenseInputForm = forwardRef<
  NaturalLangInputFormHandle,
  ExpenseInputFormProps
>(({ error, onSubmit }: ExpenseInputFormProps, ref) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseInputData>({
    resolver: zodResolver(expenseInputSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  useImperativeHandle(ref, () => ({
    reset: () => reset(),
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-4 rounded-lg flex flex-col">
        <div
          // className={clsx(
          //   "flex items-center bg-muted rounded-lg border border-muted-foreground/30 overflow-hidden transition-all",
          //   "focus-within:ring-1 focus-within:ring-primary focus-within:shadow-sm",
          //   { "border-red-500": errors.expenseInput }
          // )}
          className={clsx(
            "flex items-center bg-muted rounded-lg border overflow-hidden transition-all",
            errors.expenseInput
              ? "border-red-500 focus-within:ring-1 focus-within:ring-red-500"
              : "border-muted-foreground/30 focus-within:ring-1 focus-within:ring-primary focus-within:shadow-sm",
          )}
        >
          <div className="flex items-center justify-center px-2">
            <Sparkles className="text-primary/80" />
          </div>
          <Input
            type="text"
            id="expenseInput"
            styles="px-2 py-3 font-bold rounded-none rounded-r-lg border-none outline-none text-sm focus:outline-none focus:ring-0"
            containerStyles="bg-white"
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
            },
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
});

export default ExpenseInputForm;
