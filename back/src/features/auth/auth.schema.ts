import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Minimum 8 characters')
  .regex(/[0-9]/, 'Must contain at least one digit')
  .regex(/[a-z]/, 'Must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
  .regex(/[^a-zA-Z0-9]/, 'Must contain at least one special character');

export const UpdateProfileSchema = z.object({
  username: z.string().min(3, 'Minimum 3 characters').max(30, 'Maximum 30 characters').optional(),
  email: z.string().email('Invalid email').optional(),
  password: passwordSchema.optional(),
});

export type UpdateProfileDto = z.infer<typeof UpdateProfileSchema>;
