// components/admin/dispatch-dialog.tsx
"use client";

import { useState,useEffect } from "react";
import { useFindNearestForEmergency, useAssignEmergency } from "@/lib/hooks/use-dispatch";
import { useHospitals } from "@/lib/hooks/use-hospital";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Clock, Ambulance, Loader2, SearchX } from "lucide-react";

export function DispatchDialog({
  emergency,
  open,
  onOpenChange,
}: {
  emergency: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [selectedDriverId, setSelectedDriverId] = useState<string>("");
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>("");

  const findNearest = useFindNearestForEmergency();
  const assignEmergency = useAssignEmergency();
  const { data: hospitalsData, isLoading: hospitalsLoading } = useHospitals({
    page: 1,
    limit: 50,
  });


//   const handleOpenChange = (isOpen: boolean) => {
//     onOpenChange(isOpen);
//     if (isOpen && emergency) {
//       setSelectedDriverId("");
//       setSelectedHospitalId("");
//       findNearest.mutate({ emergencyRequestId: emergency.id, limit: 5 });
//     }
//   };

//new to solve [No available ambulances found nearby.]
useEffect(() => {
  if (!open || !emergency?.id) return;

  console.log("Finding nearest ambulances:", {
    emergencyRequestId: emergency.id,
    limit: 5,
  });

  setSelectedDriverId("");
  setSelectedHospitalId("");

  findNearest.mutate({
    emergencyRequestId: emergency.id,
    limit: 5,
  });
}, [open, emergency?.id]);

const handleOpenChange = (isOpen: boolean) => {
  onOpenChange(isOpen);
};

// end

  const handleAssign = () => {
    if (!selectedDriverId || !selectedHospitalId) return;
    assignEmergency.mutate(
      {
        emergencyRequestId: emergency.id,
        driverId: selectedDriverId,
        hospitalId: selectedHospitalId,
      },
      {
        onSuccess: () => onOpenChange(false),
      }
    );
  };

  const ambulances = findNearest.data?.ambulances ?? [];
  
  //new for test==>
  console.log("Dispatch Debug:", {
  mutationData: findNearest.data,
  ambulances,
  isPending: findNearest.isPending,
  isSuccess: findNearest.isSuccess,
  isError: findNearest.isError,
  error: findNearest.error,
});
//end
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Dispatch Ambulance</DialogTitle>
          <DialogDescription>
            {emergency?.emergencyType} — {emergency?.severity} severity
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="mb-2 block">Nearest Available Ambulances</Label>

            {findNearest.isPending ? (
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : ambulances.length === 0 ? (
              <div className="flex flex-col items-center gap-2 rounded-md border border-dashed py-8 text-center">
                <SearchX className="h-6 w-6 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  No available ambulances found nearby.
                </p>
              </div>
            ) : (
              <RadioGroup
                value={selectedDriverId}
                onValueChange={setSelectedDriverId}
                className="space-y-2"
              >
                {ambulances.map((amb) => (
                  <Label
                    key={amb.driverId}
                    htmlFor={amb.driverId}
                    className="flex cursor-pointer items-center gap-3 rounded-md border p-3 hover:bg-muted/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
                  >
                    <RadioGroupItem value={amb.driverId} id={amb.driverId} />
                    <Ambulance className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{amb.driverName}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {amb.distance} km
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> ~{amb.estimatedTime} min
                        </span>
                      </div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            )}
          </div>

          <div className="space-y-2">
            <Label>Destination Hospital</Label>
            {hospitalsLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
            //   <Select
            //     value={selectedHospitalId}
            //     onValueChange={setSelectedHospitalId}
            //   >
                <Select
                    value={selectedHospitalId}
                    onValueChange={(value) => {
                        if (value !== null) {
                            setSelectedHospitalId(value);
                        }
                    }}
                >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a hospital" />
                </SelectTrigger>
                <SelectContent>
                  {hospitalsData?.data.map((hospital: any) => (
                    <SelectItem key={hospital.id} value={hospital.id}>
                      {hospital.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            className="w-full"
            disabled={
              !selectedDriverId ||
              !selectedHospitalId ||
              assignEmergency.isPending
            }
            onClick={handleAssign}
          >
            {assignEmergency.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Assign Ambulance"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}