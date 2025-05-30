import { useController, useFormContext } from "react-hook-form"

import { CreateBandFormInputFrontend } from "@/types"

export const useEstiloField = () => {
  const { control } = useFormContext<CreateBandFormInputFrontend>()

  const { field, fieldState } = useController({
    control,
    name: "estilo",
  })

  return { field, fieldState }
}
