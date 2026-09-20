"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import type { Expense } from "@/lib/types/expense";
import ExpenseDeleteModal from "./ExpenseDeleteModal";

interface ExpenseDetailActionsProps {
  expense: Expense;
}

function ExpenseDetailActions({ expense }: ExpenseDetailActionsProps) {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState<Expense | null>(null);

  // TODO: wire to the edit modal once it exists.
  const handleEdit = () => {
    void expense;
  };

  return (
    <>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleEdit}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-card py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          <Pencil size={16} />
          Edit
        </button>
        <button
          type="button"
          onClick={() => setDeleteTarget(expense)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-danger bg-danger/10 py-3 text-sm font-medium text-danger transition-colors hover:bg-danger/20"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>

      <ExpenseDeleteModal
        expense={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onDeleted={() => router.push(ROUTES.EXPENSES)}
      />
    </>
  );
}

export default ExpenseDetailActions;