"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "@/lib/hooks/useUser";
import {
  getRecentExpenses,
  type RecentExpense,
} from "@/lib/services/dashboard.service";
import { matchShortcuts, type SearchShortcut } from "./search-shortcuts";
import { searchExpenses } from "@/lib/services/search.service";

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
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [expenseResults, setExpenseResults] = useState<RecentExpense[]>([]);
  const [recentExpenses, setRecentExpenses] = useState<RecentExpense[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce the query before it triggers a network request.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query]);

  // Preload recent expenses once, for the empty-query "Try searching" state.
  useEffect(() => {
    if (!user) return;
    getRecentExpenses(supabase, user.id)
      .then(setRecentExpenses)
      .catch((err) =>
        console.error("Failed to load recent expenses for search:", err),
      );
  }, [user]);

  useEffect(() => {
    if (!user || !debouncedQuery.trim()) {
      setExpenseResults([]);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    searchExpenses(supabase, user.id, debouncedQuery)
      .then((results) => {
        if (!cancelled) setExpenseResults(results);
      })
      .catch((err) => {
        console.error("Search failed:", err);
        if (!cancelled) setExpenseResults([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, user]);

  const shortcutResults = matchShortcuts(query);
  const hasQuery = query.trim().length > 0;
  const isDebouncePending = query !== debouncedQuery;

  let status: SearchStatus;
  if (!hasQuery) {
    status = "idle";
  } else if (isLoading || isDebouncePending) {
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
    expenseResults: hasQuery ? expenseResults : recentExpenses,
    shortcutResults,
    clear: () => setQuery(""),
  };
}