import { z } from 'zod';

export const authSchema = z
  .object({
    username: z.string().min(3, 'Username is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  });

export type AuthSchema = z.infer<typeof authSchema>;