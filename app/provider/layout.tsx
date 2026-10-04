// app/provider/layout.tsx
import { Sidebar } from "@/components/layout/sidebar";
import { DashboardNavbar } from "@/components/layout/dashboard-navbar";
import { driverNav } from "@/lib/nav-config";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar items={driverNav} title="Driver Panel" />
      <div className="flex flex-1 flex-col">
        <DashboardNavbar
          items={driverNav}
          title="Driver Panel"
          profileHref="/provider/profile"
        />
        <main className="flex-1 overflow-y-auto bg-muted/20 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}