"use client";

import ExpenseForm from "@/components/expense/ExpenseForm";
import NaturalLangInputForm from "@/components/expense/ExpenseInputForm";
import { ExpenseFormData, ExpenseInputData } from "@/lib/validations/expense";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { useState } from "react";

const AddNewExpensePage = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const handleInputParse = async (data: ExpenseInputData) => {
    try {
      setServerError(null);

      const response = await fetch("/api/parse-expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naturalInput: data.expenseInput }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setServerError(result.error || "Something went wrong");
        return;
      }

      console.log("parsed data", result.data);
    } catch (err) {
      console.error("Parse error:", err);
      setServerError(
        "Unable to connect. Please check your internet connection. As an alternative, try to edit manually below."
      );
    }
  };

  const handleExpense = async (data: ExpenseFormData) => {
    try {
      setServerError(null); // Clear previous errors

      // const { error } = await supabase.auth.signInWithPassword({
      //   email: data.expenseInput,
      // });

      // if (error) {
      //   // Map Supabase errors to user-friendly messages
      //   setServerError(getFriendlyErrorMessage(error.message));
      //   return;
      // }
    } catch (err) {
      console.error("Login error:", err);
      setServerError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex-1 max-w-2xl mx-auto py-5 px-6">
      <div className="flex gap-2 text-muted-foreground">
        <ArrowLeft />
        <span>Back to Dashboard</span>
      </div>

      <header className="leading-relaxed mt-5">
        <h1 className="font-bold text-foreground">Add Expense AI</h1>
        <p className="text-muted-foreground text-sm">
          Simply type what you spent and let AI do the work.
        </p>
      </header>

      <section className="bg-white p-5 mt-10 rounded-lg shadow-xs">
        <div>
          {serverError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{serverError}</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {" "}
          <Sparkles className="text-primary/80" />
          <span className="text-xs text-muted-foreground/60 font-bold">
            NATURAL LANGUAGE INPUT
          </span>
        </div>
        <NaturalLangInputForm
          error={serverError}
          onSubmit={handleInputParse}
        />

        <p className="italic text-muted-foreground text-xs">
          Try "Lunch #1000", "Uber #12000", "Bought groceries #15500"{" "}
        </p>
      </section>

      <section className="mt-10">
        <div className="flex mb-4 gap-2 items-center">
          <span className="font-bold text-sm">AI Detected Details</span>{" "}
          <small className="flex items-center text-category-groceries bg-category-groceries/20 font-bold text-xs p-1 rounded-lg gap-1">
            <CheckCircle2
              size={10}
              className=""
            />{" "}
            PARSED
          </small>
        </div>

        <ExpenseForm
          error={serverError}
          onSubmit={handleExpense}
        />
      </section>
    </div>
  );
};

export default AddNewExpensePage;
