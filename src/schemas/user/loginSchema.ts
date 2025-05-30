import { z } from "zod"

export const loginUserSchema = z
  .object({
    email: z.string().email("E-mail inválido").trim(),
    senha: z
      .string()
      .trim()
      .min(8, "A senha precisa ter no mínimo 8 caracteres")
      .trim(),
  })
  .strict()
