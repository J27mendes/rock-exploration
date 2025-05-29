import { Control, useFieldArray } from "react-hook-form"

import { CreateBandFormInput } from "@/types"

export const useIntegrantesFieldArray = (
  control: Control<CreateBandFormInput>,
) => {
  return useFieldArray({
    control,
    name: "integrantes",
  })
}
