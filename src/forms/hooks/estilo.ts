import { useController, useFormContext } from "react-hook-form"

import { CreateBandFormInput } from "@/types"

export const useEstiloField = () => {
  const { control } = useFormContext<CreateBandFormInput>()

  const { field, fieldState } = useController({
    control,
    name: "estilo",
  })

  return { field, fieldState }
}
