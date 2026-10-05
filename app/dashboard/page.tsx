// export default function PatientDashboardPage() {
//   return <h1 className="text-2xl font-bold">My Activity</h1>;
// }

// app/dashboard/page.tsx
"use client";

import { useEmergencyStats } from "@/lib/hooks/use-emergency";
import { StatCard } from "@/components/shared/stat-card";
import { CreateEmergencyDialog } from "@/components/patient/create-emergency-dialog";
import { EmergencyList } from "@/components/patient/emergency-list";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, CheckCircle2, Siren, XCircle } from "lucide-react";

export default function PatientDashboardPage() {
  const { data: stats, isLoading } = useEmergencyStats();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Activity</h1>
          <p className="text-sm text-muted-foreground">
            Request help instantly and track your emergency trips.
          </p>
        </div>
        <CreateEmergencyDialog />
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Pending"
            value={stats?.PENDING ?? 0}
            icon={Clock}
          />
          <StatCard
            title="Active"
            value={
              (stats?.ASSIGNED ?? 0) +
              (stats?.ACCEPTED ?? 0) +
              (stats?.EN_ROUTE ?? 0)
            }
            icon={Siren}
          />
          <StatCard
            title="Completed"
            value={stats?.COMPLETED ?? 0}
            icon={CheckCircle2}
          />
          <StatCard
            title="Cancelled"
            value={stats?.CANCELLED ?? 0}
            icon={XCircle}
          />
        </div>
      )}

      <div>
        <h2 className="mb-3 text-lg font-semibold">Recent Requests</h2>
        <EmergencyList />
      </div>
    </div>
  );
}