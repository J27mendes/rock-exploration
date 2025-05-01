import { updateBandFormSchema } from "@/schemas"
import { z } from "zod"

export type UpdateBandFormDTO = z.infer<typeof updateBandFormSchema>
