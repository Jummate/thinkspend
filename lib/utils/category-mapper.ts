// lib/utils/category-mapper.ts

export const AI_CATEGORY_TO_VALUE: Record<string, string> = {
  "Food & Drinks": "food",
  Transport: "transport",
  Groceries: "groceries",
  Bills: "bills",
  Shopping: "shopping",
  Other: "other",
};

export const VALUE_TO_AI_CATEGORY: Record<string, string> = {
  food: "Food & Drinks",
  transport: "Transport",
  groceries: "Groceries",
  bills: "Bills",
  shopping: "Shopping",
  other: "Other",
};

export function mapAICategoryToValue(aiCategory: string): string {
  return AI_CATEGORY_TO_VALUE[aiCategory] || "other";
}

export function mapValueToAICategory(value: string): string {
  return VALUE_TO_AI_CATEGORY[value] || "Other";
}
