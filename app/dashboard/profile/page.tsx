// export default function PatientProfilePage() {
//   return <h1 className="text-2xl font-bold">Profile & Settings</h1>;
// }


// app/dashboard/profile/page.tsx
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  patientProfileSchema,
  PatientProfileFormValues,
  bloodGroups,
} from "@/lib/validations/patient";
import {
  usePatientProfile,
  useUpdatePatientProfile,
} from "@/lib/hooks/use-patient-profile";
import { useCurrentUser } from "@/lib/hooks/use-current-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function PatientProfilePage() {
  const { user } = useCurrentUser();
  const { data: profile, isLoading } = usePatientProfile();
  const updateProfile = useUpdatePatientProfile();

  // const {
  //   register,
  //   control,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm<PatientProfileFormValues>({
  //   resolver: zodResolver(patientProfileSchema),
  // });
  const {
  register,
  control,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<PatientProfileFormValues>({
  resolver: zodResolver(patientProfileSchema),
  defaultValues: {
    fullName: "",
    phone: "",
    bloodGroup: "",
    medicalHistory: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  },
});

  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.user?.fullName ?? "",
        phone: profile.user?.phone ?? "",
        bloodGroup: profile.bloodGroup ?? "",
        medicalHistory: profile.medicalHistory ?? "",
        emergencyContactName: profile.emergencyContactName ?? "",
        emergencyContactPhone: profile.emergencyContactPhone ?? "",
      });
    }
  }, [profile, reset]);

  const onSubmit = (values: PatientProfileFormValues) => {
    const payload = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== "" && v !== undefined)
    );
    updateProfile.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-96 w-full max-w-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile & Settings</h1>
        <p className="text-sm text-muted-foreground">
          Update your personal and medical information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" {...register("fullName")} />
                {errors.fullName && (
                  <p className="text-sm text-destructive">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email ?? ""} disabled />
              </div>

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
                <Label>Blood Group</Label>
                <Controller
                  control={control}
                  name="bloodGroup"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodGroups.map((bg) => (
                          <SelectItem key={bg} value={bg}>
                            {bg}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalHistory">Medical History</Label>
              <Input
                id="medicalHistory"
                placeholder="e.g. Asthma, Diabetes"
                {...register("medicalHistory")}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">
                  Emergency Contact Name
                </Label>
                <Input
                  id="emergencyContactName"
                  {...register("emergencyContactName")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">
                  Emergency Contact Phone
                </Label>
                <Input
                  id="emergencyContactPhone"
                  {...register("emergencyContactPhone")}
                />
                {errors.emergencyContactPhone && (
                  <p className="text-sm text-destructive">
                    {errors.emergencyContactPhone.message}
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" disabled={updateProfile.isPending}>
              {updateProfile.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}