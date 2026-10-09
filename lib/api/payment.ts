// lib/api/payment.ts
import api from "./axios";
// import { ApiResponse } from "@/types";

// export interface Payment {
//   id: string;
//   amount: number;
//   currency: string;
//   status: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
//   description?: string;
//   createdAt: string;
//   emergencyRequest?: {
//     emergencyType: string;
//     severity: string;
//     createdAt: string;
//   };
// }

import { ApiResponse, Payment } from "@/types";
export type { Payment };

export interface CheckoutResponse {
  payment: Payment;
  checkoutUrl: string;
  sessionId: string;
}

export const paymentApi = {
  createCheckout: async (emergencyRequestId: string) => {
    const { data } = await api.post<ApiResponse<CheckoutResponse>>(
      "/payments/checkout",
      { emergencyRequestId }
    );
    return data.data;
  },

  getHistory: async (params: { page?: number; limit?: number }) => {
    const { data } = await api.get<ApiResponse<Payment[]>>(
      "/payments/history",
      { params }
    );
    return data;
  },

  getStatus: async (id: string) => {
    const { data } = await api.get<ApiResponse<Payment>>(`/payments/${id}`);
    return data.data;
  },
};