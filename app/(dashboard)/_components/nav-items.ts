import {
  BarChart3,
  LayoutDashboard,
  Receipt,
  Settings,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";

// NOTE: Analytics has no page yet ((dashboard)/analytics doesn't exist in
// the folder tree) — this link currently 404s. Left in per earlier
// discussion pending a decision on whether Analytics is in scope yet.
export const navItems = [
  { href: ROUTES.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
  { href: ROUTES.EXPENSES, label: "Expenses", icon: Receipt },
  { href: ROUTES.ANALYTICS, label: "Analytics", icon: BarChart3 },
  { href: ROUTES.SETTINGS, label: "Settings", icon: Settings },
];