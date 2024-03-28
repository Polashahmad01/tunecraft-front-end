import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Must be a valid email."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
});

export const forgotPasswordFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Must be a valid email.")
});

const passwordSchema = z.string().min(6, "Password must be at least 6 characters.");
export const resetPasswordFormSchema = z.object({
  password: passwordSchema,
  confirmPassword: passwordSchema
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
})
