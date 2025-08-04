// schemas/loginSchema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().min(6, "OTP must be at least 6 characters"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
