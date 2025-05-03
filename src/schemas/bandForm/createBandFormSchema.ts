import { z } from "zod"

export const createBandFormSchema = z
  .object({
    banda: z.string().min(1, "Nome da banda é obrigatório"),
    quantidadeIntegrantes: z
      .number()
      .int()
      .positive()
      .min(1, "Quantidade de integrantes é obrigatória"),

    integrantes: z.array(
      z.object({
        nome: z.string().min(1, "Nome do integrante é obrigatório"),
        instrumento: z
          .string()
          .min(1, "Instrumento do integrante é obrigatório"),
      })
    ),

    estilo: z.string().min(1, "Estilo musical é obrigatório"),
    release: z.string().min(1, "Release é obrigatório"),

    imagem: z.object({
      urlImagemBanda: z.string().url("URL da imagem da banda inválida"),
      urlImagemLogo: z.string().url("URL do logo inválida"),
      urlMapaPalco: z.string().url("URL do mapa de palco inválida"),
    }),

    quantidadeMusicas: z
      .number()
      .int()
      .positive()
      .min(1, "Quantidade de músicas é obrigatória"),

    setList: z.array(
      z.object({
        nomeMusica: z.string().min(1, "Nome da música é obrigatório"),
        tempoMusica: z.number().int().min(1, "Tempo da música é obrigatório"),
        letraMusica: z.string().min(1, "Letra da música é obrigatória"),
      })
    ),

    contato: z.object({
      email: z.string().email("Email inválido"),
      nomePrimeiroNumero: z
        .string()
        .min(1, "Nome do primeiro número é obrigatório"),
      primeiroNumero: z.string().min(1, "Primeiro número é obrigatório"),
      nomeSegundoNumero: z
        .string()
        .min(1, "Nome do segundo número é obrigatório"),
      segundoNumero: z.string().min(1, "Segundo número é obrigatório"),
    }),
  })
  .strict()
