import React from "react";
import { PropsWithChildren } from "react";
import DashboardHeader from "./_components/DashboardHeader";
import Sidebar from "./_components/Sidebar";

// const DashboardLayout = ({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) => {
//   return (
//     <div>
//       <p>This is coming from dashboard layout.</p>
//       {children}
//     </div>
//   );
// };

// export default DashboardLayout;

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
