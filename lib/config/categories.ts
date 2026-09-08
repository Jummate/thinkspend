import type { LucideIcon } from "lucide-react";
import {
  Coffee,
  CarFront,
  ShoppingBasket,
  Zap,
  ShoppingBag,
  Package,
} from "lucide-react";

export interface CategoryConfig {
  /** Exact value stored in expenses.category — must match the DB string. */
  id: string;
  /** Lowercase slug used as the <select> value in manual-entry forms. */
  value: string;
  label: string;
  emoji: string;
  icon: LucideIcon;
  /**
   * Full, literal Tailwind class string for icon backgrounds/badges.
   * Written out completely (not interpolated) so Tailwind's compiler can
   * actually find and generate these classes.
   */
  badgeClass: string;
  /** CSS var reference for Recharts' `fill` prop (SVG, not a Tailwind class). */
  chartColorVar: string;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    id: "Food & Drinks",
    value: "food",
    label: "Food & Drinks",
    emoji: "🍔",
    icon: Coffee,
    badgeClass: "bg-category-food/15 text-category-food",
    chartColorVar: "var(--category-food)",
  },
  {
    id: "Transport",
    value: "transport",
    label: "Transport",
    emoji: "🚗",
    icon: CarFront,
    badgeClass: "bg-category-transport/15 text-category-transport",
    chartColorVar: "var(--category-transport)",
  },
  {
    id: "Groceries",
    value: "groceries",
    label: "Groceries",
    emoji: "🛒",
    icon: ShoppingBasket,
    badgeClass: "bg-category-groceries/15 text-category-groceries",
    chartColorVar: "var(--category-groceries)",
  },
  {
    id: "Bills",
    value: "bills",
    label: "Bills",
    emoji: "⚡",
    icon: Zap,
    badgeClass: "bg-category-bills/15 text-category-bills",
    chartColorVar: "var(--category-bills)",
  },
  {
    id: "Shopping",
    value: "shopping",
    label: "Shopping",
    emoji: "🛍️",
    icon: ShoppingBag,
    badgeClass: "bg-category-shopping/15 text-category-shopping",
    chartColorVar: "var(--category-shopping)",
  },
  {
    id: "Other",
    value: "other",
    label: "Other",
    emoji: "📦",
    icon: Package,
    badgeClass: "bg-category-other/15 text-category-other",
    chartColorVar: "var(--category-other)",
  },
];

/**
 * Deliberately NOT a themed category color — this represents unexpected
 * data (an unrecognized/corrupted category string), not a real category
 * the user chose, so it stays visually distinct using generic neutral
 * tokens rather than blending in as if it were legitimate.
 */
export const FALLBACK_CATEGORY: CategoryConfig = {
  id: "__unknown__",
  value: "other",
  label: "Other",
  emoji: "📦",
  icon: Package,
  badgeClass: "bg-muted text-muted-foreground",
  chartColorVar: "var(--muted-foreground)",
};

export function getCategoryConfig(categoryId: string): CategoryConfig {
  return CATEGORIES.find((c) => c.id === categoryId) ?? FALLBACK_CATEGORY;
}

export function getCategoryConfigByValue(value: string): CategoryConfig {
  return CATEGORIES.find((c) => c.value === value) ?? FALLBACK_CATEGORY;
}