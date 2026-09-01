// import React from "react";

// const ExpensesPage = () => {
//   return <div>This is expenses page.</div>;
// };

// export default ExpensesPage;




"use client";

import { Trash2, ChevronDown, Filter } from "lucide-react";
import React, { useState, useMemo } from "react";
import { useUser } from "@/lib/hooks/useUser";

import { Expense } from "@/lib/types/expense";
import { useExpenses } from "@/lib/hooks/useExpenses";

const ExpensesPage = () => {
  // const [expenses, setExpenses] = useState<Expense[]>([
  //   {
  //     id: "1",
  //     amount: 5.0,
  //     currency: "USD",
  //     category: "Food & Drinks",
  //     description: "Coffee at Starbucks",
  //     date: "2025-01-09",
  //     icon: "☕",
  //     color: "bg-orange-500",
  //   },
  //   {
  //     id: "2",
  //     amount: 12.0,
  //     currency: "USD",
  //     category: "Transport",
  //     description: "Uber to office",
  //     date: "2025-01-09",
  //     icon: "🚗",
  //     color: "bg-red-500",
  //   },
  //   {
  //     id: "3",
  //     amount: 84.5,
  //     currency: "NGN",
  //     category: "Groceries",
  //     description: "Weekly groceries",
  //     date: "2025-01-08",
  //     icon: "🛒",
  //     color: "bg-green-500",
  //   },
  //   {
  //     id: "4",
  //     amount: 142.1,
  //     currency: "USD",
  //     category: "Bills",
  //     description: "Electric Bill",
  //     date: "2025-01-07",
  //     icon: "⚡",
  //     color: "bg-purple-500",
  //   },
  //   {
  //     id: "5",
  //     amount: 299.0,
  //     currency: "USD",
  //     category: "Shopping",
  //     description: "New Headphones",
  //     date: "2025-01-06",
  //     icon: "🎧",
  //     color: "bg-blue-500",
  //   },
  //   {
  //     id: "6",
  //     amount: 45.0,
  //     currency: "USD",
  //     category: "Food & Drinks",
  //     description: "Dinner with friends",
  //     date: "2025-01-06",
  //     icon: "🍽️",
  //     color: "bg-orange-500",
  //   },
  // ]);
const { profile, user } = useUser();

console.log("user id", user?.id);
  const { expenses: fetchedExpenses } = useExpenses(user?.id)
  console.log("fetched expenses 2", fetchedExpenses);
  const [expenses, setExpenses] = useState<Expense[]>(fetchedExpenses ?? []);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const categories = [
    "all",
    "Food & Drinks",
    "Transport",
    "Groceries",
    "Bills",
    "Shopping",
    "Other",
  ];

  // Group expenses by date
  const groupedExpenses = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const filtered =
      selectedCategory === "all"
        ? expenses
        : expenses.filter((e) => e.category === selectedCategory);

    const grouped: { [key: string]: Expense[] } = {};

    filtered.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      expenseDate.setHours(0, 0, 0, 0);

      let label: string;

      if (expenseDate.getTime() === today.getTime()) {
        label = "Today";
      } else if (expenseDate.getTime() === yesterday.getTime()) {
        label = "Yesterday";
      } else {
        label = expenseDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: expenseDate.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
        });
      }

      if (!grouped[label]) {
        grouped[label] = [];
      }
      grouped[label].push(expense);
    });

    // Sort groups by date
    const sorted = Object.entries(grouped).sort((a, b) => {
      const dateA = new Date(grouped[a[0]][0].date);
      const dateB = new Date(grouped[b[0]][0].date);
      return dateB.getTime() - dateA.getTime();
    });

    return Object.fromEntries(sorted);
  }, [expenses, selectedCategory]);

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
    setDeleteConfirm(null);
  };

  const totalExpenses = fetchedExpenses.reduce((sum, e) => sum + e.amount, 0);
  const filteredTotal = Object.values(groupedExpenses)
    .flat()
    .reduce((sum, e) => sum + e.amount, 0);

  const isEmpty = Object.keys(groupedExpenses).length === 0;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Expenses</h1>
        <p className="text-gray-400">
          Manage and track all your expenses in one place.
        </p>
      </div>

      {/* Filter Section */}
      <div className="bg-[#1e293b] rounded-2xl p-6 border border-gray-700 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} />
          <h2 className="text-lg font-semibold">Filter</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2.5 text-white appearance-none cursor-pointer hover:border-gray-500 focus:border-blue-500 focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={18}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-end gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Expenses</p>
              <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {isEmpty ? (
        <div className="bg-[#1e293b] rounded-2xl p-12 border border-gray-700 text-center">
          <div className="text-gray-400 mb-4">
            <Filter size={48} className="mx-auto opacity-50 mb-4" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No expenses found</h3>
          <p className="text-gray-400">
            {selectedCategory !== "all"
              ? `No expenses in "${selectedCategory}" category.`
              : "Start adding expenses to see them here."}
          </p>
        </div>
      ) : (
        /* Expenses List */
        <div className="space-y-6">
          {Object.entries(groupedExpenses).map(([dateLabel, dateExpenses]) => (
            <div key={dateLabel}>
              {/* Date Header */}
              <h3 className="text-lg font-semibold text-gray-300 mb-3 px-2">
                {dateLabel}
              </h3>

              {/* Expenses in this date */}
              <div className="space-y-2">
                {dateExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="bg-[#1e293b] rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all flex items-center gap-4 group"
                  >
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 ${expense.color} rounded-lg flex items-center justify-center text-xl shrink-0`}
                    >
                      {expense.icon}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white truncate">
                        {expense.description}
                      </p>
                      <p className="text-sm text-gray-400">{expense.category}</p>
                    </div>

                    {/* Amount */}
                    <div className="text-right shrink-0">
                      <p className="font-bold text-lg">
                        {expense.currency === "NGN" ? "₦" : "$"}
                        {expense.amount.toFixed(2)}
                      </p>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => setDeleteConfirm(expense.id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      title="Delete expense"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1e293b] rounded-xl border border-gray-700 p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold mb-2">Delete Expense?</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete this expense? This action cannot be
              undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-all font-medium text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesPage;
