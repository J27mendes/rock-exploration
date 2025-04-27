import { z, ZodError } from "zod"
import { CreateBandFormUseCase } from "@/useCases"
import { createBandFormSchema } from "@/schemas"
import { badRequest, serverError } from "@/helpers"

export type CreateBandFormDTO = z.infer<typeof createBandFormSchema>

export class CreateBandFormController {
  private useCase = new CreateBandFormUseCase()

  async execute(body: unknown, idBanda: string): Promise<Response | object> {
    try {
      const validatedData = createBandFormSchema.parse(body)

      const form = await this.useCase.execute(validatedData, idBanda)

      return {
        message: "Formulário da banda criado com sucesso.",
        form,
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(error.errors)
      }

      console.error(error)
      return serverError(error)
    }
  }
}
