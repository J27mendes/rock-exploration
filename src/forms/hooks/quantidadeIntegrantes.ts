import { useController, useFormContext } from "react-hook-form"

import { CreateBandFormInputFrontend } from "@/types"

export const useQuantidadeIntegrantesField = () => {
  const { control } = useFormContext<CreateBandFormInputFrontend>()

  const { field, fieldState } = useController({
    name: "quantidadeIntegrantes",
    control,
  })

  return { field, fieldState, control }
}
