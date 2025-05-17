import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

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
      console.error("Erro ao criar usuário:", error)
      if (error.response?.status === 409) {
        const errorCode = error.response?.data?.error
        if (errorCode === "E-mail já cadastrado") {
          return showError("Este e-mail já está em uso.")
        }
        if (errorCode === "Nome da banda já cadastrado") {
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
      showSuccess("Login realizao com sucesso!")
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
