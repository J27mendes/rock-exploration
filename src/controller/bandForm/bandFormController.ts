import { z, ZodError } from "zod"
import { CreateBandFormUseCase } from "@/useCases"
import { createBandFormSchema } from "@/schemas"
import { badRequest, serverError } from "@/helpers"
import { NextResponse } from "next/server"
import { uploadImages } from "@/utils"
import { File } from "formdata-node"
import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
  UserNotFoundError,
} from "@/errors"

export type CreateBandFormDTO = z.infer<typeof createBandFormSchema>

// Convertendo o File do frontend para o tipo esperado pelo backend
async function convertToMulterFile(
  files: File[]
): Promise<Express.Multer.File[]> {
  // Usando Promise.all para aguardar a resolução de cada arquivo
  const multerFiles = await Promise.all(
    files.map(async (file) => ({
      fieldname: "imagens", // Nome do campo do formulário
      originalname: file.name, // Nome original do arquivo
      encoding: "7bit", // Codificação padrão
      mimetype: file.type, // Tipo MIME do arquivo
      size: file.size, // Tamanho do arquivo
      buffer: Buffer.from(await file.arrayBuffer()), // Converte o File em um Buffer
      stream: null as any, // Stream não necessário
      destination: "", // O destino do arquivo não é necessário
      filename: file.name, // Nome do arquivo
      path: "", // Caminho não necessário, pois estamos utilizando o buffer
    }))
  )

  return multerFiles
}

export class CreateBandFormController {
  private useCase = new CreateBandFormUseCase()

  async execute(
    req: Request,
    body: CreateBandFormDTO,
    idBanda: string
  ): Promise<Response | object> {
    try {
      const validatedData = createBandFormSchema.parse(body)

      // Verifica se existe um arquivo na requisição para o upload
      const formData = await req.formData() // Pega os dados do form enviado
      const files = formData.getAll("imagens") as File[] // Espera-se que o campo seja "imagens"

      if (files.length !== 3) {
        throw new BadRequestError(
          "São necessárias 3 imagens: Banda, Logo e Mapa do palco."
        )
      }

      const multerFiles = await convertToMulterFile(files)

      // Faz o upload das imagens e obtém as URLs
      const imageUrls = await uploadImages(multerFiles)

      // Adiciona as URLs das imagens ao body da requisição
      const bandFormData = {
        ...validatedData,
        imagem: imageUrls, // Atualiza as URLs das imagens no objeto
      }

      const form = await this.useCase.execute(bandFormData, idBanda)

      if (form instanceof NextResponse) {
        return form
      }

      return {
        message: "Formulário da banda criado com sucesso.",
        form,
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(error.errors)
      }

      if (error instanceof BadRequestError) {
        return new NextResponse(JSON.stringify({ message: error.message }), {
          status: error.statusCode,
        })
      }

      if (error instanceof ConflictError) {
        return new NextResponse(JSON.stringify({ message: error.message }), {
          status: error.statusCode,
        })
      }

      if (error instanceof UserNotFoundError) {
        return new NextResponse(JSON.stringify({ message: error.message }), {
          status: error.statusCode,
        })
      }

      if (error instanceof UnauthorizedError) {
        return new NextResponse(JSON.stringify({ message: error.message }), {
          status: error.statusCode,
        })
      }

      console.error(error)
      return serverError(error)
    }
  }
}
