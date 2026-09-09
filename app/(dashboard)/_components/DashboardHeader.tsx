"use client";

import Link from "next/link";
import { useState } from "react";
import DesktopSearch from "./DesktopSearch";
import MobileSearchOverlay from "./MobileSearchOverlay";
import { Bell, Search } from "lucide-react";
import Button from "@/components/ui/Button";
import ProfileMenu from "./ProfileMenu";
import { ROUTES } from "@/lib/routes";

const DashboardHeader = () => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  return (
    <>
      {/* Tablet & desktop header */}
      <div className="sticky top-0 z-30 hidden w-full items-center justify-between border-b border-border bg-card p-4 md:flex">
          <DesktopSearch />

        <div className="flex items-center justify-center gap-4">
          <button type="button" aria-label="Notifications">
            <Bell className="cursor-pointer text-foreground" size={18} />
          </button>
          <Link href={ROUTES.EXPENSES_NEW}>
            <Button styles="p-2 px-6 text-sm font-bold">+ Add Expense</Button>
          </Link>
        </div>
      </div>

      {/* Mobile header — no Add Expense here, the bottom-nav FAB covers
          it; ProfileMenu appears here since Sidebar (which normally
          hosts it) doesn't render on mobile at all. */}
      {isMobileSearchOpen ? (
        <MobileSearchOverlay onClose={() => setIsMobileSearchOpen(false)} />
      ) : (
        <div className="flex w-full items-center justify-between border-b border-border bg-card p-4 md:hidden">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setIsMobileSearchOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground"
          >
            <Search size={18} />
          </button>

          <div className="flex items-center gap-3">
            <button type="button" aria-label="Notifications">
              <Bell size={20} className="cursor-pointer text-foreground" />
            </button>
            <ProfileMenu menuAlign="down" />
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardHeader;
