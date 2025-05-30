import { z } from "zod"

import { CreateBandFormDTO } from "@/interfaces"
import { createBandFormSchema, updateBandFormSchema } from "@/schemas"
import { createBandFormSchemaFrontend } from "@/schemas/bandForm/formBandFrontend"

export type CreateTypeBandFormDTO = z.infer<typeof createBandFormSchema>

export type UpdateBandFormDTO = z.infer<typeof updateBandFormSchema>

export type Music = CreateBandFormDTO["setList"][number]

export type Imagem = NonNullable<
  z.infer<typeof updateBandFormSchema.shape.imagem>
>

export type CreateBandFormInputFrontend = z.infer<
  typeof createBandFormSchemaFrontend
>
