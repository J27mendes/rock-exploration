import { Control, useFieldArray } from "react-hook-form"

import { CreateBandFormInputFrontend } from "@/types"

export const useIntegrantesFieldArray = (
  control: Control<CreateBandFormInputFrontend>,
) => {
  return useFieldArray({
    control,
    name: "integrantes",
  })
}
