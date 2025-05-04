import * as path from "path"

import { storage } from "@/googleCloudStorage"

export async function uploadImages(
  files: { buffer: Buffer; originalname: string; mimetype: string }[],
  nomeBanda: string,
): Promise<{
  urlImagemBanda: string
  urlImagemLogo: string
  urlMapaPalco: string
}> {
  try {
    if (files.length !== 3) {
      throw new Error("Você precisa enviar exatamente 3 imagens.")
    }

    const imageUrls = {
      urlImagemBanda: "",
      urlImagemLogo: "",
      urlMapaPalco: "",
    }

    const allowedExtensions = [".jpg", ".jpeg", ".png"]

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const extension = path.extname(file.originalname).toLowerCase()

      if (!allowedExtensions.includes(extension)) {
        throw new Error("A extensão da imagem não é permitida")
      }

      const tipoImagem = i === 0 ? "banda" : i === 1 ? "logo" : "mapa-palco"

      const sanitizedBandaName = nomeBanda
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "")

      const nameWithoutExt = path.basename(file.originalname, extension)
      const sanitizedOriginalName = nameWithoutExt
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "")

      const fileName = `images/${sanitizedBandaName}/${tipoImagem}-${sanitizedOriginalName}${extension}`
      const fileUpload = storage.file(fileName)

      await fileUpload.save(file.buffer, {
        contentType: file.mimetype,
        public: true,
      })

      const publicUrl = `https://storage.googleapis.com/${storage.name}/${fileName}`

      if (i === 0) imageUrls.urlImagemBanda = publicUrl
      if (i === 1) imageUrls.urlImagemLogo = publicUrl
      if (i === 2) imageUrls.urlMapaPalco = publicUrl
    }

    return imageUrls
  } catch (error) {
    console.error("Erro ao fazer upload das imagens:", error)
    throw new Error("Erro ao fazer upload das imagens")
  }
}
