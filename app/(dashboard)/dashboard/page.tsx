"use client";

import { ROUTES } from "@/lib/routes";
import {
  ArrowDown,
  ArrowUp,
  CarFront,
  Coffee,
  CreditCard,
  Headphones,
  Lightbulb,
  ScanLine,
  ShoppingBasket,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Dashboard = () => {
  const [chartView, setChartView] = useState<"weekly" | "monthly">("monthly");

  const user = {
    id: Date.now(),
    fullName: "Lorem Ipsum",
    firstName: "Lorem",
    lastName: "Ipsum",
    preferredCurrency: "₦",
  };

  // Mock data - replace with actual data from your API/state
  const stats = {
    totalSpending: 1247.5,
    spendingChange: -12, // negative = decrease, positive = increase
    monthlyBudget: 2000.0,
    budgetUsed: 62.4, // percentage
    aiSavings: 214.2,
  };

  const categorySpending = [
    { category: "Food", amount: 520, color: "#3b82f6" },
    { category: "Transport", amount: 260, color: "#ef4444" },
    { category: "Shopping", amount: 247, color: "#f59e0b" },
    { category: "Bills", amount: 720, color: "#10b981" },
    { category: "Health", amount: 0, color: "#8b5cf6" },
    { category: "Travel", amount: 0, color: "#ec4899" },
  ];

  const recentExpenses = [
    {
      id: 1,
      icon: <Coffee />,
      title: "Coffee at Sta...",
      category: "Food & Drinks",
      date: "Today, 9:30 AM",
      amount: 5.0,
      color: "bg-orange-100 text-orange-500",
    },
    {
      id: 2,
      icon: <CarFront />,
      title: "Uber to office",
      category: "Transport",
      date: "Today, 8:45 AM",
      amount: 12.0,
      color: "bg-red-100 text-red-500",
    },
    {
      id: 3,
      icon: <ShoppingBasket />,
      title: "Groceries a...",
      category: "Groceries",
      date: "Yesterday",
      amount: 84.5,
      color: "bg-green-100 text-green-500",
    },
    {
      id: 4,
      icon: <Zap />,
      title: "Electric Bill",
      category: "Bills",
      date: "Jan 4, Jan-02 20:25",
      amount: 142.1,
      color: "bg-purple-100 text-purple-500",
    },
    {
      id: 5,
      icon: <Headphones />,
      title: "New Head...",
      category: "Shopping",
      date: "01-2025",
      amount: 299.0,
      color: "bg-blue-100 text-blue-500",
    },
  ];

  return (
    // <div className="min-h-screen bg-[#0f172a] text-white p-6">
    <div className="min-h-screen p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-500">
          Welcome back, {user.firstName}. Here's a summary of your financial
          health.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Spending Card */}

        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 font-bold text-sm uppercase tracking-wide">
              Total Spending (Jan)
            </p>
            <div className="bg-blue-100 p-2 rounded-lg">
              <CreditCard
                size={20}
                className="text-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-4xl font-bold mb-1">
              ${stats.totalSpending.toFixed(2)}
            </h2>
            <div className="flex items-center gap-1 text-green-500">
              <TrendingDown size={16} />
              <span className="text-sm font-semibold">
                {Math.abs(stats.spendingChange)}% from last month
              </span>
            </div>
          </div>
        </div>

        {/* Monthly Budget Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 font-bold text-sm uppercase tracking-wide">
              Monthly Budget
            </p>
            <div className="bg-purple-100 p-2 rounded-lg">
              <TrendingUp
                size={20}
                className="text-purple-500"
              />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-3">
            {user.preferredCurrency}{stats.monthlyBudget.toFixed(2)}
          </h2>
          <div className="w-full bg-muted-foreground/30 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${stats.budgetUsed}%` }}
            ></div>
          </div>
        </div>

        {/* AI Savings Insight Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 font-bold text-sm uppercase tracking-wide">
              AI Savings Insight
            </p>
            <div className="bg-yellow-100 p-2 rounded-lg">
              {" "}
              <Lightbulb
                size={20}
                className="text-yellow-500"
              />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-1">
            {user.preferredCurrency}{stats.aiSavings.toFixed(2)}
          </h2>
          <p className="text-amber-500 text-sm">Potential monthly savings</p>
        </div>
      </div>

      {/* Charts and Recent Expenses Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending by Category Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Spending by Category</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setChartView("weekly")}
                className={`px-4 py-1.5 rounded-lg text-sm transition-all ${
                  chartView === "weekly"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:text-white hover:bg-primary"
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setChartView("monthly")}
                className={`px-4 py-1.5 rounded-lg text-sm transition-all ${
                  chartView === "monthly"
                    ? "bg-primary text-white"
                    : "text-gray-400 hover:text-white hover:bg-primary  "
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="flex items-end justify-between h-64 gap-4 mb-4">
            {categorySpending.map((item) => {
              const maxAmount = Math.max(
                ...categorySpending.map((c) => c.amount),
              );
              const height = (item.amount / maxAmount) * 100;

              return (
                <div
                  key={item.category}
                  className="flex-1 flex flex-col items-center"
                >
                  <div className="w-full flex items-end justify-center h-full">
                    <div
                      className="w-full rounded-t-lg transition-all hover:opacity-80"
                      style={{
                        height: `${height}%`,
                        backgroundColor: item.color,
                        minHeight: item.amount > 0 ? "20px" : "0px",
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-3 uppercase">
                    {item.category}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
            {categorySpending
              .filter((item) => item.amount > 0)
              .map((item) => (
                <div
                  key={item.category}
                  className="flex items-center gap-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-muted-foreground">
                    <b>{item.category}:</b> {user.preferredCurrency}{item.amount}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Recent Expenses</h3>
            {/* <button className="text-blue-400 text-sm hover:underline">
              View All
            </button> */}

            <Link
              href={ROUTES.EXPENSES}
              className="text-primary text-sm hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {recentExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center gap-3 hover:opacity-70 p-2 rounded-lg transition-all cursor-pointer"
              >
                <div
                  className={`w-10 h-10 ${expense.color} rounded-lg flex items-center justify-center text-xl`}
                >
                  {expense.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">
                    {expense.title}
                  </p>
                  <p className="text-xs text-gray-400">{expense.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{user.preferredCurrency}{expense.amount.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Receipt Scan Button */}
          <button className="w-full mt-6 bg-white hover:bg-gray-200 border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-2 transition-all">
            <ScanLine size={18} />
            <span className="font-semibold">Add Receipt Scan</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
