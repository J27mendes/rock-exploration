import { User } from "@prisma/client"
import { z } from "zod"

import { createUserSchema, loginUserSchema, updateUserSchema } from "@/schemas"

export type CreateUserInput = z.infer<typeof createUserSchema>

export type LoginUserDTO = z.infer<typeof loginUserSchema>

export type UpdateUserDTO = z.infer<typeof updateUserSchema>

export type BandRequest = {
  banda: string
  email: string
  senha: string
}

export type SuccessLogin = {
  id: string
  email: string
  senha: string
  banda: string
}

export type SuccessUpdate = {
  id: string
  email: string
  senha: string
  banda: string
}

export type LoginRequest = {
  email: string
  senha: string
}

export type CreateBandParams = {
  id: string
  banda: string
  email: string
  senha: string
}

export type JsonResponse<T> = {
  data: T
}

export type ErrorResponse = {
  error: string
}

export type UserWithTokens = User & {
  user: {
    id: string
    email: string
    banda: string
  }
  tokens: {
    accessToken: string
    refreshToken: string
  }
}
