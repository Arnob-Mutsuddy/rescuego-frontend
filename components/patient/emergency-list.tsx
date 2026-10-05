// components/patient/emergency-list.tsx
"use client";

import { useEmergencyList, useCancelEmergency } from "@/lib/hooks/use-emergency";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Siren } from "lucide-react";
import { format } from "date-fns";

export function EmergencyList({ status }: { status?: string }) {
  const { data, isLoading } = useEmergencyList({
    page: 1,
    limit: 10,
    status,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const cancelMutation = useCancelEmergency();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  const emergencies = data?.data ?? [];

  if (emergencies.length === 0) {
    return (
      <EmptyState
        icon={Siren}
        title="No emergency requests found"
        description="When you request an ambulance, it will appear here."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emergencies.map((emergency: any) => (
            <TableRow key={emergency.id}>
              <TableCell className="font-medium">
                {emergency.emergencyType}
              </TableCell>
              <TableCell>{emergency.severity}</TableCell>
              <TableCell>
                <StatusBadge status={emergency.status} />
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {format(new Date(emergency.createdAt), "MMM d, yyyy h:mm a")}
              </TableCell>
              <TableCell className="text-right">
                {["PENDING", "ASSIGNED"].includes(emergency.status) && (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={cancelMutation.isPending}
                    onClick={() => cancelMutation.mutate(emergency.id)}
                  >
                    Cancel
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}