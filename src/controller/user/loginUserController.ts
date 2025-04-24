import { LoginUserUseCase } from "@/useCases/user/loginUseCase"
import { loginUserSchema } from "@/schemas/user/loginSchema"
import { z, ZodError } from "zod"
import { badRequest, serverError, unauthorized } from "@/helpers/httpResponse"
import { UnauthorizedError } from "@/errors/unauthorizedError"

export type LoginUserDTO = z.infer<typeof loginUserSchema>

export class LoginUserController {
  private useCase = new LoginUserUseCase()

  async execute(body: LoginUserDTO): Promise<Response | object> {
    try {
      const validated = loginUserSchema.parse(body)
      const result = await this.useCase.execute(validated)
      return result
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
