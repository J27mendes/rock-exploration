import { NextResponse } from "next/server"
import { z, ZodError } from "zod"
import { LoginUserUseCase } from "@/useCases"
import { loginUserSchema } from "@/schemas"
import { badRequest, notFound, serverError, unauthorized } from "@/helpers"
import { UnauthorizedError, UserNotFoundError } from "@/errors"
import { TokensGenerator } from "@/adapters"

export type LoginUserDTO = z.infer<typeof loginUserSchema>

type SuccessLogin = {
  id: string
  email: string
  senha: string
  banda: string
}

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
        return badRequest(error.errors)
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
