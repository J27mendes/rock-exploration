import { NextResponse } from "next/server"

import { serverError } from "@/helpers/httpResponse"
import { GetUserUseCase } from "@/useCases"

export class GetUserController {
  private useCase: GetUserUseCase

  constructor() {
    this.useCase = new GetUserUseCase()
  }

  async execute(userId: string) {
    try {
      const user = await this.useCase.execute(userId)

      if (!user) {
        return NextResponse.json(
          { message: "Usuário não encontrado" },
          { status: 404 },
        )
      }

      return {
        message: "banda encontrada com sucesso",
        banda: user.banda,
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
