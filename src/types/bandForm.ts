import { CreateBandFormDTO } from "@/interfaces"
import { updateBandFormSchema } from "@/schemas"
import { z } from "zod"

export type UpdateBandFormDTO = z.infer<typeof updateBandFormSchema>

export type Music = CreateBandFormDTO["setList"][number]

export type Imagem = NonNullable<
  z.infer<typeof updateBandFormSchema.shape.imagem>
>
