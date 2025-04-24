import { updateUserSchema } from "@/schemas/user/updateSchema"
import { z, ZodError } from "zod"
import { UpdateUserUseCase } from "@/useCases/user/updateUseCase"
import { badRequest, serverError } from "@/helpers/httpResponse"
import { TokensGenerator } from "@/adapters/tokensGeneratorAdapter"
import { NextResponse } from "next/server"

export type UpdateUserDTO = z.infer<typeof updateUserSchema>

type SuccessUpdate = {
  id: string
  email: string
  senha: string
  banda: string
}

export class UpdateUserController {
  private useCase = new UpdateUserUseCase()
  private tokensGenerator = new TokensGenerator()

  async execute(body: UpdateUserDTO, userId: string) {
    try {
      const validated = updateUserSchema.parse(body)
      const result = await this.useCase.execute({ userId, data: validated })

      if (result instanceof NextResponse) {
        return result
      }

      const user = result as SuccessUpdate
      const tokens = this.tokensGenerator.execute(user.id)

      return {
        user,
        tokens,
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(error.errors)
      }

      return serverError(error)
    }
  }
}
