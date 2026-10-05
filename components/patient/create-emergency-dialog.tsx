// components/patient/create-emergency-dialog.tsx
"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  createEmergencySchema,
  CreateEmergencyFormValues,
  emergencyTypes,
} from "@/lib/validations/emergency";
import { useCreateEmergency } from "@/lib/hooks/use-emergency";
import { useGeolocation } from "@/lib/hooks/use-geolocation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Siren, MapPin, Loader2 } from "lucide-react";

export function CreateEmergencyDialog() {
  const [open, setOpen] = useState(false);
  const createEmergency = useCreateEmergency();
  const { coords, loading: locating, error: locationError, getLocation } =
    useGeolocation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateEmergencyFormValues>({
    resolver: zodResolver(createEmergencySchema),
  });

  const onSubmit = async (values: CreateEmergencyFormValues) => {
    let location = coords;

    if (!location) {
      try {
        location = await getLocation();
      } catch {
        toast.error("Please allow location access to request an ambulance.");
        return;
      }
    }

    createEmergency.mutate(
      {
        ...values,
        patientLat: location.latitude,
        patientLng: location.longitude,
        accuracy: location.accuracy,
      },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Siren className="h-4 w-4" />
          Request Ambulance
        </Button>
      </DialogTrigger> */}
      <DialogTrigger className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-transparent bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80">
        <Siren className="h-4 w-4" />
        Request Ambulance
      </DialogTrigger>  
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Emergency Ambulance</DialogTitle>
          <DialogDescription>
            We'll use your current location to find the nearest available
            ambulance.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Emergency Type</Label>
            <Controller
              control={control}
              name="emergencyType"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value ?? ""}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select emergency type" />
                  </SelectTrigger>
                  <SelectContent>
                    {emergencyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.emergencyType && (
              <p className="text-sm text-destructive">
                {errors.emergencyType.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Severity</Label>
            <Controller
              control={control}
              name="severity"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value ?? ""}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="CRITICAL">Critical</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.severity && (
              <p className="text-sm text-destructive">
                {errors.severity.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="patientAddress">Address (optional)</Label>
            <Input
              id="patientAddress"
              placeholder="e.g. Chattogram Medical College"
              {...register("patientAddress")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Briefly describe the situation"
              rows={3}
              {...register("description")}
            />
          </div>

          <div className="flex items-center gap-2 rounded-md border bg-muted/40 px-3 py-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            {coords ? (
              <span className="text-muted-foreground">
                Location captured ({coords.latitude.toFixed(4)},{" "}
                {coords.longitude.toFixed(4)})
              </span>
            ) : (
              <span className="text-muted-foreground">
                Your live location will be shared when you submit.
              </span>
            )}
          </div>
          {locationError && (
            <p className="text-sm text-destructive">{locationError}</p>
          )}

          <DialogFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={createEmergency.isPending || locating}
            >
              {createEmergency.isPending || locating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Confirm & Request Ambulance"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}