"use client";

import { CATEGORIES } from "@/lib/config/categories";

interface CategoryFilterChipsProps {
  selected: string[];
  onToggle: (categoryId: string) => void;
}

function CategoryFilterChips({ selected, onToggle }: CategoryFilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.filter((category) => category.filterable).map((category) => {
        const isActive = selected.includes(category.id);

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onToggle(category.id)}
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-secondary text-foreground hover:bg-muted"
            }`}
          >
            <span aria-hidden>{category.emoji}</span>
            {category.label}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilterChips;