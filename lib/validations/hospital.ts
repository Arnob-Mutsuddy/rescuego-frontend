// lib/validations/hospital.ts
import { z } from "zod";

export const hospitalSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(5, "Phone number is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  address: z.string().min(3, "Address is required"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  capacity: z.coerce.number().min(1, "Capacity must be at least 1"),
  operatingHours: z.string().optional(),
});

export type HospitalFormValues = z.infer<typeof hospitalSchema>;