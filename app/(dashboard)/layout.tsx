import React from "react";
import { PropsWithChildren } from "react";
import DashboardHeader from "./_components/DashboardHeader";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <DashboardHeader />
      <div className="flex">
        <Sidebar />
        <main>{children}</main>
      </div>
    </>
  );
}
