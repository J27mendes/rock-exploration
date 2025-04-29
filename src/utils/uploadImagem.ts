import { storage } from "../../firebaseConfig"
import * as path from "path"

// Função para fazer o upload de múltiplas imagens para o Firebase Storage e retornar as URLs
async function uploadImages(files: Express.Multer.File[]): Promise<{
  urlImagemBanda: string
  urlImagemLogo: string
  urlMapaPalco: string
}> {
  try {
    const imageUrls = {
      urlImagemBanda: "",
      urlImagemLogo: "",
      urlMapaPalco: "",
    }

    // Para cada arquivo de imagem, vamos fazer o upload
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const timestamp = Date.now()
      const extension = path.extname(file.originalname)
      const fileName = `images/${timestamp}-${file.originalname}`
      const fileUpload = storage.file(fileName)

      const allowedExtensions = [".jpg", ".jpeg", ".png"]
      if (!allowedExtensions.includes(extension)) {
        throw new Error("A extensão da imagem não é permitida")
      }

      // Fazendo o upload do arquivo
      await fileUpload.save(file.buffer, {
        contentType: file.mimetype,
        public: true,
      })

      // Gerando a URL pública para cada imagem
      const publicUrl = `https://storage.googleapis.com/${storage.name}/${fileName}`

      // Atribuindo as URLs de forma correspondente ao tipo de imagem
      if (i === 0) imageUrls.urlImagemBanda = publicUrl
      if (i === 1) imageUrls.urlImagemLogo = publicUrl
      if (i === 2) imageUrls.urlMapaPalco = publicUrl
    }

    return imageUrls // Retorna um objeto com as URLs
  } catch (error) {
    console.error("Erro ao fazer upload das imagens:", error)
    throw new Error("Erro ao fazer upload das imagens")
  }
}

export { uploadImages }
