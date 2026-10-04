// lib/nav-config.ts

export type NavIcon =
  | "dashboard"
  | "user"
  | "credit-card"
  | "users"
  | "file-text"
  | "truck"
  | "wallet"
  | "settings";

export interface NavItem {
  label: string;
  href: string;
  icon: NavIcon;
}

export const patientNav: NavItem[] = [
  {
    label: "My Activity",
    href: "/dashboard",
    icon: "dashboard",
  },
  {
    label: "Profile & Settings",
    href: "/dashboard/profile",
    icon: "user",
  },
  {
    label: "Payments",
    href: "/dashboard/payments",
    icon: "credit-card",
  },
];

export const driverNav: NavItem[] = [
  {
    label: "My Tasks",
    href: "/provider",
    icon: "truck",
  },
  {
    label: "Earnings & Analytics",
    href: "/provider/earnings",
    icon: "wallet",
  },
  {
    label: "Profile & Availability",
    href: "/provider/profile",
    icon: "settings",
  },
];

export const adminNav: NavItem[] = [
  {
    label: "Overview",
    href: "/admin",
    icon: "dashboard",
  },
  {
    label: "Manage",
    href: "/admin/manage",
    icon: "users",
  },
  {
    label: "Reports",
    href: "/admin/reports",
    icon: "file-text",
  },
];




// // lib/nav-config.ts
// import {
//   LayoutDashboard,
//   User,
//   CreditCard,
//   Users,
//   Hospital,
//   FileText,
//   Truck,
//   Wallet,
//   Settings,
//   Star,
// } from "lucide-react";

// export const patientNav = [
//   { label: "My Activity", href: "/dashboard", icon: LayoutDashboard },
//   { label: "Profile & Settings", href: "/dashboard/profile", icon: User },
//   { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
// ];

// export const driverNav = [
//   { label: "My Tasks", href: "/provider", icon: Truck },
//   { label: "Earnings & Analytics", href: "/provider/earnings", icon: Wallet },
//   { label: "Profile & Availability", href: "/provider/profile", icon: Settings },
// ];

// export const adminNav = [
//   { label: "Overview", href: "/admin", icon: LayoutDashboard },
//   { label: "Manage", href: "/admin/manage", icon: Users },
//   { label: "Reports", href: "/admin/reports", icon: FileText },
// ];