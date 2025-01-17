import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const socialloginSchema = z.object({
  email: z.string().email(),
  provider: z.string(),
  providerId: z.string(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  username: z.string().min(1),
});

export const socialSignupSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  provider: z.string(),
  providerId: z.string(),
});
