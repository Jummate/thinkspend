import React from "react";
import { PropsWithChildren } from "react";
import DashboardHeader from "./_components/DashboardHeader";
import Sidebar from "./_components/Sidebar";
import MobileBottomNav from "./_components/MobileBottomNav";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 pb-20 md:pb-0">
        <DashboardHeader />
        {children}
      </main>
      <MobileBottomNav />
    </div>
  );
}