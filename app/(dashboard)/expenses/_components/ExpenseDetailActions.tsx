"use client";

import { Pencil, Trash2 } from "lucide-react";

interface ExpenseDetailActionsProps {
  expenseId: string;
}

function ExpenseDetailActions({ expenseId }: ExpenseDetailActionsProps) {
  // TODO: wire to Edit modal and Delete confirmation modal once they exist.
  const handleEdit = () => {
    void expenseId;
  };

  const handleDelete = () => {
    void expenseId;
  };

  return (
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
        onClick={handleDelete}
        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-danger bg-danger/10 py-3 text-sm font-medium text-danger transition-colors hover:bg-danger/20"
      >
        <Trash2 size={16} />
        Delete
      </button>
    </div>
  );
}

export default ExpenseDetailActions;