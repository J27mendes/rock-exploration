import { z } from "zod"

export const updateBandFormSchema = z.object({
  banda: z.string().min(1).optional(),
  estilo: z.string().min(1).optional(),
  release: z.string().min(1, "Release é obrigatório").optional(),
  imagem: z
    .object({
      urlImagemBanda: z
        .string()
        .url("URL da imagem da banda inválida")
        .optional(),
      urlImagemLogo: z.string().url("URL do logo inválida").optional(),
      urlMapaPalco: z.string().url("URL do mapa de palco inválida").optional(),
    })
    .optional(),
  quantidadeIntegrantes: z.number().int().positive().optional(),
  integrantes: z
    .array(z.object({ nome: z.string(), instrumento: z.string() }))
    .optional(),
  quantidadeMusicas: z.number().int().positive().optional(),
  setList: z
    .array(
      z.object({
        nomeMusica: z.string().min(1, "Nome da música é obrigatório"),
        tempoMusica: z.number().int().min(1, "Tempo da música é obrigatório"),
        letraMusica: z.string().min(1, "Letra da música é obrigatória"),
      })
    )
    .optional(),
  contato: z
    .object({
      email: z.string().email("Email inválido").optional(),
      nomePrimeiroNumero: z
        .string()
        .min(1, "Nome do primeiro número é obrigatório")
        .optional(),
      primeiroNumero: z
        .string()
        .min(1, "Primeiro número é obrigatório")
        .optional(),
      nomeSegundoNumero: z
        .string()
        .min(1, "Nome do segundo número é obrigatório")
        .optional(),
      segundoNumero: z
        .string()
        .min(1, "Segundo número é obrigatório")
        .optional(),
    })
    .optional(),
})
