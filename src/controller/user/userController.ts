import { PostUserUseCase } from "@/useCases/user/userUseCases"
import { createUserSchema } from "@/schemas/user/userSchema"
import { z, ZodError } from "zod"
import { badRequest, serverError } from "@/helpers/httpResponse"

export type CreateUserInput = z.infer<typeof createUserSchema>

export class PostUserController {
  private useCase: PostUserUseCase

  constructor() {
    this.useCase = new PostUserUseCase()
  }

  async execute(body: CreateUserInput) {
    try {
      const { banda, email, senha } = body
      const { user, accessToken, refreshToken } = await this.useCase.execute({
        banda,
        email,
        senha,
      })
      return {
        message: "Usuário criado com sucesso",
        user: {
          id: user.id,
          email: user.email,
          banda: user.banda,
        },
        tokens: {
          accessToken,
          refreshToken,
        },
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(error.errors)
      }

      return serverError(error)
    }
  }
}
