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

interface NaturalLangInputFormProps {
  onSubmit: (data: ExpenseInputData) => Promise<void>;
  error?: string | null;
}

const NaturalLangInputForm = ({
  error,
  onSubmit,
}: NaturalLangInputFormProps) => {
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
      <div className="p-3 bg-secondary/50 my-4 rounded-lg flex flex-col">
        <Input
          type="text"
          id="expenseInput"
          styles="border border-muted-foreground/30 rounded-lg p-2 bg-white px-3 font-bold outline-none focus:shadow-sm focus:ring-1 focus:ring-primary text-sm"
          error={!!errors.expenseInput}
          {...register("expenseInput")}
        />
        {errors.expenseInput && (
          <span className="text-red-600 text-sm">
            {errors.expenseInput.message}
          </span>
        )}

        <button
          type="submit"
          className="flex items-center justify-center gap-1 cursor-pointer self-end bg-primary hover:bg-primary-dark rounded-lg px-4 py-1 mt-3 text-white"
        >
          <span className="font-bold">Parse</span> <FaBoltLightning size={15} />
        </button>
      </div>
    </form>
  );
};

export default NaturalLangInputForm;
