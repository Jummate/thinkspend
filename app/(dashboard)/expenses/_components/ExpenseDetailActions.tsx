"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import type { Expense } from "@/lib/types/expense";
import ExpenseEditModal from "./ExpenseEditModal";
import ExpenseDeleteModal from "./ExpenseDeleteModal";
import { useCurrency } from "@/lib/hooks/useCurrency";

interface ExpenseDetailActionsProps {
  expense: Expense;
}

function ExpenseDetailActions({ expense }: ExpenseDetailActionsProps) {
  const router = useRouter();
  const currency = useCurrency();

  const [deleteTarget, setDeleteTarget] = useState<Expense | null>(null);
  const [editTarget, setEditTarget] = useState<Expense | null>(null);


  return (
    <>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setEditTarget(expense)}
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

      <ExpenseEditModal
        expense={editTarget}
        onClose={() => setEditTarget(null)}
        currency={currency}
        onUpdated={() => router.refresh()}
      />

      <ExpenseDeleteModal
        expense={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onDeleted={() => router.push(ROUTES.EXPENSES)}
      />
    </>
  );
}

export default ExpenseDetailActions;