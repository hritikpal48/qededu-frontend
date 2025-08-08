// schemas/loginSchema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(64, "Password must be less than 64 characters"),
});

export const signSchema = z
  .object({
    fname: z.string().min(1, "First name is required"),

    lname: z.string().min(1, "Last name is required"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[@$!%*?&#]/, "Must contain at least one special character"),

    confirm_password: z
      .string(),

    phoneNumber: z
      .string()
      .regex(
        /^\+\d{10,15}$/,
        "Phone number must include country code and be 10 to 15 digits long"
      ),

    term_and_conditions: z
      .boolean()
      .refine((val) => val === true, {
        message: "You must accept the terms and conditions",
      }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type signupSchemaType = z.infer<typeof signSchema>;
