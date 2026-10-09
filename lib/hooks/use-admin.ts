// lib/hooks/use-admin.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminApi } from "@/lib/api/admin";
import { getErrorMessage } from "@/lib/error";
export function useDashboardStats() {
  return useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: () => adminApi.getDashboardStats(),
  });
}

export function useAdminUsers(params: {
  page?: number;
  limit?: number;
  role?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => adminApi.getUsers(params),
  });
}

export function useToggleUserStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminApi.toggleUserStatus(id),
    onSuccess: () => {
      toast.success("User status updated");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: any) =>
      // toast.error(error?.response?.data?.message || "Failed to update user"),
    toast.error(getErrorMessage(error, "Failed to update user"))
  });
}

export function useAdminDrivers(params: {
  page?: number;
  limit?: number;
  isApproved?: boolean;
}) {
  return useQuery({
    queryKey: ["admin-drivers", params],
    queryFn: () => adminApi.getDrivers(params),
  });
}

export function useApproveDriver() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminApi.approveDriver(id),
    onSuccess: () => {
      toast.success("Driver approved");
      queryClient.invalidateQueries({ queryKey: ["admin-drivers"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
    },
    onError: (error: any) =>
      // toast.error(error?.response?.data?.message || "Failed to approve"),
    toast.error(getErrorMessage(error, "Failed to approve"))
  });
}

export function useRejectDriver() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      adminApi.rejectDriver(id, reason),
    onSuccess: () => {
      toast.success("Driver rejected");
      queryClient.invalidateQueries({ queryKey: ["admin-drivers"] });
    },
    onError: (error: any) =>
      // toast.error(error?.response?.data?.message || "Failed to reject"),
      toast.error(getErrorMessage(error, "Failed to reject"))
  });
}