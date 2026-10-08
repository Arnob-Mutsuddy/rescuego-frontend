// components/public/hospital-network-section.tsx
"use client";

import { usePublicHospitals } from "@/lib/hooks/use-public";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Hospital as HospitalIcon, Phone, Bed, Clock } from "lucide-react";

export function HospitalNetworkSection() {
  const { data: hospitals, isLoading } = usePublicHospitals();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Our Partner Hospitals</h2>
        <p className="mt-2 text-muted-foreground">
          Trusted hospitals connected to our emergency network.
        </p>
      </div>

      {isLoading ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      ) : !hospitals?.length ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Hospital network information coming soon.
        </p>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hospitals.map((hospital) => (
            <Card key={hospital.id}>
              <CardContent className="space-y-2 pt-6">
                <div className="flex items-start gap-2">
                  <HospitalIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <h3 className="font-semibold">{hospital.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {hospital.address}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" /> {hospital.phone}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Bed className="h-3.5 w-3.5" /> {hospital.capacity} beds
                  </span>
                  {hospital.operatingHours && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {hospital.operatingHours}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}