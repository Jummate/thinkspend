import type { LucideIcon } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { navItems } from "./nav-items";

export interface SearchShortcut {
  href: string;
  label: string;
  icon: LucideIcon;
}

// Extra search-only terms per destination, keyed by href — kept separate
// from navItems itself since these are a search concern, not a nav
// concern, and navItems shouldn't need to know search exists.
const SHORTCUT_KEYWORDS: Record<string, string[]> = {
  [ROUTES.SETTINGS]: ["profile", "budget", "currency", "password"],
};

export const SEARCH_SHORTCUTS: SearchShortcut[] = navItems.map((item) => ({
  href: item.href,
  label: item.label,
  icon: item.icon,
}));

export function matchShortcuts(query: string): SearchShortcut[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return SEARCH_SHORTCUTS;

  return SEARCH_SHORTCUTS.filter((shortcut) => {
    const keywords = SHORTCUT_KEYWORDS[shortcut.href] ?? [];
    const haystack = [shortcut.label, ...keywords].join(" ").toLowerCase();
    return haystack.includes(normalized);
  });
}