import { NextResponse } from "next/server"
import { ZodError } from "zod"

import { TokensGenerator } from "@/adapters"
import { UnauthorizedError, UserNotFoundError } from "@/errors"
import { handleZodError, notFound, serverError, unauthorized } from "@/helpers"
import { loginUserSchema } from "@/schemas"
import { LoginUserDTO, SuccessLogin } from "@/types/user"
import { LoginUserUseCase } from "@/useCases"
export class LoginUserController {
  private useCase = new LoginUserUseCase()
  private tokensGenerator = new TokensGenerator()

  async execute(body: LoginUserDTO): Promise<Response | object> {
    try {
      const validated = loginUserSchema.parse(body)
      const result = await this.useCase.execute(validated)

      if (result instanceof NextResponse) {
        return result
      }

      const user = result as SuccessLogin
      const tokens = this.tokensGenerator.execute(user.id)

      return {
        message: "Login realizado com sucesso",
        user,
        tokens,
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return handleZodError(error)
      }

      if (error instanceof UnauthorizedError) {
        return unauthorized(error.message)
      }

      if (error instanceof UserNotFoundError) {
        return notFound(error.message)
      }

      return serverError(error)
    }
  }
}
