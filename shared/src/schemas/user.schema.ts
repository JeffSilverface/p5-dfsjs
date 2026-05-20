import { z } from 'zod'

export const RegisterSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(30),
  password: z.string().min(8),
})

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const UpdateProfileSchema = z.object({
  username: z.string().min(3).max(30).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
})

export type RegisterDto = z.infer<typeof RegisterSchema>
export type LoginDto = z.infer<typeof LoginSchema>
export type UpdateProfileDto = z.infer<typeof UpdateProfileSchema>
