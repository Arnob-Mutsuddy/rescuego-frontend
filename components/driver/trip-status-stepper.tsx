// components/driver/trip-status-stepper.tsx
"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUpdateTripStatus } from "@/lib/hooks/use-dispatch";
import { TripStatus } from "@/lib/api/dispatch";

const steps: { status: TripStatus; label: string }[] = [
  { status: "EN_ROUTE", label: "En Route" },
  { status: "ARRIVED", label: "Arrived" },
  { status: "PATIENT_PICKED_UP", label: "Picked Up" },
  { status: "AT_HOSPITAL", label: "At Hospital" },
  { status: "COMPLETED", label: "Completed" },
];

export function TripStatusStepper({
  tripId,
  currentStatus,
}: {
  tripId: string;
  currentStatus: string;
}) {
  const updateStatus = useUpdateTripStatus();

  const currentIndex = steps.findIndex((s) => s.status === currentStatus);
  // ACCEPTED when currentIndex will be -1, then next step "EN_ROUTE" (index 0)
  const nextStepIndex = currentIndex === -1 ? 0 : currentIndex + 1;
  const nextStep = steps[nextStepIndex];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isDone = index <= currentIndex;
          return (
            <div key={step.status} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                <div
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold",
                    isDone
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {isDone ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1",
                      index < currentIndex ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
              <span className="mt-1 text-center text-[10px] text-muted-foreground">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {nextStep && currentStatus !== "COMPLETED" && (
        <Button
          className="w-full"
          disabled={updateStatus.isPending}
          onClick={() =>
            updateStatus.mutate({ tripId, status: nextStep.status })
          }
        >
          {updateStatus.isPending
            ? "Updating..."
            : `Mark as ${nextStep.label}`}
        </Button>
      )}
    </div>
  );
}