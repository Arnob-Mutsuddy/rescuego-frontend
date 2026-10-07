// app/admin/reports/page.tsx
"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAuditLogs, useAdminEmergencyRequests } from "@/lib/hooks/use-reports";
import { StatusBadge } from "@/components/shared/status-badge";
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
import { FileText, Siren } from "lucide-react";
import { format } from "date-fns";

function AuditLogsTab() {
  const { data, isLoading } = useAuditLogs({ page: 1, limit: 30 });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    );
  }

  if (!data?.data.length) {
    return (
      <EmptyState
        icon={FileText}
        title="No audit logs yet"
        description="Admin actions like driver approvals will be recorded here."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Admin</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Resource</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((log: any) => (
            <TableRow key={log.id}>
              <TableCell className="font-medium">
                {log.user?.fullName}
              </TableCell>
              <TableCell>{log.action.replace(/_/g, " ")}</TableCell>
              <TableCell>{log.resource}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {format(new Date(log.createdAt), "MMM d, yyyy h:mm a")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function EmergencyRequestsTab() {
  const { data, isLoading } = useAdminEmergencyRequests({ page: 1, limit: 30 });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    );
  }

  if (!data?.data.length) {
    return (
      <EmptyState
        icon={Siren}
        title="No emergency requests yet"
        description="All emergency requests across the platform will appear here."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((req: any) => (
            <TableRow key={req.id}>
              <TableCell className="font-medium">
                {req.patient?.user?.fullName}
              </TableCell>
              <TableCell>{req.driver?.user?.fullName ?? "—"}</TableCell>
              <TableCell>{req.emergencyType}</TableCell>
              <TableCell>
                <StatusBadge status={req.status} />
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {format(new Date(req.createdAt), "MMM d, yyyy h:mm a")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reports & Audit Logs</h1>
        <p className="text-sm text-muted-foreground">
          Review platform activity and emergency request history.
        </p>
      </div>

      <Tabs defaultValue="emergencies">
        <TabsList>
          <TabsTrigger value="emergencies">Emergency Requests</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>
        <TabsContent value="emergencies" className="mt-4">
          <EmergencyRequestsTab />
        </TabsContent>
        <TabsContent value="audit" className="mt-4">
          <AuditLogsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}