"use client";

import Modal from "@/components/ui/Modal";
import ExpenseForm from "@/components/expense/ExpenseForm";
import { useUpdateExpense } from "@/lib/hooks/useUpdateExpense";
import { mapAICategoryToValue } from "@/lib/utils/category-mapper";
import { formatAmountToString } from "@/lib/utils/format-amount";
import { showError, showSuccess } from "@/lib/ui/toast";
import type { Expense } from "@/lib/types/expense";
import type { CurrencyCode } from "@/lib/types/profile";
import type { ExpenseFormData } from "@/lib/validations/expense";

interface ExpenseEditModalProps {
  expense: Expense | null;
  onClose: () => void;
  currency: CurrencyCode;
  /**
   * Called after a successful update, in addition to onClose. Used by
   * the detail page to refresh the Server Component — that page has no
   * react-query cache to invalidate, so the mutation's own invalidation
   * has nothing to act on there.
   */
  onUpdated?: () => void;
}

function ExpenseEditModal({
  expense,
  onClose,
  currency,
  onUpdated,
}: ExpenseEditModalProps) {
  const updateExpense = useUpdateExpense();

  const isOpen = expense !== null;

  // Convert the DB row into the form's input shape. Mirrors what the
  // create page does with ParsedExpense — the form takes
  // Partial<ExpenseFormData> minus currency, so the caller maps.
  const initialValues = expense
    ? {
        amount: String(expense.amount),
        category: mapAICategoryToValue(expense.category),
        description: expense.description ?? "",
        date: expense.date,
      }
    : undefined;

  const handleSubmit = async (data: ExpenseFormData) => {
    if (!expense) return;

    try {
      await updateExpense.mutateAsync({ id: expense.id, data });
      showSuccess("Expense updated");
      onClose();
      onUpdated?.();
    } catch {
      showError("Failed to update expense. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="mb-1 text-xl font-bold text-foreground">Edit expense</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Update the details and save.
      </p>

      {expense && (
        <ExpenseForm
          onSubmit={handleSubmit}
          currency={currency}
          initialValues={initialValues}
        />
      )}
    </Modal>
  );
}

export default ExpenseEditModal;