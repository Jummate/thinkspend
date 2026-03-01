"use client";

import Button from "@/components/ui/Button";
import { ROUTES } from "@/lib/routes";
import { Bell, Moon, Search } from "lucide-react";
import Link from "next/link";

const DashboardHeader = () => {
  return (
    <>
      {/* Desktop Header */}
      <div className="sticky top-0 right-0 hidden md:flex bg-white w-full p-4 border-b border-b-gray-200 items-center justify-between">
        <div className="w-xs flex items-center rounded-full bg-gray-100 px-3 focus-within:ring-2 focus-within:ring-primary focus-within:bg-white transition-all">
          <Search
            size={16}
            className="text-gray-400"
          />
          <input
            type="text"
            placeholder="Search transactions, insights"
            className="text-sm border-none outline-none bg-transparent focus:outline-none focus:ring-0 flex-1 px-2 py-2"
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          <Moon className="cursor-pointer" />
          <Bell className="cursor-pointer" />
          <Link href={ROUTES.EXPENSES_NEW}>
            <Button styles="py-1.5">+ Add Expense</Button>
          </Link>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden bg-white w-full p-4 border-b border-b-gray-200">
        {/* Top Row: Icons + Button */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Moon
              className="cursor-pointer"
              size={20}
            />
            <Bell
              className="cursor-pointer"
              size={20}
            />
          </div>
          <Link href={ROUTES.EXPENSES_NEW}>
            <Button styles="py-1.5 px-4">+ Add Expense</Button>
          </Link>
        </div>

        {/* Bottom Row: Search */}
        <div className="flex items-center rounded-full bg-gray-100 px-3 focus-within:ring-2 focus-within:ring-primary focus-within:bg-white transition-all">
          <Search
            size={16}
            className="text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="text-sm border-none outline-none bg-transparent focus:outline-none focus:ring-0 flex-1 px-2 py-2"
          />
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
