"use client";

import { useAuthStore } from "@/store/auth-store";

export function useCurrentUser() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return { user, isAuthenticated };
}