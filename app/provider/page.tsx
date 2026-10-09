// export default function DriverTasksPage() {
//   return <h1 className="text-2xl font-bold">My Tasks</h1>;
// }


"use client";

import { useAssignedEmergencies } from "@/lib/hooks/use-driver";
import { DutyToggleCard } from "@/components/driver/duty-toggle-card";
import { LocationPinger } from "@/components/driver/location-pinger";
import { AssignedEmergencyCard } from "@/components/driver/assigned-emergency-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Siren } from "lucide-react";

export default function DriverTasksPage() {
  const { data: emergencies, isLoading } = useAssignedEmergencies();

  return (
    <div className="space-y-6">
      <LocationPinger />

      <div>
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <p className="text-sm text-muted-foreground">
          Manage your duty status and respond to emergency dispatches.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <DutyToggleCard />
        </div>

        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-lg font-semibold">Assigned Emergencies</h2>

          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-48 w-full" />
            </div>
          ) : !emergencies?.length ? (
            <EmptyState
              icon={Siren}
              title="No active assignments"
              description="When dispatch assigns you an emergency, it will appear here."
            />
          ) : (
            <div className="space-y-4">
              {emergencies.map((emergency) => (
                <AssignedEmergencyCard
                  key={emergency.id}
                  emergency={emergency}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}