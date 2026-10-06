// lib/hooks/use-dispatch.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { dispatchApi, TripStatus } from "@/lib/api/dispatch";

export function useAcceptDispatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (emergencyRequestId: string) =>
      dispatchApi.acceptDispatch(emergencyRequestId),
    onSuccess: () => {
      toast.success("Dispatch accepted! Head to the patient's location.");
      queryClient.invalidateQueries({ queryKey: ["assigned-emergencies"] });
    },
    onError: (error: any) =>
      toast.error(error?.response?.data?.message || "Failed to accept"),
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
    onError: (error: any) =>
      toast.error(error?.response?.data?.message || "Failed to reject"),
  });
}

export function useUpdateTripStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ tripId, status }: { tripId: string; status: TripStatus }) =>
      dispatchApi.updateTripStatus(tripId, status),
    onSuccess: (_, variables) => {
      toast.success(`Trip status updated to ${variables.status.replace(/_/g, " ")}`);
      queryClient.invalidateQueries({ queryKey: ["assigned-emergencies"] });
    },
    onError: (error: any) =>
      toast.error(error?.response?.data?.message || "Failed to update status"),
  });
}