import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres"),

  email: z
    .email({ message: "Formato de email inválido" }), // Valida se tem @, .com...

  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres"), 
  birth_date: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), { message: "Data de nascimento inválida" })
});
export type ICreateUserDTO = z.infer<typeof createUserSchema>;