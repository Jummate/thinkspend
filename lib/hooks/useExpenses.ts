"use client";

import { useEffect, useState, useCallback } from "react";

import { Expense } from "../types/expense";
import { getExpenses } from "../services/expense.service";



export interface UseExpensesReturn {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useExpenses(userId: string | undefined): UseExpensesReturn {
 
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

 

    try {
      const fetchedExpenses = await getExpenses(userId);

      console.log("Fetched expenses:", fetchedExpenses);

      setExpenses(fetchedExpenses);
    } catch (err) {
      console.error("Expenses fetch error:", err);
      setError("Failed to fetch expenses. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    expenses,
    loading,
    error,
    refetch: fetchAll,
  };
}