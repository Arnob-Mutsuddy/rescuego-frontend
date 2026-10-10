
// export type UserRole = "PATIENT" | "DRIVER" | "ADMIN";

// export interface User {
//   id: string;
//   email: string;
//   fullName: string;
//   phone: string;
//   role: UserRole;
//   avatar?: string | null;
// }

// export interface AuthResponse {
//   token: string;
//   user: User;
// }

// export interface ApiResponse<T> {
//   success: boolean;
//   message: string;
//   data: T;
//   errors?: unknown[];
//   pagination?: {
//     page: number;
//     limit: number;
//     total: number;
//     pages: number;
//   };
// }

// export type EmergencyStatus =
//   | "PENDING"
//   | "ASSIGNED"
//   | "ACCEPTED"
//   | "EN_ROUTE"
//   | "ARRIVED"
//   | "PATIENT_PICKED_UP"
//   | "AT_HOSPITAL"
//   | "COMPLETED"
//   | "CANCELLED";

// export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

// export interface EmergencyRequest {
//   id: string;
//   patientId: string;
//   driverId?: string | null;
//   emergencyType: string;
//   severity: Severity;
//   status: EmergencyStatus;
//   patientLat: number;
//   patientLng: number;
//   patientAddress?: string;
//   description?: string;
//   estimatedDistance?: number;
//   estimatedTime?: number;
//   estimatedCost?: number;
//   createdAt: string;
//   updatedAt: string;
// }
// types/index.ts

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

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: unknown[];
  pagination?: Pagination;
}

export interface UserSummary {
  fullName: string;
  phone: string;
  email?: string;
}

//Enums 

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
export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
export type AmbulanceStatus = "ACTIVE" | "INACTIVE" | "MAINTENANCE";

// ============== Entities ==============

export interface Hospital {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  address: string;
  website?: string | null;
  latitude: number;
  longitude: number;
  capacity: number;
  operatingHours?: string | null;
}

export interface HospitalSummary {
  id?: string;
  name: string;
  phone?: string;
}

export interface Ambulance {
  id: string;
  driverId: string;
  registrationNo: string;
  ambulanceType: string;
  capacity: number;
  manufacturingYear?: number | null;
  status: AmbulanceStatus;
  equipment: string[];
}

export interface Driver {
  id: string;
  userId: string;
  licenseNumber: string;
  licenseExpiry: string;
  isApproved: boolean;
  isAvailable: boolean;
  dutyStartTime?: string | null;
  dutyEndTime?: string | null;
  yearsOfExperience?: number | null;
  certification?: string | null;
  user: UserSummary;
  ambulances: Ambulance[];
}

export interface Patient {
  id: string;
  userId: string;
  dateOfBirth?: string | null;
  bloodGroup?: string | null;
  medicalHistory?: string | null;
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  user: UserSummary;
}

export interface Trip {
  id: string;
  emergencyRequestId: string;
  driverId: string;
  ambulanceId: string;
  hospitalId: string;
  distance: number;
  estimatedTime: number;
  actualTime?: number | null;
  totalFare?: number | null;
  acceptedAt?: string | null;
  completedAt?: string | null;
  hospital?: HospitalSummary;
  emergencyRequest?: EmergencyRequest;
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  description?: string | null;
  createdAt: string;
  emergencyRequestId: string;
  emergencyRequest?: {
    emergencyType: string;
    severity: string;
    createdAt: string;
  };
}

export interface EmergencyRequest {
  id: string;
  patientId: string;
  driverId?: string | null;
  hospitalId?: string | null;
  emergencyType: string;
  severity: Severity;
  status: EmergencyStatus;
  patientLat: number;
  patientLng: number;
  patientAddress?: string | null;
  description?: string | null;
  estimatedDistance?: number | null;
  estimatedTime?: number | null;
  estimatedCost?: number | null;
  createdAt: string;
  updatedAt: string;
  patient?: { user: UserSummary };
  driver?: { id?: string; user: UserSummary } | null;
  hospital?: HospitalSummary | null;
  trip?: (Partial<Trip> & { id: string }) | null;
  payment?: { id: string; status: PaymentStatus } | null;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  patient?: { user: { fullName: string } };
}

export interface AuditLog {
  id: string;
  action: string;
  resource: string;
  resourceId: string;
  createdAt: string;
  user?: { fullName: string; email: string; role: UserRole };
}

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

export interface DriverStatistics {
  totalTrips: number;
  completedTrips: number;
  totalDistance: number;
  averageRating: number;
  reviewCount: number;
  isAvailable: boolean;
  isApproved: boolean;
}