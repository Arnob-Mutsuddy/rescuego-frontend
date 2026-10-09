// lib/hooks/use-driver.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  driverApi,
  RegisterAmbulancePayload,
  LocationPayload,
  UpdateDriverProfilePayload,
} from "@/lib/api/driver";
import { getErrorMessage } from "@/lib/error";

export function useDriverProfile() {
  return useQuery({
    queryKey: ["driver-profile"],
    queryFn: () => driverApi.getProfile(),
  });
}

export function useUpdateDriverProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateDriverProfilePayload) =>
      driverApi.updateProfile(payload),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["driver-profile"] });
    },
    onError: (error) => toast.error(getErrorMessage(error, "Update failed")),
  });
}

export function useRegisterAmbulance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RegisterAmbulancePayload) =>
      driverApi.registerAmbulance(payload),
    onSuccess: () => {
      toast.success("Ambulance registered successfully");
      queryClient.invalidateQueries({ queryKey: ["driver-profile"] });
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Failed to register ambulance")),
  });
}

export function useStartDuty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LocationPayload) => driverApi.startDuty(payload),
    onSuccess: () => {
      toast.success("You are now on duty");
      queryClient.invalidateQueries({ queryKey: ["driver-profile"] });
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Failed to start duty")),
  });
}

export function useStopDuty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => driverApi.stopDuty(),
    onSuccess: () => {
      toast.success("Duty stopped");
      queryClient.invalidateQueries({ queryKey: ["driver-profile"] });
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Failed to stop duty")),
  });
}

export function useAssignedEmergencies() {
  return useQuery({
    queryKey: ["assigned-emergencies"],
    queryFn: () => driverApi.getAssignedEmergencies(),
    refetchInterval: 15000,
  });
}

export function useTripHistory(params: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["trip-history", params],
    queryFn: () => driverApi.getTripHistory(params),
  });
}

export function useDriverStatistics() {
  return useQuery({
    queryKey: ["driver-statistics"],
    queryFn: () => driverApi.getStatistics(),
  });
}



// // lib/hooks/use-driver.ts
// "use client";

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import {
//   driverApi,
//   RegisterAmbulancePayload,
//   LocationPayload,
// } from "@/lib/api/driver";

// export function useDriverProfile() {
//   return useQuery({
//     queryKey: ["driver-profile"],
//     queryFn: () => driverApi.getProfile(),
//   });
// }

// export function useUpdateDriverProfile() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (payload: Record<string, unknown>) =>
//       driverApi.updateProfile(payload),
//     onSuccess: () => {
//       toast.success("Profile updated successfully");
//       queryClient.invalidateQueries({ queryKey: ["driver-profile"] });
//     },
//     onError: (error: any) =>
//       toast.error(error?.response?.data?.message || "Update failed"),
//   });
// }

// export function useRegisterAmbulance() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (payload: RegisterAmbulancePayload) =>
//       driverApi.registerAmbulance(payload),
//     onSuccess: () => {
//       toast.success("Ambulance registered successfully");
//       queryClient.invalidateQueries({ queryKey: ["driver-profile"] });
//     },
//     onError: (error: any) =>
//       toast.error(
//         error?.response?.data?.message || "Failed to register ambulance"
//       ),
//   });
// }

// export function useStartDuty() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (payload: LocationPayload) => driverApi.startDuty(payload),
//     onSuccess: () => {
//       toast.success("You are now on duty");
//       queryClient.invalidateQueries({ queryKey: ["driver-profile"] });
//     },
//     onError: (error: any) =>
//       toast.error(error?.response?.data?.message || "Failed to start duty"),
//   });
// }

// export function useStopDuty() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: () => driverApi.stopDuty(),
//     onSuccess: () => {
//       toast.success("Duty stopped");
//       queryClient.invalidateQueries({ queryKey: ["driver-profile"] });
//     },
//     onError: (error: any) =>
//       toast.error(error?.response?.data?.message || "Failed to stop duty"),
//   });
// }

// export function useAssignedEmergencies() {
//   return useQuery({
//     queryKey: ["assigned-emergencies"],
//     queryFn: () => driverApi.getAssignedEmergencies(),
//     refetchInterval: 30000, // each 30sec check new assignment
//   });
// }

// export function useTripHistory(params: { page?: number; limit?: number }) {
//   return useQuery({
//     queryKey: ["trip-history", params],
//     queryFn: () => driverApi.getTripHistory(params),
//   });
// }

// export function useDriverStatistics() {
//   return useQuery({
//     queryKey: ["driver-statistics"],
//     queryFn: () => driverApi.getStatistics(),
//   });
// }