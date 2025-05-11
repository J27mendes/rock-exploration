import { z } from "zod"

export const createUserSchema = z
  .object({
    banda: z
      .string()
      .trim()
      .min(1, "O nome da banda é obrigatório")
      .refine((value) => !value.startsWith(" "), {
        message: "O nome da banda não pode começar com espaço",
      }),
    email: z
      .string()
      .trim()
      .email("E-mail inválido")
      .refine(
        (email) => {
          const [local] = email.split("@")
          return local.length >= 5
        },
        {
          message: "O e-mail deve ter pelo menos 5 caracteres antes do @",
        },
      ),
    senha: z
      .string()
      .trim()
      .min(8, "A senha precisa ter pelo menos 8 caracteres")
      .regex(/[A-Z]/, "A senha precisa conter pelo menos uma letra maiúscula")
      .regex(/[0-9]/, "A senha precisa conter pelo menos um número")
      .regex(
        /[^a-zA-Z0-9]/,
        "A senha precisa conter pelo menos um caractere especial",
      ),
    confirmeSenha: z.string().trim().min(1, "Por favor, confirme sua senha"),
  })
  .strict()
  .refine((data) => data.senha === data.confirmeSenha, {
    message: "As senhas não conferem",
    path: ["confirmeSenha"],
  })

export type CreateUserDTO = z.infer<typeof createUserSchema>
