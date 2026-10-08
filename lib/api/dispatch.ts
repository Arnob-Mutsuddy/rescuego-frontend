// lib/api/dispatch.ts
import api from "./axios";
import { ApiResponse } from "@/types";

export type TripStatus =
  | "EN_ROUTE"
  | "ARRIVED"
  | "PATIENT_PICKED_UP"
  | "AT_HOSPITAL"
  | "COMPLETED";

export interface NearestAmbulance {
  driverId: string;
  driverName: string;
  driverPhone: string;
  distance: number;
  estimatedTime: number;
  currentLocation: { latitude: number; longitude: number };
  ambulances: any[];
}

export const dispatchApi = {
  // ADMIN SIDE
  findNearestForEmergency: async (emergencyRequestId: string, limit = 5) => {
    const { data } = await api.post<
      ApiResponse<{ emergency: any; ambulances: NearestAmbulance[] }>
    >("/dispatch/find-nearest-for-emergency", {
      emergencyRequestId,
      limit,
    });
    return data.data;
  },

  assignEmergency: async (payload: {
    emergencyRequestId: string;
    driverId: string;
    hospitalId: string;
  }) => {
    const { data } = await api.post<ApiResponse<any>>(
      "/dispatch/assign",
      payload
    );
    return data.data;
  },

  // DRIVER SIDE
  acceptDispatch: async (emergencyRequestId: string) => {
    const { data } = await api.post<ApiResponse<any>>("/dispatch/accept", {
      emergencyRequestId,
    });
    return data.data;
  },

  rejectDispatch: async (emergencyRequestId: string) => {
    const { data } = await api.post<ApiResponse<any>>("/dispatch/reject", {
      emergencyRequestId,
    });
    return data.data;
  },

  updateTripStatus: async (tripId: string, status: TripStatus) => {
    const { data } = await api.patch<ApiResponse<any>>(
      "/dispatch/trip-status",
      { tripId, status }
    );
    return data.data;
  },
};



// // lib/api/dispatch.ts
// import api from "./axios";
// import { ApiResponse } from "@/types";

// export type TripStatus =
//   | "EN_ROUTE"
//   | "ARRIVED"
//   | "PATIENT_PICKED_UP"
//   | "AT_HOSPITAL"
//   | "COMPLETED";

// export const dispatchApi = {
//   acceptDispatch: async (emergencyRequestId: string) => {
//     const { data } = await api.post<ApiResponse<any>>("/dispatch/accept", {
//       emergencyRequestId,
//     });
//     return data.data;
//   },

//   rejectDispatch: async (emergencyRequestId: string) => {
//     const { data } = await api.post<ApiResponse<any>>("/dispatch/reject", {
//       emergencyRequestId,
//     });
//     return data.data;
//   },

//   updateTripStatus: async (tripId: string, status: TripStatus) => {
//     const { data } = await api.patch<ApiResponse<any>>(
//       "/dispatch/trip-status",
//       { tripId, status }
//     );
//     return data.data;
//   },
// };