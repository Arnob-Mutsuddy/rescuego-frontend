// lib/api/auth.ts
import api from "./axios";
import { ApiResponse, AuthResponse, User, UserRole } from "@/types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
}

export const authApi = {
  login: async (payload: LoginPayload) => {
    const { data } = await api.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      payload
    );
    return data.data;
  },

  register: async (payload: RegisterPayload) => {
    const { data } = await api.post<ApiResponse<AuthResponse>>(
      "/auth/register",
      payload
    );
    return data.data;
  },

  getMe: async () => {
    const { data } = await api.get<ApiResponse<User>>("/auth/me");
    return data.data;
  },
};


// // lib/api/auth.ts


// import api from "./axios";
// import { ApiResponse, AuthResponse, UserRole } from "@/types";

// export interface LoginPayload {
//   email: string;
//   password: string;
// }

// export interface RegisterPayload {
//   fullName: string;
//   email: string;
//   password: string;
//   phone: string;
//   role: UserRole;
// }

// export const authApi = {
//   login: async (payload: LoginPayload) => {
//     const { data } = await api.post<ApiResponse<AuthResponse>>(
//       "/auth/login",
//       payload
//     );
//     return data.data;
//   },

//   register: async (payload: RegisterPayload) => {
//     const { data } = await api.post<ApiResponse<AuthResponse>>(
//       "/auth/register",
//       payload
//     );
//     return data.data;
//   },

//   getMe: async () => {
//     const { data } = await api.get<ApiResponse<any>>("/auth/me");
//     return data.data;
//   },
// };