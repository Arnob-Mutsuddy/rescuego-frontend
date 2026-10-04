// components/layout/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  CreditCard,
  Users,
  FileText,
  Truck,
  Wallet,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/nav-config";

const iconMap = {
  dashboard: LayoutDashboard,
  user: User,
  "credit-card": CreditCard,
  users: Users,
  "file-text": FileText,
  truck: Truck,
  wallet: Wallet,
  settings: Settings,
};

export function Sidebar({
  items,
  title,
}: {
  items: NavItem[];
  title: string;
}) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-card md:block">
      <div className="flex h-14 items-center border-b px-4">
        <span className="font-semibold">{title}</span>
      </div>

      <nav className="space-y-1 p-3">
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              item.href !== "/provider" &&
              item.href !== "/admin" &&
              pathname.startsWith(item.href));

          const Icon = iconMap[item.icon];

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}




// // components/layout/sidebar.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { LucideIcon } from "lucide-react";

// interface NavItem {
//   label: string;
//   href: string;
//   icon: LucideIcon;
// }

// export function Sidebar({
//   items,
//   title,
// }: {
//   items: NavItem[];
//   title: string;
// }) {
//   const pathname = usePathname();

//   return (
//     <aside className="hidden w-64 shrink-0 border-r bg-card md:block">
//       <div className="flex h-14 items-center border-b px-4">
//         <span className="font-semibold">{title}</span>
//       </div>
//       <nav className="space-y-1 p-3">
//         {items.map((item) => {
//           const isActive =
//             pathname === item.href ||
//             (item.href !== "/dashboard" &&
//               item.href !== "/provider" &&
//               item.href !== "/admin" &&
//               pathname.startsWith(item.href));

//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={cn(
//                 "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
//                 isActive
//                   ? "bg-primary text-primary-foreground"
//                   : "text-muted-foreground hover:bg-muted hover:text-foreground"
//               )}
//             >
//               <item.icon className="h-4 w-4" />
//               {item.label}
//             </Link>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }