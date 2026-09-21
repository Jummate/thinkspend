"use client";

import ExpenseForm from "@/components/expense/ExpenseForm";
import NaturalLangInputForm from "@/components/expense/ExpenseInputForm";
import { useUser } from "@/lib/hooks/useUser";
import { supabase } from "@/lib/supabase/client";
import { ParsedExpense } from "@/lib/types/expense";
import { mapAICategoryToValue } from "@/lib/utils/category-mapper";
import { formatAmountToString } from "@/lib/utils/format-amount";
import { ExpenseFormData, ExpenseInputData } from "@/lib/validations/expense";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { NaturalLangInputFormHandle } from "@/components/expense/ExpenseInputForm";
import { parseExpense } from "@/lib/services/expense-parse.client";
import { saveExpense } from "@/lib/services/expense.service";
import { showError, showSuccess } from "@/lib/ui/toast";
import { AppError } from "@/lib/errors/app-error";
import type { CurrencyCode } from "@/lib/types/profile";

const AddNewExpensePage = () => {
  const { user, profile, loading } = useUser();
  const [serverError, setServerError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<ParsedExpense | null>(null);
  const [isParsed, setIsParsed] = useState<boolean>(false);
  const router = useRouter();
  const parseFormRef = useRef<NaturalLangInputFormHandle>(null);

  const handleInputParse = async (data: ExpenseInputData) => {
    try {
      setServerError(null);
      setIsParsed(false);

      const result = await parseExpense(data.expenseInput);

      setParsedData(result.data);
      setIsParsed(true);
      parseFormRef.current?.reset();
    } catch (err) {
      console.log("Parse error:", err);

      if (err instanceof AppError) {
        setServerError(err.message);
      } else {
        setServerError(
          "Unable to reach the AI parser. Please check your internet connection. You can still add your expense by filling in the details manually in the form below.",
        );
      }
    }
  };

  const handleExpense = async (data: ExpenseFormData) => {
    try {
      setServerError(null);

      if (!user) {
        showError("You must be logged in to add expenses");
        return;
      }

      await saveExpense(supabase, user.id, data);
      showSuccess("Expense saved successfully");

      // router.push("/dashboard");
    } catch (err) {
      console.log("Save error:", err);

      showError("Failed to save expense. Please try again");
    }
  };

  // Convert the AI parse result into the form's own input shape. The
  // currency is deliberately not mapped — every expense inherits the
  // user's profile currency (single-currency policy).
  const initialValues = parsedData
    ? {
        amount: formatAmountToString(parsedData.amount),
        category: mapAICategoryToValue(parsedData.category),
        description: parsedData.description || "",
        date: parsedData.date,
      }
    : undefined;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-5">
      <header className="leading-relaxed">
        <h1 className="font-bold text-foreground">Describe Your Expense</h1>
        <p className="text-sm text-muted-foreground">
          Simply type what you spent and let AI do the work.
        </p>
      </header>

      <div className="my-6">
        {serverError && (
          <div className="mb-4 rounded-md border border-danger/30 bg-danger/10 p-3">
            <p className="text-sm text-danger">{serverError}</p>
          </div>
        )}
      </div>

      <section className="mt-10 rounded-lg bg-card p-5 shadow-xs">
        <NaturalLangInputForm
          ref={parseFormRef}
          error={serverError}
          onSubmit={handleInputParse}
        />

        <p className="text-xs italic text-muted-foreground">
          Try &quot;Lunch ₦1000&quot;, &quot;Uber ₦12000&quot;, &quot;Bought
          groceries ₦15500&quot;
        </p>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm font-bold">Expense Details</span>
          {isParsed ? (
            <small className="flex items-center gap-1 rounded-lg bg-category-groceries/20 p-1 text-xs font-bold text-category-groceries">
              <CheckCircle2 size={10} /> PARSED
            </small>
          ) : null}
        </div>

        <ExpenseForm
          onSubmit={handleExpense}
          currency={(profile?.currency ?? "NGN") as CurrencyCode}
          initialValues={initialValues}
        />
      </section>
    </div>
  );
};

export default AddNewExpensePage;