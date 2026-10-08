// lib/api/public.ts
import api from "./axios";
import { ApiResponse } from "@/types";

export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  capacity: number;
  operatingHours?: string;
  latitude: number;
  longitude: number;
}

export interface PlatformStats {
  totalDrivers: number;
  approvedDrivers: number;
  totalHospitals: number;
  completedTrips: number;
}

export const publicApi = {
  getHospitals: async () => {
    const { data } = await api.get<ApiResponse<Hospital[]>>(
      "/public/hospitals"
    );
    return data.data;
  },

  getStats: async () => {
    const { data } = await api.get<ApiResponse<PlatformStats>>(
      "/public/stats"
    );
    return data.data;
  },
};