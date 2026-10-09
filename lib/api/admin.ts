// lib/api/admin.ts
import api from "./axios";
import {
  ApiResponse,
  AdminUser,
  AuditLog,
  Driver,
  EmergencyRequest,
  Hospital,
} from "@/types";

export interface DashboardStats {
  users: { total: number; patients: number; drivers: number };
  drivers: { total: number; approved: number; available: number };
  emergencies: {
    total: number;
    pending: number;
    active: number;
    completed: number;
  };
  revenue: { total: number };
  hospitals: number;
}

export type HospitalPayload = Partial<Omit<Hospital, "id">>;

export const adminApi = {
  getDashboardStats: async () => {
    const { data } = await api.get<ApiResponse<DashboardStats>>(
      "/admin/dashboard-stats"
    );
    return data.data;
  },

  getUsers: async (params: {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
  }) => {
    const { data } = await api.get<ApiResponse<AdminUser[]>>("/admin/users", {
      params,
    });
    return data;
  },

  toggleUserStatus: async (id: string) => {
    const { data } = await api.patch<ApiResponse<AdminUser>>(
      `/admin/users/${id}/toggle-status`
    );
    return data.data;
  },

  getDrivers: async (params: {
    page?: number;
    limit?: number;
    isApproved?: boolean;
  }) => {
    const { data } = await api.get<ApiResponse<Driver[]>>("/admin/drivers", {
      params,
    });
    return data;
  },

  approveDriver: async (id: string) => {
    const { data } = await api.patch<ApiResponse<Driver>>(
      `/admin/drivers/${id}/approve`
    );
    return data.data;
  },

  rejectDriver: async (id: string, reason?: string) => {
    const { data } = await api.patch<ApiResponse<Driver>>(
      `/admin/drivers/${id}/reject`,
      { reason }
    );
    return data.data;
  },

  createHospital: async (payload: HospitalPayload) => {
    const { data } = await api.post<ApiResponse<Hospital>>(
      "/admin/hospitals",
      payload
    );
    return data.data;
  },

  getHospitals: async (params: { page?: number; limit?: number }) => {
    const { data } = await api.get<ApiResponse<Hospital[]>>(
      "/admin/hospitals",
      { params }
    );
    return data;
  },

  updateHospital: async (id: string, payload: HospitalPayload) => {
    const { data } = await api.patch<ApiResponse<Hospital>>(
      `/admin/hospitals/${id}`,
      payload
    );
    return data.data;
  },

  deleteHospital: async (id: string) => {
    const { data } = await api.delete<ApiResponse<null>>(
      `/admin/hospitals/${id}`
    );
    return data;
  },

  getEmergencyRequests: async (params: {
    page?: number;
    limit?: number;
    status?: string;
    severity?: string;
  }) => {
    const { data } = await api.get<ApiResponse<EmergencyRequest[]>>(
      "/admin/emergency-requests",
      { params }
    );
    return data;
  },

  getAuditLogs: async (params: { page?: number; limit?: number }) => {
    const { data } = await api.get<ApiResponse<AuditLog[]>>(
      "/admin/audit-logs",
      { params }
    );
    return data;
  },
};



// // lib/api/admin.ts
// import api from "./axios";
// import { ApiResponse } from "@/types";

// export interface DashboardStats {
//   users: { total: number; patients: number; drivers: number };
//   drivers: { total: number; approved: number; available: number };
//   emergencies: {
//     total: number;
//     pending: number;
//     active: number;
//     completed: number;
//   };
//   revenue: { total: number };
//   hospitals: number;
// }

// export const adminApi = {
//   getDashboardStats: async () => {
//     const { data } = await api.get<ApiResponse<DashboardStats>>(
//       "/admin/dashboard-stats"
//     );
//     return data.data;
//   },

//   getUsers: async (params: {
//     page?: number;
//     limit?: number;
//     role?: string;
//     search?: string;
//   }) => {
//     const { data } = await api.get<ApiResponse<any[]>>("/admin/users", {
//       params,
//     });
//     return data;
//   },

//   toggleUserStatus: async (id: string) => {
//     const { data } = await api.patch<ApiResponse<any>>(
//       `/admin/users/${id}/toggle-status`
//     );
//     return data.data;
//   },

//   getDrivers: async (params: {
//     page?: number;
//     limit?: number;
//     isApproved?: boolean;
//   }) => {
//     const { data } = await api.get<ApiResponse<any[]>>("/admin/drivers", {
//       params,
//     });
//     return data;
//   },

//   approveDriver: async (id: string) => {
//     const { data } = await api.patch<ApiResponse<any>>(
//       `/admin/drivers/${id}/approve`
//     );
//     return data.data;
//   },

//   rejectDriver: async (id: string, reason?: string) => {
//     const { data } = await api.patch<ApiResponse<any>>(
//       `/admin/drivers/${id}/reject`,
//       { reason }
//     );
//     return data.data;
//   },

//   // Hospitals
//   createHospital: async (payload: Record<string, unknown>) => {
//     const { data } = await api.post<ApiResponse<any>>(
//       "/admin/hospitals",
//       payload
//     );
//     return data.data;
//   },

//   getHospitals: async (params: { page?: number; limit?: number }) => {
//     const { data } = await api.get<ApiResponse<any[]>>("/admin/hospitals", {
//       params,
//     });
//     return data;
//   },

//   updateHospital: async (id: string, payload: Record<string, unknown>) => {
//     const { data } = await api.patch<ApiResponse<any>>(
//       `/admin/hospitals/${id}`,
//       payload
//     );
//     return data.data;
//   },

//   deleteHospital: async (id: string) => {
//     const { data } = await api.delete<ApiResponse<null>>(
//       `/admin/hospitals/${id}`
//     );
//     return data;
//   },

//   getEmergencyRequests: async (params: {
//     page?: number;
//     limit?: number;
//     status?: string;
//     severity?: string;
//   }) => {
//     const { data } = await api.get<ApiResponse<any[]>>(
//       "/admin/emergency-requests",
//       { params }
//     );
//     return data;
//   },

//   getAuditLogs: async (params: { page?: number; limit?: number }) => {
//     const { data } = await api.get<ApiResponse<any[]>>("/admin/audit-logs", {
//       params,
//     });
//     return data;
//   },
// };