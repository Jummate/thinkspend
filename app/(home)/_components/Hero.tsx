import React from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import Container from "@/lib/shared/components/layout/Container";
import Link from "next/link";

const expenses = [
  {
    icon: "🛒",
    iconBg: "bg-category-groceries/10",
    name: "Bought groceries",
    category: "Groceries",
    amount: "₦15,500",
  },
  {
    icon: "🚗",
    iconBg: "bg-category-food/10",
    name: "Uber to work",
    category: "Transport",
    amount: "₦3,200",
  },
  {
    icon: "🍔",
    iconBg: "bg-category-bills/10",
    name: "Coffee at Starbucks",
    category: "Food & Drinks",
    amount: "₦4,500",
  },
];

function Hero() {
  return (
    <header className="overflow-hidden py-16 sm:py-20 lg:py-24">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-14">
        {/* Left: copy */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-extrabold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            AI-powered expense parsing
          </div>

          <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight text-foreground sm:text-5xl">
            Type what you spent.
            <br />
            Let <span className="text-primary">ThinkSpend</span> do the rest.
          </h1>

          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted-foreground">
            No forms, no dropdowns to fight with. Just describe an expense in
            plain words — &quot;Uber ₦12000&quot; — and it&apos;s categorized,
            dated, and logged. Track spending across multiple currencies without
            the busywork.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 text-[15px] font-extrabold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get started free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#how-it-works"
              className="rounded-xl border-[1.5px] border-border px-6 py-3.5 text-[15px] font-extrabold text-foreground transition-colors hover:bg-secondary"
            >
              See how it works
            </Link>
          </div>

          <p className="mt-4 text-[12.5px] text-muted-foreground/80">
            Free to use · No credit card required
          </p>
        </div>

        {/* Right: receipt visual */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="relative rotate-[1.5deg] rounded-[18px] border border-border bg-card p-6.5 shadow-2xl shadow-black/5">
            {/* torn top edge */}
            <div
              className="absolute left-4 right-4 top-0 h-0.75"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, var(--border) 0 8px, transparent 8px 14px)",
              }}
            />

            <div className="flex items-center justify-between border-b border-dashed border-border pb-4">
              <div className="text-sm font-extrabold text-card-foreground">
                Today&apos;s expenses
              </div>
              <div className="font-mono text-[11px] text-muted-foreground">
                Aug 27, 2026
              </div>
            </div>

            {expenses.map((expense, index) => (
              <div
                key={expense.name}
                className={`flex items-center gap-3 py-3.25 ${
                  index !== expenses.length - 1
                    ? "border-b border-dashed border-border"
                    : ""
                }`}
              >
                <span
                  className={`flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-[9px] text-[15px] ${expense.iconBg}`}
                >
                  {expense.icon}
                </span>
                <div className="flex-1">
                  <div className="text-[13px] font-bold text-card-foreground">
                    {expense.name}
                  </div>
                  <div className="text-[10.5px] text-muted-foreground">
                    {expense.category}
                  </div>
                </div>
                <div className="font-mono text-[13.5px] font-semibold text-card-foreground">
                  {expense.amount}
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between pt-4">
              <div className="text-xs font-bold uppercase tracking-[0.06em] text-muted-foreground">
                Total today
              </div>
              <div className="font-mono text-[22px] font-bold text-card-foreground">
                ₦23,200
              </div>
            </div>
          </div>

          {/* Floating chip: parsed time */}
          <div className="absolute -right-6 -top-3.5 flex rotate-[-4deg] items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs font-bold text-primary shadow-lg">
            <Check className="h-3.5 w-3.5" />
            Parsed in 0.4s
          </div>

          {/* Floating chip: currencies */}
          <div className="absolute -left-7 bottom-5 rotate-3 rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs font-bold text-category-bills shadow-lg">
            ₦ · $ · € · £ supported
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Hero;
