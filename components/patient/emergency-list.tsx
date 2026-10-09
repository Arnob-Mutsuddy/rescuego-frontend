// components/patient/emergency-list.tsx
"use client";

import { Suspense } from "react";
import { useEmergencyList, useCancelEmergency } from "@/lib/hooks/use-emergency";
import { useUrlState } from "@/lib/hooks/use-url-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Siren, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { useCreateCheckout } from "@/lib/hooks/use-payment";
import { ReviewDialog } from "./review-dialog";

function EmergencyListContent() {
  const { getParam, setParams } = useUrlState();

  const status = getParam("status");
  const page = Number(getParam("page") ?? "1");

  const { data, isLoading } = useEmergencyList({
    page,
    limit: 10,
    status,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const cancelMutation = useCancelEmergency();
  const checkoutMutation = useCreateCheckout();

  const emergencies = data?.data ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select
          value={status ?? "all"}
          // onValueChange={(value) => setParams({ status: value, page: undefined })}
          onValueChange={(value) => {
            if (value !== null) {
              setParams({
                status: value === "all" ? undefined : value,
                page: undefined,
              });
            }
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="ASSIGNED">Assigned</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : emergencies.length === 0 ? (
        <EmptyState
          icon={Siren}
          title="No emergency requests found"
          description="When you request an ambulance, it will appear here."
        />
      ) : (
        <>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emergencies.map((emergency) => (
                  <TableRow key={emergency.id}>
                    <TableCell className="font-medium">
                      {emergency.emergencyType}
                    </TableCell>
                    <TableCell>{emergency.severity}</TableCell>
                    <TableCell>
                      <StatusBadge status={emergency.status} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(emergency.createdAt), "MMM d, yyyy h:mm a")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {["PENDING", "ASSIGNED"].includes(emergency.status) && (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={cancelMutation.isPending}
                            onClick={() => cancelMutation.mutate(emergency.id)}
                          >
                            Cancel
                          </Button>
                        )}
                        {/* {emergency.status === "COMPLETED" && (
                          <Button
                            size="sm"
                            disabled={checkoutMutation.isPending}
                            onClick={() =>
                              checkoutMutation.mutate(emergency.id)
                            }
                          >
                            Pay Now
                          </Button>
                        )} */}
                        {emergency.status === "COMPLETED" && (
                            <>
                                <Button
                                    size="sm"
                                    disabled={checkoutMutation.isPending}
                                    onClick={() => checkoutMutation.mutate(emergency.id)}
                                >
                                    Pay Now
                                </Button>

                                {/* {emergency.driver && (
                                    <ReviewDialog
                                        emergencyRequestId={emergency.id}
                                        driverId={emergency.driverId}
                                        driverName={emergency.driver?.user?.fullName ?? "Driver"}
                                    />
                                )} */}
                                {emergency.status === "COMPLETED" && emergency.driverId && (
                                    <ReviewDialog
                                        emergencyRequestId={emergency.id}
                                        driverId={emergency.driverId}
                                        driverName={emergency.driver?.user.fullName ?? "Driver"}
                                    />
                                )}
                            </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {pagination && pagination.pages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Page {pagination.page} of {pagination.pages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setParams({ page: page - 1 })}
                >
                  <ChevronLeft className="h-4 w-4" /> Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= pagination.pages}
                  onClick={() => setParams({ page: page + 1 })}
                >
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function EmergencyList() {
  return (
    <Suspense fallback={<Skeleton className="h-64 w-full" />}>
      <EmergencyListContent />
    </Suspense>
  );
}


// // components/patient/emergency-list.tsx
// "use client";

// import { useEmergencyList, useCancelEmergency } from "@/lib/hooks/use-emergency";
// import { StatusBadge } from "@/components/shared/status-badge";
// import { EmptyState } from "@/components/shared/empty-state";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Siren } from "lucide-react";
// import { format } from "date-fns";

// import { useCreateCheckout } from "@/lib/hooks/use-payment";

// export function EmergencyList({ status }: { status?: string }) {
//   const { data, isLoading } = useEmergencyList({
//     page: 1,
//     limit: 10,
//     status,
//     sortBy: "createdAt",
//     sortOrder: "desc",
//   });

//   const cancelMutation = useCancelEmergency();

//   const checkoutMutation = useCreateCheckout();

//   if (isLoading) {
//     return (
//       <div className="space-y-3">
//         {[...Array(3)].map((_, i) => (
//           <Skeleton key={i} className="h-16 w-full" />
//         ))}
//       </div>
//     );
//   }

//   const emergencies = data?.data ?? [];

//   if (emergencies.length === 0) {
//     return (
//       <EmptyState
//         icon={Siren}
//         title="No emergency requests found"
//         description="When you request an ambulance, it will appear here."
//       />
//     );
//   }

//   return (
//     <div className="overflow-x-auto rounded-md border">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Type</TableHead>
//             <TableHead>Severity</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {emergencies.map((emergency: any) => (
//             <TableRow key={emergency.id}>
//               <TableCell className="font-medium">
//                 {emergency.emergencyType}
//               </TableCell>
//               <TableCell>{emergency.severity}</TableCell>
//               <TableCell>
//                 <StatusBadge status={emergency.status} />
//               </TableCell>
//               <TableCell className="text-sm text-muted-foreground">
//                 {format(new Date(emergency.createdAt), "MMM d, yyyy h:mm a")}
//               </TableCell>
//               {/* <TableCell className="text-right">
//                 {["PENDING", "ASSIGNED"].includes(emergency.status) && (
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     disabled={cancelMutation.isPending}
//                     onClick={() => cancelMutation.mutate(emergency.id)}
//                   >
//                     Cancel
//                   </Button>
//                 )}
//               </TableCell> */}
//               <TableCell className="text-right">
//                 {["PENDING", "ASSIGNED"].includes(emergency.status) && (
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       disabled={cancelMutation.isPending}
//                       onClick={() => cancelMutation.mutate(emergency.id)}
//                     >
//                       Cancel
//                     </Button>
//                   )}
//                 {emergency.status === "COMPLETED" && (
//                     <Button
//                       size="sm"
//                       disabled={checkoutMutation.isPending}
//                       onClick={() => checkoutMutation.mutate(emergency.id)}
//                     >
//                       Pay Now
//                     </Button>
//                 )}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }