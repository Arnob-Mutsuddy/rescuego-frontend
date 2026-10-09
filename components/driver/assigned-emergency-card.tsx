// components/driver/assigned-emergency-card.tsx
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { useAcceptDispatch, useRejectDispatch } from "@/lib/hooks/use-dispatch";
import { TripStatusStepper } from "./trip-status-stepper";
import { MapPin, Phone, User } from "lucide-react";
import type { EmergencyRequest } from "@/types";

export function AssignedEmergencyCard({ emergency }: { emergency: EmergencyRequest }) {
  const acceptMutation = useAcceptDispatch();
  const rejectMutation = useRejectDispatch();

  const isAssigned = emergency.status === "ASSIGNED";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-base">
          {emergency.emergencyType} — {emergency.severity}
          <StatusBadge status={emergency.status} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          {emergency.patient?.user?.fullName}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          {emergency.patient?.user?.phone}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          {emergency.patientAddress || `${emergency.patientLat}, ${emergency.patientLng}`}
        </div>

        {isAssigned && (
          <div className="flex gap-2 pt-2">
            <Button
              className="flex-1"
              disabled={acceptMutation.isPending}
              onClick={() => acceptMutation.mutate(emergency.id)}
            >
              Accept
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              disabled={rejectMutation.isPending}
              onClick={() => rejectMutation.mutate(emergency.id)}
            >
              Reject
            </Button>
          </div>
        )}

        {!isAssigned && emergency.trip && (
          <div className="pt-2">
            <TripStatusStepper
              tripId={emergency.trip.id}
              currentStatus={emergency.status}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}