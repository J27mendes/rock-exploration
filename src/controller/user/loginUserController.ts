import { LoginUserUseCase } from "@/useCases/user/loginUseCase"
import { loginUserSchema } from "@/schemas/user/loginSchema"
import { z, ZodError } from "zod"
import { badRequest, serverError, unauthorized } from "@/helpers/httpResponse"
import { UnauthorizedError } from "@/errors/unauthorizedError"
import { TokensGenerator } from "@/adapters/tokensGeneratorAdapter"
import { NextResponse } from "next/server"

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

      return serverError(error)
    }
  }
}
