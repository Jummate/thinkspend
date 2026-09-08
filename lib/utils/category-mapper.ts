import { CATEGORIES } from "@/lib/config/categories";

export function mapAICategoryToValue(aiCategory: string): string {
  return CATEGORIES.find((c) => c.id === aiCategory)?.value ?? "other";
}

export function mapValueToAICategory(value: string): string {
  return CATEGORIES.find((c) => c.value === value)?.id ?? "Other";
}