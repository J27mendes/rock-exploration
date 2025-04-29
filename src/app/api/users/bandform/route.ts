import { createBandFormSchema } from "@/schemas/bandForm/createBandFormSchema"
import { CreateBandFormController } from "@/controller/bandForm/bandFormController"
import { authorization } from "@/middleware/authMiddleware"
import { ok, serverError, handleZodError } from "@/helpers/httpResponse"
import { NextRequest } from "next/server"
import { ZodError } from "zod"
import { uploadImages } from "@/utils"
interface UploadFile {
  buffer: Buffer
  originalname: string
  mimetype: string
}

export async function POST(req: NextRequest) {
  try {
    const tokenValidate = authorization(req)
    if (tokenValidate instanceof Response) {
      return tokenValidate
    }

    const idBandForm = tokenValidate

    const formData = await req.formData()

    const textFields: Record<string, string> = {}
    const files: UploadFile[] = []

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        files.push({
          buffer: Buffer.from(await value.arrayBuffer()),
          originalname: value.name,
          mimetype: value.type,
        })
      } else {
        textFields[key] = value
      }
    }

    const bodyParcial = {
      ...textFields,
      quantidadeIntegrantes: Number(textFields.quantidadeIntegrantes),
      quantidadeMusicas: Number(textFields.quantidadeMusicas),
      integrantes: JSON.parse(textFields.integrantes),
      setList: JSON.parse(textFields.setList),
      contato: JSON.parse(textFields.contato),
    }

    if (files.length !== 3) {
      return new Response(
        JSON.stringify({ error: "Você precisa enviar exatamente 3 imagens." }),
        { status: 400 }
      )
    }

    const urls = await uploadImages(files, textFields.banda)

    const fullBbody = {
      ...bodyParcial,
      imagem: {
        urlImagemBanda: urls.urlImagemBanda,
        urlImagemLogo: urls.urlImagemLogo,
        urlMapaPalco: urls.urlMapaPalco,
      },
    }

    const validatedBody = await createBandFormSchema.parseAsync(fullBbody)
    const controller = new CreateBandFormController()
    const response = await controller.execute(validatedBody, idBandForm)

    if (response instanceof Response) {
      return response
    }

    return ok(response)
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError(error)
    }
    console.error("Erro:", error)
    return serverError(error)
  }
}
