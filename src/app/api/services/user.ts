import { UpdateUserInput } from "@/interfaces"
import { protectedApi, publicApi } from "@/lib/axios"
import { CreateUserInput } from "@/types"

export const UserService = {
  signup: async (input: CreateUserInput) => {
    const response = await publicApi.post("/users/signup", {
      banda: input.banda,
      email: input.email,
      senha: input.senha,
      confirmeSenha: input.confirmeSenha,
    })
    return response.data
  },

  me: async () => {
    const response = await protectedApi.get("/users/me")
    return response.data
  },

  updateMe: async (input: UpdateUserInput) => {
    const response = await protectedApi.patch("/users/me", input)
    return response.data
  },

  deleteMe: async (confirmMessage: string) => {
    const response = await protectedApi.delete("/users/me", {
      data: { confirmMessage },
    })
    return response.data
  },
}
