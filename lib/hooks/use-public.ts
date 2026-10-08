// lib/hooks/use-public.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { publicApi } from "@/lib/api/public";

export function usePublicHospitals() {
  return useQuery({
    queryKey: ["public-hospitals"],
    queryFn: () => publicApi.getHospitals(),
  });
}

export function usePlatformStats() {
  return useQuery({
    queryKey: ["platform-stats"],
    queryFn: () => publicApi.getStats(),
  });
}