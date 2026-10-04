import type { LucideIcon } from "lucide-react";
import { BarChart3, LayoutDashboard, Receipt, Settings } from "lucide-react";
import { ROUTES } from "@/lib/routes";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// Shared by Sidebar (desktop/tablet) and MobileBottomNav so the two
// surfaces can never drift out of sync again — this is what the earlier
// Home/Dashboard, Insights/Analytics label mismatch would have been
// caught by immediately, had it existed at the time.
//
// NOTE: Analytics has no page yet ((dashboard)/analytics doesn't exist
// in the folder tree) — this link currently 404s, pending a decision on
// whether Analytics is in scope yet.
export const navItems: NavItem[] = [
  { href: ROUTES.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
  { href: ROUTES.EXPENSES, label: "Expenses", icon: Receipt },
  { href: ROUTES.ANALYTICS, label: "Analytics", icon: BarChart3 },
  { href: ROUTES.SETTINGS, label: "Settings", icon: Settings },
];