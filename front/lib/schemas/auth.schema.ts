import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Minimum 8 caractères')
  .regex(/[0-9]/, 'Doit contenir au moins un chiffre')
  .regex(/[a-z]/, 'Doit contenir au moins une minuscule')
  .regex(/[A-Z]/, 'Doit contenir au moins une majuscule')
  .regex(/[^a-zA-Z0-9]/, 'Doit contenir au moins un caractère spécial');

export const RegisterSchema = z.object({
  email: z.string().min(1, "L'email est requis").email(),
  username: z.string().min(3, 'Minimum de 3 caractères').max(30, 'Maximum 30 caractères'),
  password: passwordSchema,
});

export const LoginSchema = z.object({
  email: z.string().min(1, "L'email est requis").email('Email invalide'),
  password: z.string().min(1, 'Le mot de passe est requis'),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;
