"use client";

import { Trash2 } from "lucide-react";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { useDeleteExpense } from "@/lib/hooks/useDeleteExpense";
import { showError, showSuccess } from "@/lib/ui/toast";
import type { Expense } from "@/lib/types/expense";

interface ExpenseDeleteModalProps {
  expense: Expense | null;
  onClose: () => void;
  /**
   * Called after a successful delete, in addition to onClose. Used by
   * the detail page to navigate away — the expense it was rendering no
   * longer exists.
   */
  onDeleted?: () => void;
}

function ExpenseDeleteModal({
  expense,
  onClose,
  onDeleted,
}: ExpenseDeleteModalProps) {
  const deleteExpense = useDeleteExpense();

  const isOpen = expense !== null;

  const handleConfirm = () => {
    if (!expense) return;

    deleteExpense.mutate(expense.id, {
      onSuccess: () => {
        showSuccess("Expense deleted");
        onClose();
        onDeleted?.();
      },
      onError: () => {
        showError("Failed to delete expense. Please try again.");
      },
    });
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      icon={Trash2}
      variant="danger"
      title="Delete this expense?"
      description={
        expense ? (
          <>
            This removes{" "}
            <span className="font-semibold text-foreground">
              &ldquo;{expense.description || expense.category}&rdquo;
            </span>{" "}
            permanently. You can&rsquo;t undo this.
          </>
        ) : null
      }
      confirmLabel="Delete"
      loadingLabel="Deleting..."
      isLoading={deleteExpense.isPending}
    />
  );
}

export default ExpenseDeleteModal;