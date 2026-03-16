// Maps expense category strings (as stored in DB) to display metadata.
// Icon names correspond to lucide-react icon component names.

export interface CategoryMeta {
  iconName: string;
  colorClass: string; // Tailwind bg + text classes
  color: string;      // hex for chart bars
  label: string;      // display label
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  "Food & Drinks": {
    iconName: "Coffee",
    colorClass: "bg-orange-100 text-orange-500",
    color: "#f97316",
    label: "Food & Drinks",
  },
  Transport: {
    iconName: "CarFront",
    colorClass: "bg-red-100 text-red-500",
    color: "#ef4444",
    label: "Transport",
  },
  Groceries: {
    iconName: "ShoppingBasket",
    colorClass: "bg-green-100 text-green-500",
    color: "#22c55e",
    label: "Groceries",
  },
  Bills: {
    iconName: "Zap",
    colorClass: "bg-purple-100 text-purple-500",
    color: "#10b981",
    label: "Bills",
  },
  Shopping: {
    iconName: "ShoppingBag",
    colorClass: "bg-blue-100 text-blue-500",
    color: "#3b82f6",
    label: "Shopping",
  },
  Other: {
    iconName: "Package",
    colorClass: "bg-gray-100 text-gray-500",
    color: "#94a3b8",
    label: "Other",
  },
};

const FALLBACK: CategoryMeta = {
  iconName: "Package",
  colorClass: "bg-gray-100 text-gray-500",
  color: "#94a3b8",
  label: "Other",
};

export function getCategoryMeta(category: string): CategoryMeta {
  return CATEGORY_META[category] ?? FALLBACK;
}

// All known categories with their chart colors — used to seed the bar chart
// with zero values for categories that have no spending this month
export const ALL_CHART_CATEGORIES: Array<{ category: string; color: string }> =
  Object.entries(CATEGORY_META).map(([category, meta]) => ({
    category,
    color: meta.color,
  }));