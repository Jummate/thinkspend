"use client";

import ExpenseForm from "@/components/expense/ExpenseForm";
import NaturalLangInputForm from "@/components/expense/ExpenseInputForm";
import { useUser } from "@/lib/hooks/useUser";
import { supabase } from "@/lib/supabase/client";
import { ParsedExpense } from "@/lib/types/expense";
import { mapValueToAICategory } from "@/lib/utils/category-mapper";
import { formatAmountToNumber } from "@/lib/utils/format-amount";
import { ExpenseFormData, ExpenseInputData } from "@/lib/validations/expense";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { NaturalLangInputFormHandle } from "@/components/expense/ExpenseInputForm";
import { parseExpense } from "@/lib/services/expense-parse.client";
import { saveExpense } from "@/lib/services/expense.service";
import { showError, showSuccess } from "@/lib/ui/toast";

const AddNewExpensePage = () => {
  const { user, loading } = useUser();
  const [serverError, setServerError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<ParsedExpense | null>(null);
  const [isParsed, setIsParsed] = useState<boolean>(false);
  const router = useRouter();
  const parseFormRef = useRef<NaturalLangInputFormHandle>(null);

  const handleInputParse = async (data: ExpenseInputData) => {
    try {
      setServerError(null);
      setIsParsed(false);

      // const response = await fetch("/api/parse-expense", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ naturalInput: data.expenseInput }),
      // });

      // const result = await response.json();

      const result = await parseExpense(data.expenseInput);

      // if (!response.ok || !result.success) {
      //   setServerError(result.error || "Something went wrong");

      //   return;
      // }

      setParsedData(result.data);
      setIsParsed(true);
      parseFormRef.current?.reset();
    } catch (err) {
      console.log("Parse error:", err);
      setServerError(
        "Unable to reach the AI parser. Please check your internet connection. You can still add your expense by filling in the details manually in the form below.",
      );
    }
  };

  const handleExpense = async (data: ExpenseFormData) => {
    try {
      setServerError(null);

      if (!user) {
        // setServerError("You must be logged in to add expenses");
        // toast.error("You must be logged in to add expenses", {
        //   style: {
        //     background: "#fff",
        //     color: "#f12f2f",
        //     border: "none",
        //   },
        // });

        showError("You must be logged in to add expenses")
        return;
      }

      // const expenseToSave = {
      //   amount: formatAmountToNumber(data.amount),
      //   currency: data.currency,
      //   category: mapValueToAICategory(data.category),
      //   description: data.description,
      //   date: data.date,
      // };

      // const { error } = await supabase.from("expenses").insert({
      //   ...expenseToSave,
      //   user_id: user.id,
      // });

      // if (error) throw error;

      await saveExpense(user.id, data);

      showSuccess("Expense saved successfully");

      // toast.success("Expense saved successfully", {
      //   style: {
      //     background: "#fff",
      //     color: "#22c55e",
      //     border: "none",
      //   },
      // });

      // router.push("/dashboard");
    } catch (err) {
      console.log("Save error:", err);
      // setServerError("Failed to save expense. Please try again.");
      // toast.error("Failed to save expense. Please try again", {
      //   style: {
      //     background: "#fff",
      //     color: "#f12f2f",
      //     border: "none",
      //   },
      // });

      showError("Failed to save expense. Please try again")
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex-1 max-w-2xl mx-auto py-5 px-6">
      <Link
        href={"/dashboard"}
        className="flex gap-2 text-muted-foreground"
      >
        <ArrowLeft />
        <span>Back to Dashboard</span>
      </Link>

      <header className="leading-relaxed mt-5">
        <h1 className="font-bold text-foreground">Describe Your Expense</h1>
        <p className="text-muted-foreground text-sm">
          Simply type what you spent and let AI do the work.
        </p>
      </header>

      <div className="my-6">
        {serverError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{serverError}</p>
          </div>
        )}
      </div>

      <section className="bg-white p-5 mt-10 rounded-lg shadow-xs">
        <NaturalLangInputForm
          ref={parseFormRef}
          error={serverError}
          onSubmit={handleInputParse}
        />

        <p className="italic text-muted-foreground text-xs">
          Try "Lunch ₦1000", "Uber ₦12000", "Bought groceries ₦15500"
        </p>
      </section>

      <section className="mt-10">
        <div className="flex mb-4 gap-2 items-center">
          <span className="font-bold text-sm">Expense Details</span>
          {isParsed ? (
            <small className="flex items-center text-category-groceries bg-category-groceries/20 font-bold text-xs p-1 rounded-lg gap-1">
              <CheckCircle2 size={10} /> PARSED
            </small>
          ) : null}
        </div>

        <ExpenseForm
          onSubmit={handleExpense}
          expenseData={parsedData as ParsedExpense}
        />
      </section>
    </div>
  );
};

export default AddNewExpensePage;
