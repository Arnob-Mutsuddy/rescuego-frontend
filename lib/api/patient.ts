
// lib/api/patient.ts
import api from "./axios";
import { ApiResponse, EmergencyRequest, Patient, Severity } from "@/types";

export interface CreateEmergencyPayload {
  emergencyType: string;
  severity: Severity;
  patientLat: number;
  patientLng: number;
  patientAddress?: string;
  accuracy?: number;
  description?: string;
}

export interface EmergencyListParams {
  page?: number;
  limit?: number;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export type UpdatePatientProfilePayload = Partial<{
  fullName: string;
  phone: string;
  bloodGroup: string;
  medicalHistory: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}>;

export const patientApi = {
  getProfile: async () => {
    const { data } = await api.get<ApiResponse<Patient>>("/patient/profile");
    return data.data;
  },

  updateProfile: async (payload: UpdatePatientProfilePayload) => {
    const { data } = await api.patch<ApiResponse<Patient>>(
      "/patient/profile",
      payload
    );
    return data.data;
  },

  createEmergency: async (payload: CreateEmergencyPayload) => {
    const { data } = await api.post<ApiResponse<EmergencyRequest>>(
      "/patient/emergency/create",
      payload
    );
    return data.data;
  },

  getEmergencies: async (params: EmergencyListParams) => {
    const { data } = await api.get<ApiResponse<EmergencyRequest[]>>(
      "/patient/emergency/list",
      { params }
    );
    return data;
  },

  getEmergency: async (id: string) => {
    const { data } = await api.get<ApiResponse<EmergencyRequest>>(
      `/patient/emergency/${id}`
    );
    return data.data;
  },

  cancelEmergency: async (id: string) => {
    const { data } = await api.patch<ApiResponse<EmergencyRequest>>(
      `/patient/emergency/${id}/cancel`
    );
    return data.data;
  },

  getStats: async () => {
    const { data } = await api.get<ApiResponse<Record<string, number>>>(
      "/patient/emergency/stats/summary"
    );
    return data.data;
  },
};


// // lib/api/patient.ts

// import api from "./axios";
// import { ApiResponse, EmergencyRequest } from "@/types";

// export interface CreateEmergencyPayload {
//   emergencyType: string;
//   severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
//   patientLat: number;
//   patientLng: number;
//   patientAddress?: string;
//   accuracy?: number;
//   description?: string;
// }

// export interface EmergencyListParams {
//   page?: number;
//   limit?: number;
//   status?: string;
//   sortBy?: string;
//   sortOrder?: "asc" | "desc";
// }

// export const patientApi = {
//   getProfile: async () => {
//     const { data } = await api.get<ApiResponse<any>>("/patient/profile");
//     return data.data;
//   },

//   updateProfile: async (payload: Record<string, unknown>) => {
//     const { data } = await api.patch<ApiResponse<any>>(
//       "/patient/profile",
//       payload
//     );
//     return data.data;
//   },

//   createEmergency: async (payload: CreateEmergencyPayload) => {
//     const { data } = await api.post<ApiResponse<EmergencyRequest>>(
//       "/patient/emergency/create",
//       payload
//     );
//     return data.data;
//   },

//   getEmergencies: async (params: EmergencyListParams) => {
//     const { data } = await api.get<ApiResponse<EmergencyRequest[]>>(
//       "/patient/emergency/list",
//       { params }
//     );
//     return data;
//   },

//   getEmergency: async (id: string) => {
//     const { data } = await api.get<ApiResponse<EmergencyRequest>>(
//       `/patient/emergency/${id}`
//     );
//     return data.data;
//   },

//   cancelEmergency: async (id: string) => {
//     const { data } = await api.patch<ApiResponse<EmergencyRequest>>(
//       `/patient/emergency/${id}/cancel`
//     );
//     return data.data;
//   },

//   getStats: async () => {
//     const { data } = await api.get<ApiResponse<Record<string, number>>>(
//       "/patient/emergency/stats/summary"
//     );
//     return data.data;
//   },
// };