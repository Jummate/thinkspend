// import AppLogo from "@/components/AppLogo";
// import { ROUTES } from "@/lib/routes";
// import Link from "next/link";
// import React from "react";

// const Sidebar = () => {
//   return (
//     <div className="w-60 h-full bg-white border-r border-r-gray-200 hidden md:block">
//       <div className="flex gap-1">
//         <AppLogo /> <span>ThinkSpend</span>
//       </div>

//       <ul>
//         <li>
//           <Link href={ROUTES.DASHBOARD}>Dashboard</Link>
//         </li>
//         <li>
//           <Link href={ROUTES.EXPENSES}>Expenses</Link>
//         </li>
//         <li>
//           <Link href={ROUTES.ANALYTICS}>Analytics</Link>
//         </li>
//         <li>
//           <Link href={ROUTES.SETTINGS}>Settings</Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

"use client";

import AppLogo from "@/components/AppLogo";
import { ROUTES } from "@/lib/routes";
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Receipt,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();

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
        <ul className="space-y-1">
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
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
            JD
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
