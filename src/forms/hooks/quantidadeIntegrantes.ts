import { useController, useFormContext } from "react-hook-form"

import { CreateBandFormInput } from "@/types"

export const useQuantidadeIntegrantesField = () => {
  const { control } = useFormContext<CreateBandFormInput>()

  const { field, fieldState } = useController({
    name: "quantidadeIntegrantes",
    control,
  })

  return { field, fieldState, control }
}
