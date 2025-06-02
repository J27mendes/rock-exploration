"use client"

import { protectedApi } from "@/lib/axios"
import { CreateBandFormInputFrontend } from "@/types"

export const BandService = {
  create: async (input: CreateBandFormInputFrontend) => {
    const formData = new FormData()

    formData.append("banda", input.banda)
    formData.append("estilo", input.estilo)
    formData.append("release", input.release)
    formData.append("quantidadeMusicas", String(input.quantidadeMusicas))
    formData.append(
      "quantidadeIntegrantes",
      String(input.quantidadeIntegrantes),
    )

    formData.append("integrantes", JSON.stringify(input.integrantes))
    formData.append("setList", JSON.stringify(input.setList))
    formData.append("contato", JSON.stringify(input.contato))

    formData.append("urlImagemBanda", input.imagem.urlImagemBanda)
    formData.append("urlImagemLogo", input.imagem.urlImagemLogo)
    formData.append("urlMapaPalco", input.imagem.urlMapaPalco)

    const response = await protectedApi.post("/users/bandform", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data
  },
}
