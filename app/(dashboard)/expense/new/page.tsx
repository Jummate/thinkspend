"use client";

import ExpenseForm from "@/components/expense/ExpenseForm";
import NaturalLangInputForm from "@/components/expense/ExpenseInputForm";
import { useUser } from "@/lib/hooks/useUser";
import { supabase } from "@/lib/supabase/client";
import { ParsedExpense } from "@/lib/types/expense";
import { mapAICategoryToValue } from "@/lib/utils/category-mapper";
import { ExpenseFormData, ExpenseInputData } from "@/lib/validations/expense";
import { CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";
import { NaturalLangInputFormHandle } from "@/components/expense/ExpenseInputForm";
import { parseExpense } from "@/lib/services/expense-parse.client";
import { saveExpense } from "@/lib/services/expense.service";
import { showError, showSuccess } from "@/lib/ui/toast";
import { AppError } from "@/lib/errors/app-error";
import { useCurrency } from "@/lib/hooks/useCurrency";

const AddNewExpensePage = () => {
  const { user, loading } = useUser();
  const currency = useCurrency();
  const [serverError, setServerError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<ParsedExpense | null>(null);
  const [isParsed, setIsParsed] = useState<boolean>(false);
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
        amount: String(parsedData.amount),
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
    <div className="max-w-2xl px-6 py-8">
      {/* Page header */}
      <header>
        <h1 className="text-2xl font-bold text-foreground">Add an Expense</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Describe it once — ThinkSpend fills in the rest.
        </p>
      </header>

      {/* Error banner — sits between the header and the AI card */}
      {serverError && (
        <div className="mt-6 rounded-lg border border-danger/30 bg-danger/10 p-3">
          <p className="text-sm text-danger">{serverError}</p>
        </div>
      )}

      {/* AI parse card */}
      <section className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-base font-semibold text-foreground">
          Describe your expense
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Type what you spent, in plain words.
        </p>

        <div className="mt-5">
          <NaturalLangInputForm
            ref={parseFormRef}
            error={serverError}
            onSubmit={handleInputParse}
          />

             <p className="text-xs italic text-muted-foreground">
          Try &quot;Lunch ₦1000&quot;, &quot;Uber ₦12000&quot;, &quot;Bought
          groceries ₦15500&quot;
        </p>






        </div>
      </section>

      {/* Divider */}
      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Fills in below
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Form card */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-5 flex items-center gap-2">
          <h2 className="text-base font-semibold text-foreground">
            Expense Details
          </h2>
          {isParsed && (
            <small className="flex items-center gap-1 rounded-lg bg-category-groceries/20 px-2 py-0.5 text-xs font-bold text-category-groceries">
              <CheckCircle2 size={10} /> PARSED
            </small>
          )}
        </div>

        <ExpenseForm
          onSubmit={handleExpense}
          currency={currency}
          initialValues={initialValues}
        />
      </section>
    </div>
  );
};

export default AddNewExpensePage;