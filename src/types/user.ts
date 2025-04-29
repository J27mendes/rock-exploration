import { createUserSchema, loginUserSchema, updateUserSchema } from "@/schemas"
import { z } from "zod"

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
