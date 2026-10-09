// lib/hooks/use-patient-profile.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { patientApi, UpdatePatientProfilePayload } from "@/lib/api/patient";
import { getErrorMessage } from "@/lib/error";

export function usePatientProfile() {
  return useQuery({
    queryKey: ["patient-profile"],
    queryFn: () => patientApi.getProfile(),
  });
}

export function useUpdatePatientProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePatientProfilePayload) =>
      patientApi.updateProfile(payload),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["patient-profile"] });
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Failed to update profile")),
  });
}



// // lib/hooks/use-patient-profile.ts
// "use client";

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { patientApi } from "@/lib/api/patient";

// export function usePatientProfile() {
//   return useQuery({
//     queryKey: ["patient-profile"],
//     queryFn: () => patientApi.getProfile(),
//   });
// }

// export function useUpdatePatientProfile() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (payload: Record<string, unknown>) =>
//       patientApi.updateProfile(payload),
//     onSuccess: () => {
//       toast.success("Profile updated successfully");
//       queryClient.invalidateQueries({ queryKey: ["patient-profile"] });
//     },
//     onError: (error: any) => {
//       toast.error(
//         error?.response?.data?.message || "Failed to update profile"
//       );
//     },
//   });
// }