import { LoginUserUseCase } from "@/useCases/user/loginUseCase"
import { loginUserSchema } from "@/schemas/user/loginSchema"
import { z, ZodError } from "zod"
import { badRequest, serverError } from "@/helpers/httpResponse"

export type LoginUserDTO = z.infer<typeof loginUserSchema>

export class LoginUserController {
  private useCase = new LoginUserUseCase()

  async execute(body: LoginUserDTO) {
    try {
      const validated = loginUserSchema.parse(body)
      const result = await this.useCase.execute(validated)
      return result
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(error.errors)
      }

      return serverError(error)
    }
  }
}
