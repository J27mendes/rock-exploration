import { NextRequest, NextResponse } from "next/server"

import { unauthorized } from "@/helpers"
import { PostgresFindUserByIdRepository } from "@/repositories"
import { RefreshTokenUseCase } from "@/useCases"

export class RefreshTokenController {
  async handle(req: NextRequest) {
    if (req.method !== "POST") {
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 },
      )
    }

    const body = await req.json()
    const { refreshToken } = body

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Refresh token is required" },
        { status: 400 },
      )
    }

    try {
      const userRepository = new PostgresFindUserByIdRepository()
      const refreshTokenUseCase = new RefreshTokenUseCase(userRepository)

      const result = await refreshTokenUseCase.execute({ refreshToken })

      return NextResponse.json(result, { status: 200 })
    } catch (error) {
      if (error instanceof Error) {
        return unauthorized(error.message)
      }
      return unauthorized("Erro desconhecido")
    }
  }
}
