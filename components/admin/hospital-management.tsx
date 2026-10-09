// components/admin/hospital-management.tsx
"use client";

import { useHospitals, useDeleteHospital } from "@/lib/hooks/use-hospital";
import { HospitalFormDialog } from "./hospital-form-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Hospital, Trash2 } from "lucide-react";

export function HospitalManagement() {
  const { data, isLoading } = useHospitals({ page: 1, limit: 20 });
  const deleteHospital = useDeleteHospital();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <HospitalFormDialog />
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : !data?.data.length ? (
        <EmptyState
          icon={Hospital}
          title="No hospitals added"
          description="Add a hospital so drivers can be routed there during dispatch."
        />
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((hospital) => (
                <TableRow key={hospital.id}>
                  <TableCell className="font-medium">{hospital.name}</TableCell>
                  <TableCell>{hospital.phone}</TableCell>
                  <TableCell>{hospital.capacity} beds</TableCell>
                  <TableCell>{hospital.operatingHours || "—"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <HospitalFormDialog hospital={hospital} />
                      <AlertDialog>
                        {/* <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                          </Button>
                        </AlertDialogTrigger> */}
                        <AlertDialogTrigger render={
    
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                          </Button>
                        }/>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Hospital?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will soft-delete &quot;{hospital.name}&quot;. This
                              action can be reversed by an administrator later.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteHospital.mutate(hospital.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}