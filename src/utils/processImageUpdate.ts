import deepEqual from "fast-deep-equal"
import { Imagem, UpdateBandFormDTO } from "@/types"
import { deleteFileGCS } from "./deleteFileGCS"
import { cleanUndefined } from "./cleanUndefined"

export async function processImageUpdate(
  validatedData: UpdateBandFormDTO,
  existingForm: UpdateBandFormDTO,
  updates: Partial<UpdateBandFormDTO>
) {
  const oldImage: Imagem = (existingForm.imagem ?? {}) as Imagem
  const newImage: Imagem = (validatedData.imagem ?? {}) as Imagem
  const endImage: Imagem = { ...oldImage }

  const imageFields: (keyof Imagem)[] = [
    "urlImagemBanda",
    "urlImagemLogo",
    "urlMapaPalco",
  ]

  for (const field of imageFields) {
    const newUrl = newImage?.[field]
    const oldUrl = oldImage?.[field]

    if (newUrl && newUrl !== oldUrl) {
      if (oldUrl) await deleteFileGCS(oldUrl)
      endImage[field] = newUrl
    }
  }

  if (!deepEqual(cleanUndefined(endImage), cleanUndefined(oldImage))) {
    updates.imagem = endImage
  }
}
