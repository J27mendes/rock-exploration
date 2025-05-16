import { useMutation } from "@tanstack/react-query"

import { showError, showSuccess } from "@/lib/toast"
import type { LoginUserDTO, UserWithTokens } from "@/types"
import { CreateUserInput } from "@/types"

import { UserService } from "../services/user"

export const mutationSignupKey = ["signup"]

export const useSignup = (
  onSuccessCallback?: (createdUser: UserWithTokens) => void,
) => {
  return useMutation<UserWithTokens, Error, CreateUserInput>({
    mutationKey: mutationSignupKey,
    mutationFn: async (variables: CreateUserInput) => {
      const response = await UserService.signup(variables)
      return response
    },
    onSuccess: (createdUser) => {
      showSuccess("Usuário criado com sucesso!")
      if (onSuccessCallback) onSuccessCallback(createdUser)
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

export const useLogin = (
  onSuccessCallback?: (loginUser: UserWithTokens) => void,
) => {
  return useMutation<UserWithTokens, Error, LoginUserDTO>({
    mutationKey: mutationSignupKey,
    mutationFn: async (variables: LoginUserDTO) => {
      const response = await UserService.login(variables)
      return response
    },
    onSuccess: (loginUser) => {
      showSuccess("Usuário logado com sucesso!")
      if (onSuccessCallback) onSuccessCallback(loginUser)
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
