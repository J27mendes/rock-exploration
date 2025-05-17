import { UpdateUserInput } from "@/interfaces"
import { protectedApi, publicApi } from "@/lib/axios"
import { CreateUserInput, LoginUserDTO } from "@/types"

export const UserService = {
  signup: async (input: CreateUserInput) => {
    const response = await publicApi.post("/users/signup", {
      banda: input.banda,
      email: input.email,
      senha: input.senha,
      confirmeSenha: input.confirmeSenha,
    })
    const { data } = response.data
    return data
  },

  login: async (input: LoginUserDTO) => {
    const response = await publicApi.post("/users/login", {
      email: input.email,
      senha: input.senha,
    })
    const { data } = response.data
    return data
  },

  me: async () => {
    const response = await protectedApi.get("/users/me")
    const { data } = response.data
    return data
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
