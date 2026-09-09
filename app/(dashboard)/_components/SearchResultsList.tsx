import Link from "next/link";
import type { ReactNode } from "react";
import { Search as SearchIcon } from "lucide-react";
import { formatAmountToString } from "@/lib/utils/format-amount";
import { getCategoryConfig } from "@/lib/config/categories";
import { ROUTES } from "@/lib/routes";
import type { RecentExpense } from "@/lib/services/dashboard.service";
import type { SearchShortcut } from "../_lib/search-shortcuts";
import { SearchStatus } from "../_lib/useSearch";

interface SearchResultsListProps {
  status: SearchStatus;
  query: string;
  expenseResults: RecentExpense[];
  shortcutResults: SearchShortcut[];
  currencySymbol: string;
  onSelect?: () => void;
}

// Highlights every case-insensitive occurrence of `query` inside `text` —
// matches how the underlying search is actually performed (plain
// substring matching, both for shortcuts and the .ilike() expense query),
// so the highlighting stays honest about what actually matched.
function highlightMatch(text: string, query: string): ReactNode {
  const trimmed = query.trim();
  if (!trimmed) return text;

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));

  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="bg-transparent font-bold text-primary">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="px-4 pb-2 pt-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
      {children}
    </p>
  );
}

function ShortcutRow({
  shortcut,
  query,
  onSelect,
}: {
  shortcut: SearchShortcut;
  query: string;
  onSelect?: () => void;
}) {
  const Icon = shortcut.icon;

  return (
    <Link
      href={shortcut.href}
      onClick={onSelect}
      className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-secondary"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon size={16} />
      </span>
      <span className="font-semibold text-foreground">
        {highlightMatch(shortcut.label, query)}
      </span>
    </Link>
  );
}

function ExpenseRow({
  expense,
  query,
  currencySymbol,
  onSelect,
}: {
  expense: RecentExpense;
  query: string;
  currencySymbol: string;
  onSelect?: () => void;
}) {
  const category = getCategoryConfig(expense.category);
  const Icon = category.icon;
  const label = expense.description || expense.category;

  return (
    // NOTE: assuming a clicked expense should open it for editing —
    // unconfirmed, easy to redirect to a detail view instead if that's
    // the intended destination.
    <Link
      href={ROUTES.EXPENSES_EDIT(expense.id)}
      onClick={onSelect}
      className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-secondary"
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${category.badgeClass}`}
      >
        <Icon size={16} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-foreground">
          {highlightMatch(label, query)}
        </span>
        {/* Shown so a match against category (not description) is
            visible, instead of looking like an unexplained result. */}
        <span className="block text-xs text-muted-foreground">
          {highlightMatch(category.label, query)}
        </span>
      </span>
      <span className="shrink-0 text-muted-foreground">
        {currencySymbol}
        {formatAmountToString(expense.amount)}
      </span>
    </Link>
  );
}

function SearchResultsList({
  status,
  query,
  expenseResults,
  shortcutResults,
  currencySymbol,
  onSelect,
}: SearchResultsListProps) {
  if (status === "loading") {
    return (
      <div className="p-6 text-center text-sm text-muted-foreground">
        Searching…
      </div>
    );
  }

  if (status === "empty") {
    return (
      <div className="flex flex-col items-center gap-2 p-8 text-center">
        <SearchIcon className="h-6 w-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          No results for &ldquo;{query}&rdquo;
        </p>
      </div>
    );
  }

  const isIdle = status === "idle";

  return (
    <div className="flex flex-col">
      {isIdle ? (
        <>
          {(expenseResults.length > 0 || shortcutResults.length > 0) && (
            <SectionLabel>Try searching</SectionLabel>
          )}
          {expenseResults.map((expense) => (
            <ExpenseRow
              key={expense.id}
              expense={expense}
              query={query}
              currencySymbol={currencySymbol}
              onSelect={onSelect}
            />
          ))}
          {shortcutResults.map((shortcut) => (
            <ShortcutRow
              key={shortcut.href}
              shortcut={shortcut}
              query={query}
              onSelect={onSelect}
            />
          ))}
        </>
      ) : (
        <>
          {shortcutResults.length > 0 && (
            <>
              <SectionLabel>Pages</SectionLabel>
              {shortcutResults.map((shortcut) => (
                <ShortcutRow
                  key={shortcut.href}
                  shortcut={shortcut}
                  query={query}
                  onSelect={onSelect}
                />
              ))}
            </>
          )}
          {expenseResults.length > 0 && (
            <>
              <SectionLabel>Expenses</SectionLabel>
              {expenseResults.map((expense) => (
                <ExpenseRow
                  key={expense.id}
                  expense={expense}
                  query={query}
                  currencySymbol={currencySymbol}
                  onSelect={onSelect}
                />
              ))}
            </>
          )}
        </>
      )}

      <div className="border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
        Press{" "}
        <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 font-mono">
          Esc
        </kbd>{" "}
        to close
      </div>
    </div>
  );
}

export default SearchResultsList;