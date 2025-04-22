import jwt from "jsonwebtoken"
import { env } from "@/lib/envs"

export class TokensGenerator {
  execute(userId: string) {
    const accessToken = jwt.sign({ userId }, env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: "20m",
    })

    const refreshToken = jwt.sign({ userId }, env.JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: "15d",
    })

    return { accessToken, refreshToken }
  }
}
