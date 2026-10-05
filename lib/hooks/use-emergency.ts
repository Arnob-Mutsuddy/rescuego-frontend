// lib/hooks/use-emergency.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  patientApi,
  CreateEmergencyPayload,
  EmergencyListParams,
} from "@/lib/api/patient";

export function useEmergencyList(params: EmergencyListParams) {
  return useQuery({
    queryKey: ["emergencies", params],
    queryFn: () => patientApi.getEmergencies(params),
  });
}

export function useEmergencyDetail(id: string) {
  return useQuery({
    queryKey: ["emergency", id],
    queryFn: () => patientApi.getEmergency(id),
    enabled: !!id,
  });
}

export function useEmergencyStats() {
  return useQuery({
    queryKey: ["emergency-stats"],
    queryFn: () => patientApi.getStats(),
  });
}

export function useCreateEmergency() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateEmergencyPayload) =>
      patientApi.createEmergency(payload),
    onSuccess: () => {
      toast.success("Emergency request created! Help is on the way.");
      queryClient.invalidateQueries({ queryKey: ["emergencies"] });
      queryClient.invalidateQueries({ queryKey: ["emergency-stats"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to create emergency request"
      );
    },
  });
}

export function useCancelEmergency() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => patientApi.cancelEmergency(id),
    onSuccess: () => {
      toast.success("Request cancelled");
      queryClient.invalidateQueries({ queryKey: ["emergencies"] });
      queryClient.invalidateQueries({ queryKey: ["emergency-stats"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to cancel request"
      );
    },
  });
}