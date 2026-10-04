// app/dashboard/layout.tsx
import { Sidebar } from "@/components/layout/sidebar";
import { DashboardNavbar } from "@/components/layout/dashboard-navbar";
import { patientNav } from "@/lib/nav-config";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar items={patientNav} title="Patient Panel" />
      <div className="flex flex-1 flex-col">
        <DashboardNavbar
          items={patientNav}
          title="Patient Panel"
          profileHref="/dashboard/profile"
        />
        <main className="flex-1 overflow-y-auto bg-muted/20 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}