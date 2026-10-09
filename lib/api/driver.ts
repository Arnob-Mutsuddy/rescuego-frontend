// lib/api/driver.ts
import api from "./axios";
import {
  ApiResponse,
  Ambulance,
  Driver,
  DriverStatistics,
  EmergencyRequest,
  Trip,
} from "@/types";

export interface RegisterAmbulancePayload {
  registrationNo: string;
  ambulanceType: string;
  capacity: number;
  manufacturingYear?: number;
  equipment?: string[];
}

export interface LocationPayload {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export type UpdateDriverProfilePayload = Partial<{
  fullName: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  yearsOfExperience: number;
  certification: string;
}>;

export const driverApi = {
  getProfile: async () => {
    const { data } = await api.get<ApiResponse<Driver>>("/driver/profile");
    return data.data;
  },

  updateProfile: async (payload: UpdateDriverProfilePayload) => {
    const { data } = await api.patch<ApiResponse<Driver>>(
      "/driver/profile",
      payload
    );
    return data.data;
  },

  registerAmbulance: async (payload: RegisterAmbulancePayload) => {
    const { data } = await api.post<ApiResponse<Ambulance>>(
      "/driver/ambulance/register",
      payload
    );
    return data.data;
  },

  getAmbulances: async () => {
    const { data } = await api.get<ApiResponse<Ambulance[]>>(
      "/driver/ambulance/list"
    );
    return data.data;
  },

  startDuty: async (payload: LocationPayload) => {
    const { data } = await api.post<ApiResponse<Driver>>(
      "/driver/duty/start",
      payload
    );
    return data.data;
  },

  stopDuty: async () => {
    const { data } = await api.post<ApiResponse<Driver>>("/driver/duty/stop");
    return data.data;
  },

  updateLocation: async (payload: LocationPayload) => {
    const { data } = await api.post<ApiResponse<unknown>>(
      "/driver/location/update",
      payload
    );
    return data.data;
  },

  getAssignedEmergencies: async () => {
    const { data } = await api.get<ApiResponse<EmergencyRequest[]>>(
      "/driver/emergency/assigned"
    );
    return data.data;
  },

  getTripHistory: async (params: { page?: number; limit?: number }) => {
    const { data } = await api.get<ApiResponse<Trip[]>>(
      "/driver/trip/history",
      { params }
    );
    return data;
  },

  getStatistics: async () => {
    const { data } = await api.get<ApiResponse<DriverStatistics>>(
      "/driver/statistics"
    );
    return data.data;
  },
};


// // lib/api/driver.ts
// import api from "./axios";
// import { ApiResponse } from "@/types";

// export interface RegisterAmbulancePayload {
//   registrationNo: string;
//   ambulanceType: string;
//   capacity: number;
//   manufacturingYear?: number;
//   equipment?: string[];
// }

// export interface LocationPayload {
//   latitude: number;
//   longitude: number;
//   accuracy?: number;
// }

// export const driverApi = {
//   getProfile: async () => {
//     const { data } = await api.get<ApiResponse<any>>("/driver/profile");
//     return data.data;
//   },

//   updateProfile: async (payload: Record<string, unknown>) => {
//     const { data } = await api.patch<ApiResponse<any>>(
//       "/driver/profile",
//       payload
//     );
//     return data.data;
//   },

//   registerAmbulance: async (payload: RegisterAmbulancePayload) => {
//     const { data } = await api.post<ApiResponse<any>>(
//       "/driver/ambulance/register",
//       payload
//     );
//     return data.data;
//   },

//   getAmbulances: async () => {
//     const { data } = await api.get<ApiResponse<any[]>>(
//       "/driver/ambulance/list"
//     );
//     return data.data;
//   },

//   startDuty: async (payload: LocationPayload) => {
//     const { data } = await api.post<ApiResponse<any>>(
//       "/driver/duty/start",
//       payload
//     );
//     return data.data;
//   },

//   stopDuty: async () => {
//     const { data } = await api.post<ApiResponse<any>>("/driver/duty/stop");
//     return data.data;
//   },

//   updateLocation: async (payload: LocationPayload) => {
//     const { data } = await api.post<ApiResponse<any>>(
//       "/driver/location/update",
//       payload
//     );
//     return data.data;
//   },

//   getAssignedEmergencies: async () => {
//     const { data } = await api.get<ApiResponse<any[]>>(
//       "/driver/emergency/assigned"
//     );
//     return data.data;
//   },

//   getTripHistory: async (params: { page?: number; limit?: number }) => {
//     const { data } = await api.get<ApiResponse<any[]>>(
//       "/driver/trip/history",
//       { params }
//     );
//     return data;
//   },

//   getStatistics: async () => {
//     const { data } = await api.get<ApiResponse<any>>("/driver/statistics");
//     return data.data;
//   },
// };