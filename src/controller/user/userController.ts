import { PostUserUseCase } from "@/useCases/user/userUseCase"
import { createUserSchema } from "@/schemas/user/userSchema"
import { z, ZodError } from "zod"
import { badRequest, serverError, created } from "@/helpers/httpResponse"
import { TokensGenerator } from "@/adapters/tokensGeneratorAdapter"
import { NextResponse } from "next/server"

export type CreateUserInput = z.infer<typeof createUserSchema>

export class PostUserController {
  private useCase: PostUserUseCase
  private tokensGenerator: TokensGenerator

  constructor() {
    this.useCase = new PostUserUseCase()
    this.tokensGenerator = new TokensGenerator()
  }

  async execute(body: CreateUserInput) {
    try {
      const { banda, email, senha } = body
      const result = await this.useCase.execute({
        banda,
        email,
        senha,
      })

      if (result instanceof NextResponse) {
        return result
      }

      const tokens = this.tokensGenerator.execute(result.id)

      return created({
        message: "Usuário criado com sucesso",
        user: {
          id: result.id,
          email: result.email,
          banda: result.banda,
        },
        tokens,
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(error.errors)
      }

      return serverError(error)
    }
  }
}
