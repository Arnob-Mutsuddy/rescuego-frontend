// components/layout/dashboard-navbar.tsx
"use client";

import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/lib/hooks/use-current-user";
import { useLogout } from "@/lib/hooks/use-auth";
import { MobileSidebar } from "./mobile-sidebar";
import type { NavItem } from "@/lib/nav-config";
import Link from "next/link";

export function DashboardNavbar({
  items,
  title,
  profileHref,
}: {
  items: NavItem[];
  title: string;
  profileHref: string;
}) {
  const { user } = useCurrentUser();
  const logout = useLogout();

  const initials = user?.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-4">
      <div className="flex items-center gap-2">
        <MobileSidebar items={items} title={title} />

        <Link href="/" className="font-bold text-primary">
          RESCUEGO
        </Link>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button className="flex items-center gap-2 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{initials || "U"}</AvatarFallback>
              </Avatar>
            </button>
          }
        />

        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">{user?.fullName}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            render={
              <Link
                href={profileHref}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
            }
          />

          <DropdownMenuItem
            onClick={logout}
            className="flex items-center gap-2 text-destructive focus:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}



// // components/layout/dashboard-navbar.tsx
// "use client";

// import { LucideIcon, LogOut, User } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { useCurrentUser } from "@/lib/hooks/use-current-user";
// import { useLogout } from "@/lib/hooks/use-auth";
// import { MobileSidebar } from "./mobile-sidebar";
// import Link from "next/link";

// interface NavItem {
//   label: string;
//   href: string;
//   icon: LucideIcon;
// }

// export function DashboardNavbar({
//   items,
//   title,
//   profileHref,
// }: {
//   items: NavItem[];
//   title: string;
//   profileHref: string;
// }) {
//   const { user } = useCurrentUser();
//   const logout = useLogout();

//   const initials = user?.fullName
//     ?.split(" ")
//     .map((n) => n[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();

//   return (
//     <header className="flex h-14 items-center justify-between border-b bg-card px-4">
//       <div className="flex items-center gap-2">
//         <MobileSidebar items={items} title={title} />
//         <Link href="/" className="font-bold text-primary">
//           RESCUEGO
//         </Link>
//       </div>

//       <DropdownMenu>
//         {/* <DropdownMenuTrigger asChild>
//           <button className="flex items-center gap-2 rounded-full">
//             <Avatar className="h-8 w-8">
//               <AvatarFallback>{initials || "U"}</AvatarFallback>
//             </Avatar>
//           </button>
//         </DropdownMenuTrigger> */}
//         <DropdownMenuTrigger
//         render={
//             <button className="flex items-center gap-2 rounded-full">
//               <Avatar className="h-8 w-8">
//                 <AvatarFallback>{initials || "U"}</AvatarFallback>
//               </Avatar>
//             </button>
//           }
//         />
        
//         <DropdownMenuContent align="end" className="w-56">
//           <div className="px-2 py-1.5">
//             <p className="text-sm font-medium">{user?.fullName}</p>
//             <p className="text-xs text-muted-foreground">{user?.email}</p>
//           </div>
//           <DropdownMenuSeparator />
//           {/* <DropdownMenuItem asChild>
//             <Link href={profileHref} className="flex items-center gap-2">
//               <User className="h-4 w-4" /> Profile
//             </Link>
//           </DropdownMenuItem> */}
//           <DropdownMenuItem
//             render={
//             <Link href={profileHref} className="flex items-center gap-2">
//                 <User className="h-4 w-4" />
//                 Profile
//             </Link>
//             }
//           />
//           <DropdownMenuItem
//             onClick={logout}
//             className="flex items-center gap-2 text-destructive focus:text-destructive"
//           >
//             <LogOut className="h-4 w-4" /> Logout
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </header>
//   );
// }