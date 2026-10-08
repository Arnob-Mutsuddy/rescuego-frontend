// lib/hooks/use-url-state.ts
"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 URL query params read and update for reusable hook।
 filter/pagination/search change then URL also reflect it,
 so user link copy/bookmark/share to be able to do. 
 */
export function useUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getParam = useCallback(
    (key: string) => searchParams.get(key) ?? undefined,
    [searchParams]
  );

  const setParams = useCallback(
    (updates: Record<string, string | number | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "" || value === "all") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  return { searchParams, getParam, setParams };
}