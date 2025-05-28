import { useController, useFormContext } from "react-hook-form"

import { CreateBandFormInput } from "@/types"

export const useBandaField = () => {
  const { control } = useFormContext<CreateBandFormInput>()

  const { field, fieldState } = useController({
    control,
    name: "banda",
  })

  return { field, fieldState }
}
