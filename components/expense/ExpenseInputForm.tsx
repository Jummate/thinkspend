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
import Button from "../ui/Button";

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
          className={clsx(
            "flex items-center bg-muted rounded-lg border overflow-hidden transition-all",
            errors.expenseInput
              ? "border-danger focus-within:ring-1 focus-within:ring-danger"
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
            error={!!errors.expenseInput}
            {...register("expenseInput")}
          />
        </div>

        {errors.expenseInput && (
          <span className="text-danger text-sm">
            {errors.expenseInput.message}
          </span>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          fullWidth={false}
          styles="self-end flex items-center justify-center gap-1 px-8 py-1.5 mt-3"
        >
          {isSubmitting ? (
            "Parsing..."
          ) : (
            <>
              Parse
              <FaBoltLightning size={15} />
            </>
          )}
        </Button>
      </div>
    </form>
  );
});

export default ExpenseInputForm;
