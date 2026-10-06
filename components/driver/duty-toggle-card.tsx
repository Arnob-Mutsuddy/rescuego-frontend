// components/driver/duty-toggle-card.tsx
"use client";

import { useDriverProfile, useStartDuty, useStopDuty } from "@/lib/hooks/use-driver";
import { useGeolocation } from "@/lib/hooks/use-geolocation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Power, PowerOff, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function DutyToggleCard() {
  const { data: profile, isLoading } = useDriverProfile();
  const startDuty = useStartDuty();
  const stopDuty = useStopDuty();
  const { loading: locating, getLocation } = useGeolocation();

  const handleStartDuty = async () => {
    try {
      const location = await getLocation();
      startDuty.mutate(location);
    } catch {
      toast.error("Please allow location access to start duty.");
    }
  };

  if (isLoading) {
    return <Skeleton className="h-40 w-full" />;
  }

  const isAvailable = profile?.isAvailable;
  const isApproved = profile?.isApproved;
  const hasAmbulance = profile?.ambulances?.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          Duty Status
          <Badge variant={isAvailable ? "default" : "secondary"}>
            {isAvailable ? "On Duty" : "Off Duty"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isApproved && (
          <p className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">
            Your account is pending admin approval. You can't go on duty
            until an admin approves your profile.
          </p>
        )}
        {isApproved && !hasAmbulance && (
          <p className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">
            Please register an ambulance before starting duty.
          </p>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {isAvailable
            ? "Sharing live location with dispatch"
            : "Your location is not being shared"}
        </div>

        {isAvailable ? (
          <Button
            variant="destructive"
            className="w-full gap-2"
            disabled={stopDuty.isPending}
            onClick={() => stopDuty.mutate()}
          >
            {stopDuty.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <PowerOff className="h-4 w-4" /> Stop Duty
              </>
            )}
          </Button>
        ) : (
          <Button
            className="w-full gap-2"
            disabled={
              !isApproved || !hasAmbulance || startDuty.isPending || locating
            }
            onClick={handleStartDuty}
          >
            {startDuty.isPending || locating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Power className="h-4 w-4" /> Start Duty
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}