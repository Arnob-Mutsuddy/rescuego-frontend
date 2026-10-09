// lib/hooks/use-hospital.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminApi } from "@/lib/api/admin";
import { getErrorMessage } from "@/lib/error"

export function useHospitals(params: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["hospitals", params],
    queryFn: () => adminApi.getHospitals(params),
  });
}

export function useCreateHospital() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      adminApi.createHospital(payload),
    onSuccess: () => {
      toast.success("Hospital created successfully");
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
    },
    onError: (error: any) =>
      // toast.error(
      //   error?.response?.data?.message || "Failed to create hospital"
      // ),
    toast.error(getErrorMessage(error, "Failed to create hospital"))
  });
}

export function useUpdateHospital() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Record<string, unknown>;
    }) => adminApi.updateHospital(id, payload),
    onSuccess: () => {
      toast.success("Hospital updated successfully");
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
    },
    onError: (error: any) =>
      // toast.error(
      //   error?.response?.data?.message || "Failed to update hospital"
      // ),
      toast.error(getErrorMessage(error, "Failed to update hospital"))
  });
}

export function useDeleteHospital() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminApi.deleteHospital(id),
    onSuccess: () => {
      toast.success("Hospital deleted");
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
    },
    onError: (error: any) =>
      // toast.error(
      //   error?.response?.data?.message || "Failed to delete hospital"
      // ),
      toast.error(getErrorMessage(error, "Failed to delete hospital"))
  });
}