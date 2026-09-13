"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { LogOut } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { useUser } from "@/lib/hooks/useUser";
import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { logout } from "@/lib/services/auth.service";
import { getInitials } from "@/lib/utils/get-initials";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";

interface ProfileMenuProps {

  menuAlign?: "up" | "down";
}

function ProfileMenu({ menuAlign = "down" }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { user, profile } = useUser();
  const { resolvedTheme, setTheme } = useTheme();

  const initials = getInitials(profile, user?.email);
  const isDark = resolvedTheme === "dark";
  const fullName = profile?.firstName
    ? `${profile.firstName} ${profile.lastName ?? ""}`.trim()
    : "Account";

  useClickOutside(containerRef, () => setOpen(false), open);

  const handleLogout = async () => {
    setOpen(false);
    const { success } = await logout();
    if (success) {
      router.push(ROUTES.LOGIN);
      router.refresh();
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Account menu"
        aria-expanded={open}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-secondary"
      >
        <Avatar initials={initials} />
      
        <div className="hidden min-w-0 flex-1 lg:block">
          <p className="truncate text-sm font-semibold text-foreground">
            {fullName}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {user?.email}
          </p>
        </div>
      </button>

      {open && (
        <div
          className={cn(
            "absolute z-50 w-64 rounded-xl border border-border bg-card p-2 shadow-lg",
            menuAlign === "up"
              ? "bottom-full left-0 mb-2"
              : "right-0 top-full mt-2",
          )}
        >
          <div className="border-b border-border px-3 py-2">
            <p className="truncate text-sm text-muted-foreground">
              {user?.email}
            </p>
          </div>

          <div className="flex items-center justify-between px-3 py-2.5">
            <span className="text-sm font-medium text-card-foreground">
              Appearance
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isDark}
              aria-label="Toggle dark mode"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={cn(
                "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                isDark ? "bg-primary" : "bg-muted",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full transition-transform",
                  "bg-primary-foreground",
                  isDark ? "translate-x-5" : "translate-x-0.5",
                )}
              />
            </button>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-danger transition-colors hover:bg-secondary"
          >
            Log out
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;