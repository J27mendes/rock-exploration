"use client"

import { AxiosError } from "axios"

import { STORAGE_TOKEN_ACCESS } from "@/constants/localStorage"
import { protectedApi, publicApi } from "@/lib/axios"
import { CreateUserInput, LoginUserDTO, UserWithTokens } from "@/types"

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

  me: async (): Promise<UserWithTokens> => {
    const token = localStorage.getItem(STORAGE_TOKEN_ACCESS)

    if (!token) {
      throw new Error("Token ausente. Usuário não autenticado.")
    }

    try {
      const response = await protectedApi.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return {
        ...response.data.user,
        tokens: {
          accessToken: token,
          refreshToken: localStorage.getItem("refreshToken") ?? "",
        },
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Erro na requisição /users/me:", error.response?.data)
      } else {
        console.error("Erro inesperado em /users/me:", error)
      }
      throw new Error("Erro ao buscar dados do usuário.")
    }
  },
}
