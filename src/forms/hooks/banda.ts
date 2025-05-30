import { useController, useFormContext } from "react-hook-form"

import { CreateBandFormInputFrontend } from "@/types"

export const useBandaField = () => {
  const { control } = useFormContext<CreateBandFormInputFrontend>()

  const { field, fieldState } = useController({
    control,
    name: "banda",
  })

  return { field, fieldState }
}
