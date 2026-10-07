// components/admin/driver-approval-table.tsx
"use client";

import { useState } from "react";
import {
  useAdminDrivers,
  useApproveDriver,
  useRejectDriver,
} from "@/lib/hooks/use-admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users } from "lucide-react";

export function DriverApprovalTable() {
  const [filter, setFilter] = useState<string>("all");

  const { data, isLoading } = useAdminDrivers({
    page: 1,
    limit: 20,
    isApproved: filter === "all" ? undefined : filter === "approved",
  });

  const approveMutation = useApproveDriver();
  const rejectMutation = useRejectDriver();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        {/* <Select value={filter} onValueChange={setFilter}> */}
        <Select
          value={filter}
          onValueChange={(value) => value !== null && setFilter(value)}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter drivers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Drivers</SelectItem>
            <SelectItem value="pending">Pending Approval</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : !data?.data.length ? (
        <EmptyState
          icon={Users}
          title="No drivers found"
          description="No drivers match this filter."
        />
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>License</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((driver: any) => (
                <TableRow key={driver.id}>
                  <TableCell className="font-medium">
                    {driver.user?.fullName}
                  </TableCell>
                  <TableCell>{driver.user?.phone}</TableCell>
                  <TableCell>{driver.licenseNumber || "—"}</TableCell>
                  <TableCell>
                    <Badge variant={driver.isApproved ? "default" : "secondary"}>
                      {driver.isApproved ? "Approved" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {!driver.isApproved ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          disabled={approveMutation.isPending}
                          onClick={() => approveMutation.mutate(driver.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={rejectMutation.isPending}
                          onClick={() =>
                            rejectMutation.mutate({ id: driver.id })
                          }
                        >
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={rejectMutation.isPending}
                        onClick={() => rejectMutation.mutate({ id: driver.id })}
                      >
                        Revoke
                      </Button>
                    )}
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