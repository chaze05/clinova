import { z } from "zod";

export const clinicSchema = z.object({
  clinic_name: z.string().min(2, "Clinic name is required"),
  address: z.string().optional(),

  doctor: z
    .object({
      enabled: z.boolean(),
      name: z.string().optional(),
      email: z.string().optional(),
    })
    .optional(),

  secretary: z
    .object({
      enabled: z.boolean(),
      name: z.string().optional(),
      email: z.string().optional(),
    })
    .optional(),
});

export const bookingSchema = z.object({
  patientName: z.string().min(2, "Patient name is required"),

  patientMobile: z
    .string()
    .regex(/^09\d{9}$/, "Invalid mobile number"), // PH format

  patientEmail: z
    .string().min(1,'Email is Requures'),

  date: z
    .string()
    .min(1, "Date is required"), // or validate format below

  time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Invalid time format"), // HH:mm

  service: z.string().min(1, "Service is required"),
});


export const patientSchema = z.object({
  patientName: z.string().min(2, "Name must be at least 2 characters"),
  
  patientEmail: z.string().email("Invalid email address"),

  patientMobile: z
    .string()
    .min(7, "Phone number is too short")
    .max(15, "Phone number is too long"),

  status: z.number().min(0).max(1), // ✅ FIX
});

export type PatientInput = z.infer<typeof patientSchema>;