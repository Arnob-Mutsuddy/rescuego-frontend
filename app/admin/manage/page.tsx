// app/admin/manage/page.tsx
"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { DriverApprovalTable } from "@/components/admin/driver-approval-table";
import { UserManagementTable } from "@/components/admin/user-management-table";
import { HospitalManagement } from "@/components/admin/hospital-management";
// import { HospitalManagement } from "@/components/admin/hospital-management";

export default function AdminManagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Resources</h1>
        <p className="text-sm text-muted-foreground">
          Approve drivers, manage users, and maintain hospital records.
        </p>
      </div>

      <Tabs defaultValue="drivers">
        <TabsList>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
        </TabsList>
        <TabsContent value="drivers" className="mt-4">
          <DriverApprovalTable />
        </TabsContent>
        <TabsContent value="users" className="mt-4">
          <UserManagementTable />
        </TabsContent>
        <TabsContent value="hospitals" className="mt-4">
          <HospitalManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}