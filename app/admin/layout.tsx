// app/admin/layout.tsx
import { Sidebar } from "@/components/layout/sidebar";
import { DashboardNavbar } from "@/components/layout/dashboard-navbar";
import { adminNav } from "@/lib/nav-config";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar items={adminNav} title="Admin Panel" />
      <div className="flex flex-1 flex-col">
        <DashboardNavbar
          items={adminNav}
          title="Admin Panel"
          profileHref="/admin"
        />
        <main className="flex-1 overflow-y-auto bg-muted/20 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}