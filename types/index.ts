
export type UserRole = "PATIENT" | "DRIVER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  avatar?: string | null;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: unknown[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export type EmergencyStatus =
  | "PENDING"
  | "ASSIGNED"
  | "ACCEPTED"
  | "EN_ROUTE"
  | "ARRIVED"
  | "PATIENT_PICKED_UP"
  | "AT_HOSPITAL"
  | "COMPLETED"
  | "CANCELLED";

export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface EmergencyRequest {
  id: string;
  patientId: string;
  driverId?: string | null;
  emergencyType: string;
  severity: Severity;
  status: EmergencyStatus;
  patientLat: number;
  patientLng: number;
  patientAddress?: string;
  description?: string;
  estimatedDistance?: number;
  estimatedTime?: number;
  estimatedCost?: number;
  createdAt: string;
  updatedAt: string;
}