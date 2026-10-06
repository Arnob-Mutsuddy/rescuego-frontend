import { Skeleton } from "@/components/ui/skeleton";

export default function ProviderLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid gap-6 lg:grid-cols-3">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full lg:col-span-2" />
      </div>
    </div>
  );
}