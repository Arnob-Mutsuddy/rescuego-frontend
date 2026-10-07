// lib/hooks/use-reports.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";

export function useAuditLogs(params: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["audit-logs", params],
    queryFn: () => adminApi.getAuditLogs(params),
  });
}

export function useAdminEmergencyRequests(params: {
  page?: number;
  limit?: number;
  status?: string;
  severity?: string;
}) {
  return useQuery({
    queryKey: ["admin-emergency-requests", params],
    queryFn: () => adminApi.getEmergencyRequests(params),
  });
}