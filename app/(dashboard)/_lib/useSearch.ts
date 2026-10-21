"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "@/lib/hooks/useUser";
import { useDebounce } from "@/lib/hooks/useDebounce";
import {
  getRecentExpenses,
  type RecentExpense,
} from "@/lib/services/dashboard.service";
import { searchExpenses } from "@/lib/services/search.service";
import { matchShortcuts, type SearchShortcut } from "./search-shortcuts";

export type SearchStatus = "idle" | "loading" | "results" | "empty";

export interface UseSearchReturn {
  query: string;
  setQuery: (value: string) => void;
  status: SearchStatus;
  expenseResults: RecentExpense[];
  shortcutResults: SearchShortcut[];
  clear: () => void;
}

const DEBOUNCE_MS = 300;

export function useSearch(): UseSearchReturn {
  const { user } = useUser();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, DEBOUNCE_MS);

  // Preload recent expenses once for the empty-query "Try searching"
  // state. staleTime: Infinity means it never refetches — this is
  // seed content, not fresh data.
  const recentQuery = useQuery<RecentExpense[]>({
    queryKey: ["expenses", "recent", user?.id],
    queryFn: () => getRecentExpenses(supabase, user!.id),
    enabled: !!user,
    staleTime: Infinity,
  });

  // Search results — keyed on the debounced query so typing doesn't
  // trigger fetches, only the paused value does. Disabled when the
  // query is empty, so it never fires on mount or after clear().
  const searchQuery = useQuery<RecentExpense[]>({
    queryKey: ["search", "expenses", user?.id, debouncedQuery],
    queryFn: () => searchExpenses(supabase, user!.id, debouncedQuery),
    enabled: !!user && !!debouncedQuery.trim(),
  });

  const shortcutResults = matchShortcuts(query);
  const hasQuery = query.trim().length > 0;
  const isDebouncePending = query !== debouncedQuery;

  // The status machine is preserved from the previous implementation.
  // React-query's isLoading only becomes true once the fetch starts —
  // which is after the debounce. The isDebouncePending check covers the
  // gap between typing and the fetch beginning.
  //
  // Error handling matches the previous behavior: a failed search
  // produces an empty result set, showing "No results" rather than an
  // error state. Changing that is a separate improvement.
  const expenseResults = searchQuery.data ?? [];

  let status: SearchStatus;
  if (!hasQuery) {
    status = "idle";
  } else if (searchQuery.isLoading || isDebouncePending) {
    status = "loading";
  } else if (expenseResults.length === 0 && shortcutResults.length === 0) {
    status = "empty";
  } else {
    status = "results";
  }

  return {
    query,
    setQuery,
    status,
    expenseResults: hasQuery ? expenseResults : (recentQuery.data ?? []),
    shortcutResults,
    clear: () => setQuery(""),
  };
}