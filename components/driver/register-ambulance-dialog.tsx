// components/driver/register-ambulance-dialog.tsx
"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerAmbulanceSchema,
  RegisterAmbulanceFormValues,
  RegisterAmbulanceFormInput,
} from "@/lib/validations/driver";
import { useRegisterAmbulance } from "@/lib/hooks/use-driver";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";

export function RegisterAmbulanceDialog() {
  const [open, setOpen] = useState(false);
  const registerAmbulance = useRegisterAmbulance();

//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors },
//   } = useForm<RegisterAmbulanceFormValues>({
//     resolver: zodResolver(registerAmbulanceSchema),
//   });
const {
  register,
  handleSubmit,
  control,
  reset,
  formState: { errors },
} = useForm<RegisterAmbulanceFormInput, any, RegisterAmbulanceFormValues>({
  resolver: zodResolver(registerAmbulanceSchema),
});

  const onSubmit = (values: RegisterAmbulanceFormValues) => {
    const equipment = values.equipment
      ? values.equipment.split(",").map((e) => e.trim()).filter(Boolean)
      : [];

    registerAmbulance.mutate(
      {
        registrationNo: values.registrationNo,
        ambulanceType: values.ambulanceType,
        capacity: values.capacity,
        manufacturingYear: values.manufacturingYear,
        equipment,
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
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" /> Register Ambulance
        </Button>
      </DialogTrigger> */}
      <DialogTrigger
        render={
         <Button variant="outline" className="gap-2" />
        }
         >
       <Plus className="h-4 w-4" />
       Register Ambulance
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register New Ambulance</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="registrationNo">Registration Number</Label>
            <Input
              id="registrationNo"
              placeholder="e.g. AMBUL-001"
              {...register("registrationNo")}
            />
            {errors.registrationNo && (
              <p className="text-sm text-destructive">
                {errors.registrationNo.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Ambulance Type</Label>
            <Controller
              control={control}
              name="ambulanceType"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Mobile ICU">Mobile ICU</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.ambulanceType && (
              <p className="text-sm text-destructive">
                {errors.ambulanceType.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                placeholder="2"
                {...register("capacity")}
              />
              {errors.capacity && (
                <p className="text-sm text-destructive">
                  {errors.capacity.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="manufacturingYear">Year</Label>
              <Input
                id="manufacturingYear"
                type="number"
                placeholder="2023"
                {...register("manufacturingYear")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="equipment">Equipment (comma-separated)</Label>
            <Input
              id="equipment"
              placeholder="Oxygen, Ventilator, Defibrillator"
              {...register("equipment")}
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={registerAmbulance.isPending}
            >
              {registerAmbulance.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Register Ambulance"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}