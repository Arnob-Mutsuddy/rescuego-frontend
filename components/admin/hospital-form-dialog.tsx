// components/admin/hospital-form-dialog.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { hospitalSchema, HospitalFormValues } from "@/lib/validations/hospital";
import { useCreateHospital, useUpdateHospital } from "@/lib/hooks/use-hospital";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Loader2 } from "lucide-react";
import { z } from "zod";
import type { Hospital } from "@/types";
import type { HospitalPayload } from "@/lib/api/admin";

// interface HospitalFormDialogProps {
//   hospital?: any; // Edit mode, Else Create mode
// }

interface HospitalFormDialogProps {
  hospital?: Hospital;
}

export function HospitalFormDialog({ hospital }: HospitalFormDialogProps) {
  const [open, setOpen] = useState(false);
  const isEdit = Boolean(hospital);

  const createHospital = useCreateHospital();
  const updateHospital = useUpdateHospital();
  const isPending = createHospital.isPending || updateHospital.isPending;

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<HospitalFormValues>({
//     resolver: zodResolver(hospitalSchema),
//   });
const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<
  z.input<typeof hospitalSchema>,
  any,
  z.output<typeof hospitalSchema>
>({
  resolver: zodResolver(hospitalSchema),
});

  useEffect(() => {
    if (open && hospital) {
      reset({
        name: hospital.name,
        phone: hospital.phone,
        email: hospital.email ?? "",
        address: hospital.address,
        website: hospital.website ?? "",
        latitude: hospital.latitude,
        longitude: hospital.longitude,
        capacity: hospital.capacity,
        operatingHours: hospital.operatingHours ?? "",
      });
    } else if (open && !hospital) {
      reset({
        name: "",
        phone: "",
        email: "",
        address: "",
        website: "",
        latitude: undefined,
        longitude: undefined,
        capacity: undefined,
        operatingHours: "",
      });
    }
  }, [open, hospital, reset]);

  // const onSubmit = (values: HospitalFormValues) => {
  //   const payload = Object.fromEntries(
  //     Object.entries(values).filter(([, v]) => v !== "")
  //   );

  //   if (isEdit) {
  //     updateHospital.mutate(
  //       { id: hospital.id, payload },
  //       { onSuccess: () => setOpen(false) }
  //     );
  //   } else {
  //     createHospital.mutate(payload, {
  //       onSuccess: () => setOpen(false),
  //     });
  //   }
  // };
  const onSubmit = (values: HospitalFormValues) => {
  const payload: HospitalPayload = {
    name: values.name,
    phone: values.phone,
    address: values.address,
    latitude: values.latitude,
    longitude: values.longitude,
    capacity: values.capacity,
    email: values.email || undefined,
    website: values.website || undefined,
    operatingHours: values.operatingHours || undefined,
  };

  if (hospital) {
    updateHospital.mutate(
      { id: hospital.id, payload },
      { onSuccess: () => setOpen(false) }
    );
  } else {
    createHospital.mutate(payload, { onSuccess: () => setOpen(false) });
  }
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        {isEdit ? (
          <Button size="sm" variant="outline">
            <Pencil className="h-3.5 w-3.5" />
          </Button>
        ) : (
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add Hospital
          </Button>
        )}
      </DialogTrigger> */}
      <DialogTrigger render={
    isEdit ? (
      <Button size="sm" variant="outline">
        <Pencil className="h-3.5 w-3.5" />
      </Button>
    ) : (
      <Button className="gap-2">
        <Plus className="h-4 w-4" />
        Add Hospital
      </Button>
    )
  }
/>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Hospital" : "Add New Hospital"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Hospital Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...register("phone")} />
              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" {...register("address")} />
            {errors.address && (
              <p className="text-sm text-destructive">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                {...register("latitude")}
              />
              {errors.latitude && (
                <p className="text-sm text-destructive">
                  {errors.latitude.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                {...register("longitude")}
              />
              {errors.longitude && (
                <p className="text-sm text-destructive">
                  {errors.longitude.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity (beds)</Label>
              <Input id="capacity" type="number" {...register("capacity")} />
              {errors.capacity && (
                <p className="text-sm text-destructive">
                  {errors.capacity.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="operatingHours">Operating Hours</Label>
              <Input
                id="operatingHours"
                placeholder="24/7"
                {...register("operatingHours")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website (optional)</Label>
            <Input id="website" {...register("website")} />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isEdit ? (
                "Save Changes"
              ) : (
                "Create Hospital"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}