import React from "react";
import { PropsWithChildren } from "react";
import DashboardHeader from "./_components/DashboardHeader";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex h-full">
        <Sidebar/>
        <main className="flex-1">
          <DashboardHeader />
          {children}
        </main>
      </div>
    </>
  );
}
