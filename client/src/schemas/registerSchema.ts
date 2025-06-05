import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z
              .string()
              .min(8, 'Password must be at least 8 characters')
              .regex(/[A-Z]/,"Password must include at least one uppercase letter")
              .regex(/[a-z]/,"Passowrd must include at least one lowercase letter")
              .regex(/[0-9]/,"Passowrd must include at least one number")
              .regex(/[^A-Za-z0-9]/,"Password must include at least one special character"),
  confirmPassword: z.string().min(6, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;
