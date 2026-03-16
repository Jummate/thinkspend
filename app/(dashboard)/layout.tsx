// import React from "react";
// import { PropsWithChildren } from "react";
// import DashboardHeader from "./_components/DashboardHeader";
// import Sidebar from "./_components/Sidebar";

// export default function DashboardLayout({ children }: PropsWithChildren) {
//   return (
//     <>
//       <div className="flex h-full">
//         <Sidebar/>
//         <main className="flex-1">
//           <DashboardHeader />
//           {children}
//         </main>
//       </div>
//     </>
//   );
// }



import React from "react";
import { PropsWithChildren } from "react";
import DashboardHeader from "./_components/DashboardHeader";
import Sidebar from "./_components/Sidebar";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { Plus } from "lucide-react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1">
          <DashboardHeader />
          {children}
        </main>
      </div>

      {/* Floating Quick Add button — mobile only (desktop has header button) */}
      <Link
        href={ROUTES.EXPENSES_NEW}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/90 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all active:scale-95"
        aria-label="Add new expense"
      >
        <Plus size={24} />
      </Link>
    </>
  );
}
