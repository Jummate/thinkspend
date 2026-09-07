"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { navItems, type NavItem } from "../_lib/nav-items";
import { ROUTES } from "@/lib/routes";

// Ceiling on how many destinations can show as direct tabs before we'd
// need a "More" overflow tab. Not built yet — there's no fifth
// destination to design that overflow UI around — but this check means
// adding one surfaces the decision immediately instead of the bar
// silently overcrowding.
const MAX_VISIBLE_MOBILE_TABS = 4;

if (navItems.length > MAX_VISIBLE_MOBILE_TABS) {
  console.warn(
    `MobileBottomNav: ${navItems.length} nav items exceeds the visible tab limit (${MAX_VISIBLE_MOBILE_TABS}). Design and build the "More" overflow tab before shipping this.`,
  );
}

function NavTab({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`flex flex-col items-center gap-1 py-2.5 text-xs transition-colors ${
        active ? "text-primary" : "text-muted-foreground"
      }`}
    >
      <Icon className="h-5 w-5" />
      {item.label}
    </Link>
  );
}

function MobileBottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const midpoint = Math.ceil(navItems.length / 2);
  const leftItems = navItems.slice(0, midpoint);
  const rightItems = navItems.slice(midpoint);

  return (
    // TODO: md is a placeholder pending confirmed breakpoint values —
    // this bar should only render below wherever Sidebar takes over.
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card md:hidden">
      <div className="relative grid grid-cols-5 items-center px-2">
        {leftItems.map((item) => (
          <NavTab
            key={item.href}
            item={item}
            active={isActive(item.href)}
          />
        ))}

        {/* Center spacer — reserves the FAB's horizontal slot in the grid
            flow; the FAB itself is absolutely positioned above it. */}
        <div />

        {rightItems.map((item) => (
          <NavTab
            key={item.href}
            item={item}
            active={isActive(item.href)}
          />
        ))}

        <Link
          href={ROUTES.EXPENSES_NEW}
          aria-label="Add expense"
          className="absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-opacity hover:opacity-90"
        >
          <Plus className="h-6 w-6" />
        </Link>
      </div>
    </nav>
  );
}

export default MobileBottomNav;
