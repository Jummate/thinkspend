// "use client";

// import Button from "@/components/ui/Button";
// import { ROUTES } from "@/lib/routes";
// import { logout } from "@/lib/services/auth.service";
// import { Bell, Moon, Search } from "lucide-react";
// import Link from "next/link";

// const DashboardHeader = () => {
//   const handleLogout = async () => {
//     const { success, message } = await logout();
//     if (!success) {
//       console.log(message);
//     }
//   };
//   return (
//     <>
//       {/* Desktop Header */}
//       <div className="sticky top-0 right-0 hidden md:flex bg-white w-full p-4 border-b border-b-gray-200 items-center justify-between">
//         <div className="w-xs flex items-center rounded-full bg-gray-100 px-3 focus-within:ring-2 focus-within:ring-primary focus-within:bg-white transition-all">
//           <Search
//             size={16}
//             className="text-gray-400"
//           />
//           <input
//             type="text"
//             placeholder="Search transactions, insights"
//             className="text-sm border-none outline-none bg-transparent focus:outline-none focus:ring-0 flex-1 px-2 py-2"
//           />
//         </div>

//         <div className="flex items-center justify-center gap-4">
//           <Moon className="cursor-pointer" />
//           <Bell className="cursor-pointer" />
//           <Link href={ROUTES.EXPENSES_NEW}>
//             <Button styles="py-1.5">+ Add Expense</Button>
//           </Link>
//           {/* <Button styles="py-1.5 px-4" onClick={handleLogout}>Log out</Button> */}
//         </div>
//       </div>

//       {/* Mobile Header */}
//       <div className="md:hidden bg-white w-full p-4 border-b border-b-gray-200">
//         {/* Top Row: Icons + Button */}
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-3">
//             <Moon
//               className="cursor-pointer"
//               size={20}
//             />
//             <Bell
//               className="cursor-pointer"
//               size={20}
//             />
//           </div>
//           <Link href={ROUTES.EXPENSES_NEW}>
//             <Button styles="py-1.5 px-4">+ Add Expense</Button>
//           </Link>
//         </div>

//         {/* Bottom Row: Search */}
//         <div className="flex items-center rounded-full bg-gray-100 px-3 focus-within:ring-2 focus-within:ring-primary focus-within:bg-white transition-all">
//           <Search
//             size={16}
//             className="text-gray-400"
//           />
//           <input
//             type="text"
//             placeholder="Search..."
//             className="text-sm border-none outline-none bg-transparent focus:outline-none focus:ring-0 flex-1 px-2 py-2"
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default DashboardHeader;







"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";
import Button from "@/components/ui/Button";
import ProfileMenu from "./ProfileMenu";
import { ROUTES } from "@/lib/routes";

const DashboardHeader = () => {
  return (
    <>
      {/* Tablet & desktop header */}
      <div className="sticky top-0 z-30 hidden w-full items-center justify-between border-b border-border bg-card p-4 md:flex">
        <div className="flex w-xs items-center rounded-full bg-secondary px-3 transition-all focus-within:bg-card focus-within:ring-2 focus-within:ring-primary">
          <Search size={16} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions, insights"
            className="flex-1 border-none bg-transparent px-2 py-2 text-sm outline-none focus:outline-none focus:ring-0"
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          <button type="button" aria-label="Notifications">
            <Bell className="cursor-pointer text-foreground" />
          </button>
          <Link href={ROUTES.EXPENSES_NEW}>
            <Button styles="py-1.5">+ Add Expense</Button>
          </Link>
        </div>
      </div>

      {/* Mobile header — no Add Expense here, the bottom-nav FAB covers
          it; ProfileMenu appears here since Sidebar (which normally
          hosts it) doesn't render on mobile at all. */}
      <div className="flex w-full items-center justify-between border-b border-border bg-card p-4 md:hidden">
        <button
          type="button"
          aria-label="Search"
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
    </>
  );
};

export default DashboardHeader;
