

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import AppLogo from "@/components/AppLogo";
import ProfileMenu from "./ProfileMenu";
import { navItems } from "../_lib/nav-items";

const Sidebar = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    // TODO: md/lg are placeholders pending confirmed breakpoint values.
    // md = icon-only tablet rail, lg = full sidebar with labels. Hidden
    // entirely below md — mobile uses a separate bottom nav instead.
    <aside className="sticky top-0 hidden h-screen w-20 shrink-0 flex-col border-r border-border bg-card md:flex lg:w-64">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-border p-6">
        <AppLogo />
        <span className="hidden text-lg font-bold text-foreground lg:inline">
          ThinkSpend
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1 text-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
                     <li key={item.href} className="relative">
                {active && (
                  <span className="absolute -left-4 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                )}
                <Link
                  href={item.href}
                  title={item.label}
                  className={`flex items-center justify-center gap-3 rounded-lg px-4 py-3 transition-colors lg:justify-start ${
                    active
                      ? "bg-primary/15 font-semibold text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon
                    size={20}
                    className="shrink-0"
                  />
                  <span className="hidden lg:inline">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Profile / account menu */}
      <div className="border-t border-border p-3">
        <ProfileMenu menuAlign="up" />
      </div>
    </aside>
  );
};

export default Sidebar;
