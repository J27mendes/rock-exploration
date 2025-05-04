import jwt from "jsonwebtoken"

import { unauthorized } from "@/helpers/httpResponse"
import { env } from "@/lib/envs"

export function authorization(req: Request): string | Response {
  const authHeader = req.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return unauthorized("Token not provided")
  }

  const token = authHeader.replace("Bearer ", "").trim()

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_TOKEN_SECRET) as {
      userId: string
    }

    return decoded.userId
  } catch (error) {
    console.error("JWT verification failed:", error)
    return unauthorized("Invalid or expired token")
  }
}
