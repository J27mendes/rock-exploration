import { LoginUserUseCase } from "@/useCases/user/loginUseCase"
import { loginUserSchema } from "@/schemas/user/loginSchema"
import { z, ZodError } from "zod"

type LoginUserDTO = z.infer<typeof loginUserSchema>

export class LoginUserController {
  private useCase = new LoginUserUseCase()

  async execute(body: LoginUserDTO) {
    try {
      const validated = loginUserSchema.parse(body)
      const result = await this.useCase.execute(validated)
      return result
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(
          error.errors
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join("; ")
        )
      }

      if (error instanceof Error) {
        throw new Error(error.message)
      }

      throw new Error("Erro ao processar login")
    }
  }
}
