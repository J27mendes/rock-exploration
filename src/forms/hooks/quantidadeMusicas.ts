import { useController, useFormContext } from "react-hook-form"

import { CreateBandFormInputFrontend } from "@/types"

export const useQuantidadeMusicasField = () => {
  const { control } = useFormContext<CreateBandFormInputFrontend>()

  const { field, fieldState } = useController({
    name: "quantidadeMusicas",
    control,
  })

  return { field, fieldState, control }
}
