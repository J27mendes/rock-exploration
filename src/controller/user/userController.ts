import { NextResponse } from "next/server"
import { ZodError } from "zod"

import { TokensGenerator } from "@/adapters/tokensGeneratorAdapter"
import { ConflictError } from "@/errors"
import {
  badRequest,
  conflict,
  created,
  serverError,
} from "@/helpers/httpResponse"
import { CreateUserInput } from "@/types/user"
import { PostUserUseCase } from "@/useCases/user/userUseCase"
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

      if (error instanceof ConflictError) {
        return conflict(error.message)
      }

      return serverError(error)
    }
  }
}
