import React from "react";
import type { LucideIcon } from "lucide-react";
import Container from "@/app/components/layout/Container";
import {
  Sparkles,
  ArrowLeftRight,
  Target,
  TrendingUp,
  Search,
  ShieldCheck,
} from "lucide-react";

type Feature = {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Sparkles,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    title: "AI expense parsing",
    description:
      'Type "Lunch ₦1000" and get amount, category, and description filled in automatically. Edit anything before saving.',
  },
  {
    icon: ArrowLeftRight,
    iconBg: "bg-category-bills/10",
    iconColor: "text-category-bills",
    title: "Multi-currency support",
    description:
      "Track in Naira, Dollars, Euros, or Pounds. Set your default currency once — it follows you across the app.",
  },
  {
    icon: Target,
    iconBg: "bg-category-food/10",
    iconColor: "text-category-food",
    title: "Monthly budgets",
    description:
      "Set a spending limit for the month and watch how close you're getting, category by category, in real time.",
  },
  {
    icon: TrendingUp,
    iconBg: "bg-category-other/10",
    iconColor: "text-category-other",
    title: "Spending analytics",
    description:
      "See exactly where money goes by category and by week, without digging through a spreadsheet to find out.",
  },
  {
    icon: Search,
    iconBg: "bg-category-transport/10",
    iconColor: "text-category-transport",
    title: "Fast search & filters",
    description:
      "Find any transaction by name, category, date, or amount in seconds — across weeks or months of history.",
  },
  {
    icon: ShieldCheck,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    title: "Private by default",
    description:
      "Your spending data is yours — each account only sees its own expenses. Nothing shared, nothing sold.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="py-20"
    >
      <Container>
        <div className="mx-auto mb-12 max-w-xl text-center">
          <div className="text-xs font-extrabold uppercase tracking-wider text-primary">
            Features
          </div>
          <h2 className="mt-2.5 text-3xl font-extrabold tracking-tight text-foreground">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            A focused set of tools built around one habit: logging an expense
            the moment it happens.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative overflow-hidden rounded-2xl border border-border bg-card p-7"
            >
              <div
                className="absolute left-0 right-0 top-0 h-0.75"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, var(--border) 0 8px, transparent 8px 14px)",
                }}
              />
              <div
                className={`mb-4.5 flex h-11 w-11 items-center justify-center rounded-xl ${feature.iconBg}`}
              >
                <feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
              </div>
              <h3 className="mb-2 text-[16.5px] font-extrabold text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Features;
