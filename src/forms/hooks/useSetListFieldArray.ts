import { Control, useFieldArray } from "react-hook-form"

import { CreateBandFormInput } from "@/types"

export const useSetListFieldArray = (control: Control<CreateBandFormInput>) => {
  return useFieldArray({
    control,
    name: "setList",
  })
}
