"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { STORAGE_TOKEN_ACCESS } from "@/constants/localStorage"
import { showError, showSuccess } from "@/lib/toast"
import type { LoginUserDTO, UserWithTokens } from "@/types"
import { CreateUserInput } from "@/types"

import { UserService } from "../services/user"

export const mutationSignupKey = ["signup"]

export const useSignup = (onSuccess?: (userSignup: UserWithTokens) => void) => {
  const router = useRouter()
  return useMutation<UserWithTokens, Error, CreateUserInput>({
    mutationKey: mutationSignupKey,
    mutationFn: async (variables: CreateUserInput) => {
      return await UserService.signup(variables)
    },
    onSuccess: (userSignup) => {
      onSuccess?.(userSignup)
      showSuccess("Conta criada com sucesso!")
      router.push("/band")
    },
    onError: (error: any) => {
      const status = error?.response?.status
      const errorMessage = error?.response?.data?.error
      if (status === 409) {
        if (errorMessage === "Este email já foi cadastrado") {
          return showError("Este e-mail já está em uso.")
        }
        if (errorMessage === "Esta banda já foi cadastrada") {
          return showError("Nome da banda já cadastrado")
        }
      } else {
        showError("Falha ao criar usuário.")
      }
    },
  })
}

export const mutationLoginKey = ["login"]

export const useLogin = (onSuccess?: (loginUser: UserWithTokens) => void) => {
  const router = useRouter()
  return useMutation<UserWithTokens, Error, LoginUserDTO>({
    mutationKey: mutationLoginKey,
    mutationFn: async (variables: LoginUserDTO) => {
      return await UserService.login(variables)
    },
    onSuccess: (loginUser) => {
      onSuccess?.(loginUser)
      showSuccess("Login realizado com sucesso!")
      router.push("/band")
    },
    onError: (error: any) => {
      console.error("Erro ao logar usuário:", error)

      if (error.response?.status === 401) {
        return showError("E-mail ou senha estão incorretos.")
      }

      if (error.response?.status === 404) {
        return showError("Usuário não encontrado.")
      }

      return showError("Erro inesperado ao logar.")
    },
  })
}

export const queryMeKey = ["me"]

export const useMe = () => {
  const accessToken =
    typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_TOKEN_ACCESS)
      : null

  return useQuery<UserWithTokens>({
    queryKey: queryMeKey,
    queryFn: UserService.me,
    enabled: !!accessToken,
    retry: false,
  })
}
