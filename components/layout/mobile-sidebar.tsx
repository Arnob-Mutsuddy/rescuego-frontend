
// components/layout/mobile-sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { NavItem } from "@/lib/nav-config";

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

export function MobileSidebar({
  items,
  title,
}: {
  items: NavItem[];
  title: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger> */}
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        }
      />

      <SheetContent side="left" className="w-64 p-0">
        <SheetTitle className="flex h-14 items-center border-b px-4 text-left">
          {title}
        </SheetTitle>

        <nav className="space-y-1 p-3">
          {items.map((item) => {
            const isActive = pathname === item.href;

            const Icon = iconMap[item.icon];

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
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
      </SheetContent>
    </Sheet>
  );
}





// // components/layout/mobile-sidebar.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import { cn } from "@/lib/utils";
// import { LucideIcon } from "lucide-react";
// import { useState } from "react";

// interface NavItem {
//   label: string;
//   href: string;
//   icon: LucideIcon;
// }

// export function MobileSidebar({
//   items,
//   title,
// }: {
//   items: NavItem[];
//   title: string;
// }) {
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);

//   return (
//     <Sheet open={open} onOpenChange={setOpen}>
//       <SheetTrigger>
//         <Button variant="ghost" size="icon" className="md:hidden">
//           <Menu className="h-5 w-5" />
//         </Button>
//       </SheetTrigger>
//       <SheetContent side="left" className="w-64 p-0">
//         <SheetTitle className="flex h-14 items-center border-b px-4 text-left">
//           {title}
//         </SheetTitle>
//         <nav className="space-y-1 p-3">
//           {items.map((item) => {
//             const isActive = pathname === item.href;
//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={() => setOpen(false)}
//                 className={cn(
//                   "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
//                   isActive
//                     ? "bg-primary text-primary-foreground"
//                     : "text-muted-foreground hover:bg-muted hover:text-foreground"
//                 )}
//               >
//                 <item.icon className="h-4 w-4" />
//                 {item.label}
//               </Link>
//             );
//           })}
//         </nav>
//       </SheetContent>
//     </Sheet>
//   );
// }