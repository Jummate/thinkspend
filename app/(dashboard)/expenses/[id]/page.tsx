import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getExpense } from "@/lib/services/expense.service";
import { getCategoryConfig } from "@/lib/config/categories";
import { formatAmountToString } from "@/lib/utils/format-amount";
import { formatExpenseDate } from "@/lib/utils/date";
import { currencyMapping, type CurrencyCode } from "@/lib/config/currencies";
import { ROUTES } from "@/lib/routes";
import AddedTimestamp from "../_components/AddedTimestamp";
import ExpenseDetailActions from "../_components/ExpenseDetailActions";

interface ExpenseDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ExpenseDetailPage({
  params,
}: ExpenseDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const expense = await getExpense(supabase, id);

  if (!expense) notFound();

  const category = getCategoryConfig(expense.category);
  const Icon = category.icon;
  const currencySymbol =
    currencyMapping[expense.currency as CurrencyCode] ?? expense.currency;
  const reference = `TXN-${expense.id.slice(0, 5).toUpperCase()}`;

  return (
    <div className="flex flex-col gap-6 p-6">
      <Link
        href={ROUTES.EXPENSES}
        className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft size={16} />
        Back to Expenses
      </Link>

      <div className="max-w-xl">
        {/* Detail card — dashed border per the mockup */}
        <div className="rounded-2xl border border-dashed border-border bg-card p-6">
          {/* Icon + amount */}
          <div className="flex flex-col items-center gap-4 py-4">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-xl ${category.badgeClass}`}
            >
              <Icon size={24} />
            </div>
            <p className="text-4xl font-bold text-foreground">
              {currencySymbol}
              {formatAmountToString(expense.amount)}
            </p>
            <p className="text-sm text-muted-foreground">
              {expense.description || expense.category}
            </p>
          </div>

          {/* Meta rows */}
          <div className="mt-4 flex flex-col gap-3 border-t border-dashed border-border pt-6">
            <MetaRow label="Category" value={category.label} />
            <MetaRow label="Date" value={formatExpenseDate(expense.date)} />
            <MetaRow
              label="Added"
              value={<AddedTimestamp iso={expense.created_at} />}
            />
            <MetaRow label="Currency" value={expense.currency} />
            <MetaRow label="Reference" value={reference} />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4">
          <ExpenseDetailActions expense={expense} />
        </div>
      </div>
    </div>
  );
}

function MetaRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}