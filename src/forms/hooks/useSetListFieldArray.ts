import { Control, useFieldArray } from "react-hook-form"

import { CreateBandFormInputFrontend } from "@/types"

export const useSetListFieldArray = (
  control: Control<CreateBandFormInputFrontend>,
) => {
  return useFieldArray({
    control,
    name: "setList",
  })
}
