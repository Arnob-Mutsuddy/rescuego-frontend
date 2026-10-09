// lib/hooks/use-dispatch.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { dispatchApi, TripStatus } from "@/lib/api/dispatch";
import { getErrorMessage } from "@/lib/error";
// ============== ADMIN SIDE ==============

export function useFindNearestForEmergency() {
  return useMutation({
    mutationFn: ({
      emergencyRequestId,
      limit,
    }: {
      emergencyRequestId: string;
      limit?: number;
    }) => dispatchApi.findNearestForEmergency(emergencyRequestId, limit),
    onError: (error) =>
      toast.error(
        // error?.response?.data?.message || "Failed to find nearby ambulances"
        getErrorMessage(error, "Failed to find nearby ambulances")
      ),
  });
}

export function useAssignEmergency() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dispatchApi.assignEmergency,
    onSuccess: () => {
      toast.success("Emergency assigned to driver successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-emergency-requests"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
    },
    onError: (error) =>
      // toast.error(error?.response?.data?.message || "Failed to assign"),
    toast.error(getErrorMessage(error, "Failed to assign"))
  });
}

// ============== DRIVER SIDE ==============

export function useAcceptDispatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (emergencyRequestId: string) =>
      dispatchApi.acceptDispatch(emergencyRequestId),
    onSuccess: () => {
      toast.success("Dispatch accepted! Head to the patient's location.");
      queryClient.invalidateQueries({ queryKey: ["assigned-emergencies"] });
    },
    onError: (error) =>
      // toast.error(error?.response?.data?.message || "Failed to accept"),
    toast.error(getErrorMessage(error, "Failed to accept"))
  });
}

export function useRejectDispatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (emergencyRequestId: string) =>
      dispatchApi.rejectDispatch(emergencyRequestId),
    onSuccess: () => {
      toast.success("Dispatch rejected");
      queryClient.invalidateQueries({ queryKey: ["assigned-emergencies"] });
    },
    onError: (error) =>
      // toast.error(error?.response?.data?.message || "Failed to reject"),
    toast.error(getErrorMessage(error, "Failed to reject"))
  });
}

export function useUpdateTripStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ tripId, status }: { tripId: string; status: TripStatus }) =>
      dispatchApi.updateTripStatus(tripId, status),
    onSuccess: (_, variables) => {
      toast.success(
        `Trip status updated to ${variables.status.replace(/_/g, " ")}`
      );
      queryClient.invalidateQueries({ queryKey: ["assigned-emergencies"] });
    },
    onError: (error) =>
      // toast.error(error?.response?.data?.message || "Failed to update status"),
      toast.error(getErrorMessage(error, "Failed to update status"))
  });
}


// // lib/hooks/use-dispatch.ts
// "use client";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { dispatchApi, TripStatus } from "@/lib/api/dispatch";

// export function useAcceptDispatch() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (emergencyRequestId: string) =>
//       dispatchApi.acceptDispatch(emergencyRequestId),
//     onSuccess: () => {
//       toast.success("Dispatch accepted! Head to the patient's location.");
//       queryClient.invalidateQueries({ queryKey: ["assigned-emergencies"] });
//     },
//     onError: (error: any) =>
//       toast.error(error?.response?.data?.message || "Failed to accept"),
//   });
// }

// export function useRejectDispatch() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (emergencyRequestId: string) =>
//       dispatchApi.rejectDispatch(emergencyRequestId),
//     onSuccess: () => {
//       toast.success("Dispatch rejected");
//       queryClient.invalidateQueries({ queryKey: ["assigned-emergencies"] });
//     },
//     onError: (error: any) =>
//       toast.error(error?.response?.data?.message || "Failed to reject"),
//   });
// }

// export function useUpdateTripStatus() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ tripId, status }: { tripId: string; status: TripStatus }) =>
//       dispatchApi.updateTripStatus(tripId, status),
//     onSuccess: (_, variables) => {
//       toast.success(`Trip status updated to ${variables.status.replace(/_/g, " ")}`);
//       queryClient.invalidateQueries({ queryKey: ["assigned-emergencies"] });
//     },
//     onError: (error: any) =>
//       toast.error(error?.response?.data?.message || "Failed to update status"),
//   });
// }