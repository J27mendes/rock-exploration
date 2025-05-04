import { z } from "zod"

import { CreateBandFormDTO } from "@/interfaces"
import { updateBandFormSchema } from "@/schemas"

export type UpdateBandFormDTO = z.infer<typeof updateBandFormSchema>

export type Music = CreateBandFormDTO["setList"][number]

export type Imagem = NonNullable<
  z.infer<typeof updateBandFormSchema.shape.imagem>
>
