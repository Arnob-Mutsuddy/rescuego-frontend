// export default function DriverProfilePage() {
//   return <h1 className="text-2xl font-bold">Profile & Availability</h1>;
// }

// app/provider/profile/page.tsx
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   driverProfileSchema,
//   DriverProfileFormValues,
// } from "@/lib/validations/driver";
import {
  driverProfileSchema,
  DriverProfileFormInput,
  DriverProfileFormValues,
} from "@/lib/validations/driver";
import {
  useDriverProfile,
  useUpdateDriverProfile,
} from "@/lib/hooks/use-driver";
import { useCurrentUser } from "@/lib/hooks/use-current-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { RegisterAmbulanceDialog } from "@/components/driver/register-ambulance-dialog";
import { AmbulanceList } from "@/components/driver/ambulance-list";
import type { UpdateDriverProfilePayload } from "@/lib/api/driver";

export default function DriverProfilePage() {
  const { user } = useCurrentUser();
  const { data: profile, isLoading } = useDriverProfile();
  const updateProfile = useUpdateDriverProfile();

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm<DriverProfileFormValues>({
  //   resolver: zodResolver(driverProfileSchema),
  // });

  //any ->undefind
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<
        DriverProfileFormInput,
        any,
        DriverProfileFormValues
    >({
        resolver: zodResolver(driverProfileSchema),
    });

  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.user?.fullName ?? "",
        phone: profile.user?.phone ?? "",
        licenseNumber: profile.licenseNumber ?? "",
        yearsOfExperience: profile.yearsOfExperience ?? undefined,
        certification: profile.certification ?? "",
      });
    }
  }, [profile, reset]);

  // const onSubmit = (values: DriverProfileFormValues) => {
  //   const payload: Record<string, unknown> = { ...values };
  //   if (values.licenseExpiry) {
  //     payload.licenseExpiry = new Date(values.licenseExpiry).toISOString();
  //   } else {
  //     delete payload.licenseExpiry;
  //   }
  //   updateProfile.mutate(payload);
  // };
  const onSubmit = (values: DriverProfileFormValues) => {
  const payload: UpdateDriverProfilePayload = {
    fullName: values.fullName || undefined,
    phone: values.phone || undefined,
    licenseNumber: values.licenseNumber || undefined,
    licenseExpiry: values.licenseExpiry
      ? new Date(values.licenseExpiry).toISOString()
      : undefined,
    yearsOfExperience: values.yearsOfExperience,
    certification: values.certification || undefined,
  };
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
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile & Availability</h1>
        <p className="text-sm text-muted-foreground">
          Manage your driver details and ambulances.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Personal & License Info</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" {...register("fullName")} />
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
                <Label htmlFor="licenseNumber">License Number</Label>
                <Input id="licenseNumber" {...register("licenseNumber")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseExpiry">License Expiry</Label>
                <Input
                  id="licenseExpiry"
                  type="date"
                  {...register("licenseExpiry")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                <Input
                  id="yearsOfExperience"
                  type="number"
                  {...register("yearsOfExperience")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="certification">Certification</Label>
              <Input
                id="certification"
                placeholder="e.g. Basic Life Support (BLS)"
                {...register("certification")}
              />
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Approval Status:</span>
              <span
                className={
                  profile?.isApproved
                    ? "font-medium text-green-600"
                    : "font-medium text-yellow-600"
                }
              >
                {profile?.isApproved ? "Approved" : "Pending Approval"}
              </span>
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">My Ambulances</CardTitle>
          <RegisterAmbulanceDialog />
        </CardHeader>
        <CardContent>
          <AmbulanceList ambulances={profile?.ambulances ?? []} />
        </CardContent>
      </Card>
    </div>
  );
}