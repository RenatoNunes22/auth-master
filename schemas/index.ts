import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.optional(z.enum([UserRole.USER, UserRole.ADMIN])),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
}).refine((data) => {
  if(data.password && !data.newPassword){
    return false
  }

  return true
}, {
  message: "New password is required when changing password",
  path: ["newPassword"]
}).refine((data) => {
  if(data.newPassword && !data.password){
    return false
  }

  return true
}, {
  message: "Password is required when changing password",
  path: ["password"]
})

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  code: z.optional(z.string())
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Invalid email" })
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().min(1, { message: "Name is required" }),
});
