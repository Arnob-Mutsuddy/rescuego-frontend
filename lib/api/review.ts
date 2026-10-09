// lib/api/review.ts
import api from "./axios";
import { ApiResponse, Review } from "@/types";

export interface CreateReviewPayload {
  emergencyRequestId: string;
  driverId: string;
  rating: number;
  comment?: string;
  cleanliness?: number;
  professionalism?: number;
  communication?: number;
}

export const reviewApi = {
  createReview: async (payload: CreateReviewPayload) => {
    const { data } = await api.post<ApiResponse<Review>>("/reviews", payload);
    return data.data;
  },

  getMyReviews: async (params: { page?: number; limit?: number }) => {
    const { data } = await api.get<ApiResponse<Review[]>>(
      "/reviews/my-reviews",
      { params }
    );
    return data;
  },

  getDriverReviews: async (
    driverId: string,
    params: { page?: number; limit?: number }
  ) => {
    const { data } = await api.get<ApiResponse<Review[]>>(
      `/reviews/driver/${driverId}`,
      { params }
    );
    return data;
  },
};


// // lib/api/review.ts
// import api from "./axios";
// import { ApiResponse } from "@/types";

// export interface CreateReviewPayload {
//   emergencyRequestId: string;
//   driverId: string;
//   rating: number;
//   comment?: string;
//   cleanliness?: number;
//   professionalism?: number;
//   communication?: number;
// }

// export const reviewApi = {
//   createReview: async (payload: CreateReviewPayload) => {
//     const { data } = await api.post<ApiResponse<any>>("/reviews", payload);
//     return data.data;
//   },

//   getMyReviews: async (params: { page?: number; limit?: number }) => {
//     const { data } = await api.get<ApiResponse<any[]>>(
//       "/reviews/my-reviews",
//       { params }
//     );
//     return data;
//   },

//   getDriverReviews: async (
//     driverId: string,
//     params: { page?: number; limit?: number }
//   ) => {
//     const { data } = await api.get<ApiResponse<any[]>>(
//       `/reviews/driver/${driverId}`,
//       { params }
//     );
//     return data;
//   },
// };