import { NextResponse } from "next/server"
import { ZodError } from "zod"

import { TokensGenerator } from "@/adapters"
import { badRequest, serverError } from "@/helpers"
import { updateUserSchema } from "@/schemas"
import { SuccessUpdate, UpdateUserDTO } from "@/types/user"
import { UpdateUserUseCase } from "@/useCases"
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
