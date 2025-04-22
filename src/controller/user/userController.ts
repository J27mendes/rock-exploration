import { PostUserUseCase } from "@/useCases/user/userUseCases"
import { createUserSchema } from "@/schemas/user/userSchema"
import { z, ZodError } from "zod"

type CreateUserInput = z.infer<typeof createUserSchema>

export class PostUserController {
  private useCase: PostUserUseCase

  constructor() {
    this.useCase = new PostUserUseCase()
  }

  async execute(body: CreateUserInput) {
    try {
      const validatedData = await createUserSchema.parseAsync(body)
      const { banda, email, senha } = validatedData
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
        throw new Error(
          error.errors
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join("; ")
        )
      }

      throw new Error("Erro ao processar requisição")
    }
  }
}
