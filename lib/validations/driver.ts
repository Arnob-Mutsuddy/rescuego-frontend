// lib/validations/driver.ts
import { z } from "zod";

export const driverProfileSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters").optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .optional(),
  licenseNumber: z.string().min(5, "License number is too short").optional(),
  licenseExpiry: z.string().optional(),
  yearsOfExperience: z.coerce.number().min(0).optional(),
  certification: z.string().optional(),
});

export type DriverProfileFormInput =
  z.input<typeof driverProfileSchema>;

export type DriverProfileFormValues =
  z.output<typeof driverProfileSchema>;

// export type DriverProfileFormValues = z.infer<typeof driverProfileSchema>;

export const registerAmbulanceSchema = z.object({
  registrationNo: z.string().min(3, "Registration number is required"),
  ambulanceType: z.enum(["Basic", "Advanced", "Mobile ICU"], {
    message: "Please select ambulance type",
  }),
  capacity: z.coerce.number().min(1, "Capacity must be at least 1"),
  manufacturingYear: z.coerce.number().optional(),
  equipment: z.string().optional(),
});

// export type RegisterAmbulanceFormValues = z.infer<
//   typeof registerAmbulanceSchema
// >;
export type RegisterAmbulanceFormInput =
  z.input<typeof registerAmbulanceSchema>;

export type RegisterAmbulanceFormValues =
  z.output<typeof registerAmbulanceSchema>;