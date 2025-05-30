import { Control, useController } from "react-hook-form"

import { CreateBandFormInputFrontend } from "@/types"

export const useImagemFields = (
  control: Control<CreateBandFormInputFrontend>,
) => {
  const { field: urlImagemBandaField } = useController({
    name: "imagem.urlImagemBanda",
    control,
  })

  const { field: urlImagemLogoField } = useController({
    name: "imagem.urlImagemLogo",
    control,
  })

  const { field: urlMapaPalcoField } = useController({
    name: "imagem.urlMapaPalco",
    control,
  })

  return {
    urlImagemBandaField,
    urlImagemLogoField,
    urlMapaPalcoField,
  }
}
