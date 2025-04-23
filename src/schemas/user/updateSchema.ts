import { z } from "zod"

export const updateUserSchema = z
  .object({
    email: z.string().email("E-mail inválido").trim(),
    senha: z
      .string()
      .min(8, "A senha precisa ter no mínimo 8 caracteres")
      .trim(),
  })
  .strict()
