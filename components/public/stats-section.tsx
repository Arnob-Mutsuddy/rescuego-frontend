// components/public/stats-section.tsx
"use client";

import { usePlatformStats } from "@/lib/hooks/use-public";
import { Skeleton } from "@/components/ui/skeleton";
import { Ambulance, Hospital, CheckCircle2 } from "lucide-react";

export function StatsSection() {
  const { data: stats, isLoading } = usePlatformStats();

  const items = [
    {
      icon: Ambulance,
      label: "Verified Drivers",
      value: stats?.approvedDrivers ?? 0,
    },
    {
      icon: Hospital,
      label: "Partner Hospitals",
      value: stats?.totalHospitals ?? 0,
    },
    {
      icon: CheckCircle2,
      label: "Completed Trips",
      value: stats?.completedTrips ?? 0,
    },
  ];

  return (
    <section className="bg-primary/5 py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3">
        {isLoading
          ? [...Array(3)].map((_, i) => (
              <Skeleton key={i} className="mx-auto h-24 w-40" />
            ))
          : items.map((item) => (
              <div key={item.label} className="text-center">
                <item.icon className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-2 text-3xl font-bold">{item.value}+</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
      </div>
    </section>
  );
}