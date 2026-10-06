// components/driver/location-pinger.tsx
"use client";

import { useEffect, useRef } from "react";
import { useDriverProfile } from "@/lib/hooks/use-driver";
import { driverApi } from "@/lib/api/driver";

/**
 * Driver on duty each 30s interval sends GPS location to backend
 */
export function LocationPinger() {
  const { data: profile } = useDriverProfile();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (profile?.isAvailable) {
      intervalRef.current = setInterval(() => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition((position) => {
          driverApi
            .updateLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
            })
            .catch(() => {
              // silently fail, showing toast to user is not needed
            });
        });
      }, 30000); // each 30s
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [profile?.isAvailable]);

  return null;
}