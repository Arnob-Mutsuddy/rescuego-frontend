import { Skeleton } from "@/components/ui/skeleton";

export default function DriverProfileLoading() {
  return (
    <div className="max-w-3xl space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-80 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}