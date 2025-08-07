// schemas/loginSchema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(64, "Password must be less than 64 characters"),
});

export const signSchema = z.object({
  fname: z.string().min(1, "First name is required"),

  lname: z.string().min(1, "Last name is required"),

  email: z
    .string()
    .min(1, "Email name is required")
    .email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),
  confirm_password: z.string().min(6, "Enter Confirm Password"),
  phoneNumber: z
    .string()
    .regex(
      /^\+\d{10,15}$/,
      "Phone number must include country code and be 10 to 15 digits long"
    ),

  term_and_conditions: z.literal(true).refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type signupSchemaType = z.infer<typeof signSchema>;
