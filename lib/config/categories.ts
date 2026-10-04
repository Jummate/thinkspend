import type { LucideIcon } from "lucide-react";
import {
  Coffee,
  CarFront,
  ShoppingBasket,
  Zap,
  ShoppingBag,
  Package,
  Pill,
} from "lucide-react";

export interface CategoryConfig {
  id: string;
  value: string;
  label: string;
  emoji: string;
  icon: LucideIcon;

  badgeClass: string;
  chartColorVar: string;

  filterable: boolean;
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
    filterable: true,
  },
  {
    id: "Transport",
    value: "transport",
    label: "Transport",
    emoji: "🚗",
    icon: CarFront,
    badgeClass: "bg-category-transport/15 text-category-transport",
    chartColorVar: "var(--category-transport)",
    filterable: true,
  },
  {
    id: "Groceries",
    value: "groceries",
    label: "Groceries",
    emoji: "🛒",
    icon: ShoppingBasket,
    badgeClass: "bg-category-groceries/15 text-category-groceries",
    chartColorVar: "var(--category-groceries)",
    filterable: true,
  },
  {
    id: "Bills",
    value: "bills",
    label: "Bills",
    emoji: "⚡",
    icon: Zap,
    badgeClass: "bg-category-bills/15 text-category-bills",
    chartColorVar: "var(--category-bills)",
    filterable: true,
  },
  {
    id: "Shopping",
    value: "shopping",
    label: "Shopping",
    emoji: "🛍️",
    icon: ShoppingBag,
    badgeClass: "bg-category-shopping/15 text-category-shopping",
    chartColorVar: "var(--category-shopping)",
    filterable: true,
  },
  {
    id: "Other",
    value: "other",
    label: "Other",
    emoji: "📦",
    icon: Package,
    badgeClass: "bg-category-other/15 text-category-other",
    chartColorVar: "var(--category-other)",
    filterable: false,
  },
  {
    id: "Health",
    value: "health",
    label: "Health",
    emoji: "💊",
    icon: Pill,
    badgeClass: "bg-category-health/15 text-category-health",
    chartColorVar: "var(--category-health)",
    filterable: true,
  },
];

export const FALLBACK_CATEGORY: CategoryConfig = {
  id: "__unknown__",
  value: "other",
  label: "Other",
  emoji: "📦",
  icon: Package,
  badgeClass: "bg-muted text-muted-foreground",
  chartColorVar: "var(--muted-foreground)",
  filterable: false,
};

export function getCategoryConfig(categoryId: string): CategoryConfig {
  return CATEGORIES.find((c) => c.id === categoryId) ?? FALLBACK_CATEGORY;
}

export function getCategoryConfigByValue(value: string): CategoryConfig {
  return CATEGORIES.find((c) => c.value === value) ?? FALLBACK_CATEGORY;
}