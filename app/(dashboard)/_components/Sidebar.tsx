"use client";

import AppLogo from "@/components/AppLogo";
import { useUser } from "@/lib/hooks/useUser";
import { ROUTES } from "@/lib/routes";
import { logout } from "@/lib/services/authService";
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Receipt,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const { user, profile } = useUser();
  const [open, setOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    const { success, message } = await logout();
    if (!success) {
      console.log(message);
    }
  };

  // const user = {
  //   id: Date.now(),
  //   fullName: "Lorem Ipsum",
  //   firstName: "Lorem",
  //   lastName: "Ipsum",
  //   preferredCurrency: "N",
  //   email: "lorem_ipsum@gmail.com",
  // };

  const navItems = [
    { href: ROUTES.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
    { href: ROUTES.EXPENSES, label: "Expenses", icon: Receipt },
    { href: ROUTES.ANALYTICS, label: "Analytics", icon: BarChart3 },
    { href: ROUTES.SETTINGS, label: "Settings", icon: Settings },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="w-60 h-screen bg-white border-r border-r-gray-200 hidden md:flex md:flex-col sticky top-0">
      {/* Logo Section */}
      <div className="flex items-center gap-2 p-6 border-b border-gray-200">
        <AppLogo />
        <span className="font-bold text-lg">ThinkSpend</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1 text-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${
                      active
                        ? "bg-primary text-white font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section (Optional - at bottom) */}
      {/* <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
            {profile?.firstName?.charAt(0)}
            {profile?.lastName?.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">
              {profile?.firstName} {profile?.lastName}
            </p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div> */}

      <div className="relative">
        <div
          className="flex items-center gap-3 px-4 py-3"
          onClick={() => setOpen(!open)}
        >
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
            {profile?.firstName?.charAt(0)}
            {profile?.lastName?.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">
              {profile?.firstName} {profile?.lastName}
            </p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>

        {open && (
          <div className="absolute bottom-12 left-0 bg-white shadow-lg rounded-lg p-2">
            <Link
              href={ROUTES.SETTINGS}
              onClick={() => setOpen(false)}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-sm"
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-red-500 rounded-md text-sm"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
