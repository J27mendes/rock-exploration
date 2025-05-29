import { useController, useFormContext } from "react-hook-form"

import { CreateBandFormInput } from "@/types"

export const useQuantidadeMusicasField = () => {
  const { control } = useFormContext<CreateBandFormInput>()

  const { field, fieldState } = useController({
    name: "quantidadeMusicas",
    control,
  })

  return { field, fieldState, control }
}
