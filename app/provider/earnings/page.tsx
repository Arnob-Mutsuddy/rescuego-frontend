// app/provider/earnings/page.tsx
"use client";

import { useDriverStatistics, useTripHistory } from "@/lib/hooks/use-driver";
import { StatCard } from "@/components/shared/stat-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Route, CheckCircle2, Star, Gauge, History } from "lucide-react";
import { format } from "date-fns";

export default function DriverEarningsPage() {
  const { data: stats, isLoading: statsLoading } = useDriverStatistics();
  const { data: trips, isLoading: tripsLoading } = useTripHistory({
    page: 1,
    limit: 20,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Earnings & Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Your performance overview and completed trip history.
        </p>
      </div>

      {statsLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Trips"
            value={stats?.totalTrips ?? 0}
            icon={Route}
          />
          <StatCard
            title="Completed"
            value={stats?.completedTrips ?? 0}
            icon={CheckCircle2}
          />
          <StatCard
            title="Total Distance"
            value={`${(stats?.totalDistance ?? 0).toFixed(1)} km`}
            icon={Gauge}
          />
          <StatCard
            title="Average Rating"
            value={(stats?.averageRating ?? 0).toFixed(1)}
            description={`${stats?.reviewCount ?? 0} reviews`}
            icon={Star}
          />
        </div>
      )}

      <div>
        <h2 className="mb-3 text-lg font-semibold">Trip History</h2>
        {tripsLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : !trips?.data.length ? (
          <EmptyState
            icon={History}
            title="No completed trips yet"
            description="Your completed trips will appear here."
          />
        ) : (
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Distance</TableHead>
                  <TableHead>Hospital</TableHead>
                  <TableHead>Completed At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trips.data.map((trip: any) => (
                  <TableRow key={trip.id}>
                    <TableCell className="font-medium">
                      {trip.emergencyRequest?.patient?.user?.fullName}
                    </TableCell>
                    <TableCell>{trip.distance?.toFixed(1)} km</TableCell>
                    <TableCell>{trip.hospital?.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {trip.completedAt
                        ? format(new Date(trip.completedAt), "MMM d, yyyy h:mm a")
                        : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}