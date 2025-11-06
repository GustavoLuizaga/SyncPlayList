import { z } from 'zod';

const emailSchema = z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Formato de email inválido');
const usernameSchema = z.string().min(2, 'El username debe tener al menos 2 caracteres').max(100, 'El username no puede tener más de 100 caracteres');
const passwordSchema = z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').max(100, 'La contraseña no puede tener más de 100 caracteres');

export const signupSchema = z.object({
  email: emailSchema,
  username: usernameSchema,
  password: passwordSchema,
});

export type SignupInput = z.infer<typeof signupSchema>;
