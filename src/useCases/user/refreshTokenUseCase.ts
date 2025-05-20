import jwt from "jsonwebtoken"

import {
  RefreshTokenUseCaseRequest,
  RefreshTokenUseCaseResponse,
} from "@/interfaces"
import { PostgresFindUserByIdRepository } from "@/repositories"

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET!
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET!

export class RefreshTokenUseCase {
  constructor(private userRepository: PostgresFindUserByIdRepository) {}

  async execute({
    refreshToken,
  }: RefreshTokenUseCaseRequest): Promise<RefreshTokenUseCaseResponse> {
    try {
      const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
        sub: string
      }

      const user = await this.userRepository.execute(payload.sub)
      if (!user) {
        throw new Error("User not found")
      }

      const newAccessToken = jwt.sign({ sub: user.id }, JWT_ACCESS_SECRET, {
        expiresIn: "15m",
      })

      const newRefreshToken = jwt.sign({ sub: user.id }, JWT_REFRESH_SECRET, {
        expiresIn: "7d",
      })

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      }
    } catch (error) {
      console.error(error, "erro capturado no useCase")
      throw new Error("Invalid refresh token")
    }
  }
}
