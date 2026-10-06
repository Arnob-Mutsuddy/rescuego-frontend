// components/driver/ambulance-list.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ambulance } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";

export function AmbulanceList({ ambulances }: { ambulances: any[] }) {
  if (!ambulances?.length) {
    return (
      <EmptyState
        icon={Ambulance}
        title="No ambulance registered"
        description="Register your ambulance to start accepting emergency requests."
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {ambulances.map((ambulance) => (
        <Card key={ambulance.id}>
          <CardContent className="space-y-2 pt-6">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{ambulance.registrationNo}</p>
              <Badge variant={ambulance.status === "ACTIVE" ? "default" : "secondary"}>
                {ambulance.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {ambulance.ambulanceType} • Capacity: {ambulance.capacity}
            </p>
            {ambulance.equipment?.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {ambulance.equipment.map((eq: string) => (
                  <Badge key={eq} variant="outline" className="text-xs">
                    {eq}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}