// app/admin/page.tsx
"use client";

import { useDashboardStats } from "@/lib/hooks/use-admin";
import { StatCard } from "@/components/shared/stat-card";
import { EmergencyStatusChart } from "@/components/admin/emergency-chart";
import { UserDistributionChart } from "@/components/admin/user-distribution-chart";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Ambulance, DollarSign, Hospital } from "lucide-react";

export default function AdminOverviewPage() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">
          System-wide statistics and performance at a glance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={stats?.users.total ?? 0}
          description={`${stats?.users.patients ?? 0} patients, ${stats?.users.drivers ?? 0} drivers`}
          icon={Users}
        />
        <StatCard
          title="Active Drivers"
          value={stats?.drivers.available ?? 0}
          description={`${stats?.drivers.approved ?? 0} approved of ${stats?.drivers.total ?? 0}`}
          icon={Ambulance}
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats?.revenue.total ?? 0}`}
          icon={DollarSign}
        />
        <StatCard
          title="Hospitals"
          value={stats?.hospitals ?? 0}
          icon={Hospital}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <EmergencyStatusChart
          data={{
            status: "overview",
            pending: stats?.emergencies.pending ?? 0,
            active: stats?.emergencies.active ?? 0,
            completed: stats?.emergencies.completed ?? 0,
          }}
        />
        <UserDistributionChart
          patients={stats?.users.patients ?? 0}
          drivers={stats?.users.drivers ?? 0}
        />
      </div>
    </div>
  );
}