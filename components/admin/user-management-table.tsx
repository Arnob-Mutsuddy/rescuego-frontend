// components/admin/user-management-table.tsx
"use client";

import { Suspense, useState, useEffect } from "react";
import { useAdminUsers, useToggleUserStatus } from "@/lib/hooks/use-admin";
import { useUrlState } from "@/lib/hooks/use-url-state";
import { useDebouncedValue } from "@/lib/hooks/use-debounced-value";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import { Users, Search, ChevronLeft, ChevronRight } from "lucide-react";

function UserManagementContent() {
  const { getParam, setParams } = useUrlState();

  const role = getParam("role");
  const page = Number(getParam("page") ?? "1");
  const urlSearch = getParam("search") ?? "";

  const [searchInput, setSearchInput] = useState(urlSearch);
  const debouncedSearch = useDebouncedValue(searchInput, 400);

  useEffect(() => {
    if (debouncedSearch !== urlSearch) {
      setParams({ search: debouncedSearch || undefined, page: undefined });
    }

  }, [debouncedSearch]);

  const { data, isLoading } = useAdminUsers({
    page,
    limit: 10,
    role: role === "all" ? undefined : role,
    search: urlSearch || undefined,
  });

  const toggleStatus = useToggleUserStatus();
  const pagination = data?.pagination;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or phone"
            className="pl-9"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <Select
          value={role ?? "all"}
        onValueChange={(value) => {
            if (value !== null) {
                setParams({
                role: value === "all" ? undefined : value,
                page: undefined,
                });
            }
        }}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="PATIENT">Patient</SelectItem>
            <SelectItem value="DRIVER">Driver</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
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
          title="No users found"
          description="Try adjusting your search or filter."
        />
      ) : (
        <>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((user: any) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.fullName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.isActive ? "default" : "secondary"}>
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={toggleStatus.isPending}
                        onClick={() => toggleStatus.mutate(user.id)}
                      >
                        {user.isActive ? "Deactivate" : "Activate"}
                      </Button>
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

export function UserManagementTable() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full" />}>
      <UserManagementContent />
    </Suspense>
  );
}



// // components/admin/user-management-table.tsx
// "use client";

// import { useState } from "react";
// import { useAdminUsers, useToggleUserStatus } from "@/lib/hooks/use-admin";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Skeleton } from "@/components/ui/skeleton";
// import { EmptyState } from "@/components/shared/empty-state";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// // import { useDebouncedValue } from "@/lib/hooks/use-debounced-value";
// import { Users, Search } from "lucide-react";
// import { useDebouncedValue } from "@/lib/hooks/use-debounced-value";

// export function UserManagementTable() {
//   const [search, setSearch] = useState("");
//   const [role, setRole] = useState<string>("all");
//   const debouncedSearch = useDebouncedValue(search, 400);

//   const { data, isLoading } = useAdminUsers({
//     page: 1,
//     limit: 20,
//     role: role === "all" ? undefined : role,
//     search: debouncedSearch || undefined,
//   });

//   const toggleStatus = useToggleUserStatus();

//   return (
//     <div className="space-y-4">
//       <div className="flex flex-col gap-3 sm:flex-row">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//           <Input
//             placeholder="Search by name, email, or phone"
//             className="pl-9"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         {/* <Select value={role} onValueChange={setRole}> */}
//         <Select
//           value={role}
//           onValueChange={(value) => {
//             if (value !== null) {
//               setRole(value);
//             }
//           }}>
//           <SelectTrigger className="w-full sm:w-48">
//             <SelectValue placeholder="Filter by role" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Roles</SelectItem>
//             <SelectItem value="PATIENT">Patient</SelectItem>
//             <SelectItem value="DRIVER">Driver</SelectItem>
//             <SelectItem value="ADMIN">Admin</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {isLoading ? (
//         <div className="space-y-3">
//           {[...Array(3)].map((_, i) => (
//             <Skeleton key={i} className="h-14 w-full" />
//           ))}
//         </div>
//       ) : !data?.data.length ? (
//         <EmptyState
//           icon={Users}
//           title="No users found"
//           description="Try adjusting your search or filter."
//         />
//       ) : (
//         <div className="overflow-x-auto rounded-md border">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Role</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead className="text-right">Action</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {data.data.map((user: any) => (
//                 <TableRow key={user.id}>
//                   <TableCell className="font-medium">{user.fullName}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>
//                     <Badge variant="outline">{user.role}</Badge>
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant={user.isActive ? "default" : "secondary"}>
//                       {user.isActive ? "Active" : "Inactive"}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       disabled={toggleStatus.isPending}
//                       onClick={() => toggleStatus.mutate(user.id)}
//                     >
//                       {user.isActive ? "Deactivate" : "Activate"}
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       )}
//     </div>
//   );
// }