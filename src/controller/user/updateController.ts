import { updateUserSchema } from "@/schemas/user/updateSchema"
import { z, ZodError } from "zod"
import { UpdateUserUseCase } from "@/useCases/user/updateUseCase"
import { badRequest, serverError } from "@/helpers/httpResponse"

export type UpdateUserDTO = z.infer<typeof updateUserSchema>

export class UpdateUserController {
  private useCase = new UpdateUserUseCase()

  async execute(body: UpdateUserDTO, userId: string) {
    try {
      const validated = updateUserSchema.parse(body)
      const result = await this.useCase.execute({ userId, data: validated })

      return result
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(error.errors)
      }

      return serverError(error)
    }
  }
}
