// lib/validations/emergency.ts
import { z } from "zod";

export const createEmergencySchema = z.object({
  emergencyType: z.string().min(1, "Please select an emergency type"),
  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"], {
    message: "Please select severity",
  }),
  patientAddress: z.string().optional(),
  description: z.string().optional(),
});

export type CreateEmergencyFormValues = z.infer<typeof createEmergencySchema>;

export const emergencyTypes = [
  "Accident",
  "Heart Attack",
  "Stroke",
  "Burn",
  "Fracture",
  "Breathing Problem",
  "Other",
];