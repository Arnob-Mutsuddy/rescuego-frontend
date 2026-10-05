// components/shared/status-badge.tsx
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  ASSIGNED: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  ACCEPTED: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  EN_ROUTE: "bg-indigo-100 text-indigo-800 hover:bg-indigo-100",
  ARRIVED: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  PATIENT_PICKED_UP: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  AT_HOSPITAL: "bg-orange-100 text-orange-800 hover:bg-orange-100",
  COMPLETED: "bg-green-100 text-green-800 hover:bg-green-100",
  CANCELLED: "bg-red-100 text-red-800 hover:bg-red-100",
  SUCCESS: "bg-green-100 text-green-800 hover:bg-green-100",
  FAILED: "bg-red-100 text-red-800 hover:bg-red-100",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={cn("border-0 font-medium", statusStyles[status])}
    >
      {status.replace(/_/g, " ")}
    </Badge>
  );
}