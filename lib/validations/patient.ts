// lib/validations/patient.ts
import { z } from "zod";

export const patientProfileSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters").optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .optional(),
  bloodGroup: z.string().optional(),
  medicalHistory: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),
});

export type PatientProfileFormValues = z.infer<typeof patientProfileSchema>;

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];