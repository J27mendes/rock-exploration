import { UploadFile } from "@/interfaces/bandForm"
import { NextRequest } from "next/server"
import { uploadImages } from "./uploadImagem"

export async function parseBandFormRequest(request: NextRequest) {
  const formData = await request.formData()

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

  if (files.length !== 3) {
    throw new Error("Você precisa enviar exatamente 3 imagens.")
  }

  const bodyParcial = {
    ...textFields,
    quantidadeIntegrantes: Number(textFields.quantidadeIntegrantes),
    quantidadeMusicas: Number(textFields.quantidadeMusicas),
    integrantes: JSON.parse(textFields.integrantes),
    setList: JSON.parse(textFields.setList),
    contato: JSON.parse(textFields.contato),
  }

  const urls = await uploadImages(files, textFields.banda)

  return {
    ...bodyParcial,
    imagem: {
      urlImagemBanda: urls.urlImagemBanda,
      urlImagemLogo: urls.urlImagemLogo,
      urlMapaPalco: urls.urlMapaPalco,
    },
  }
}
