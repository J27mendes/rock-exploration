import { useMutation } from "@tanstack/react-query"

import { showError, showSuccess } from "@/lib/toast"
import { CreateUserInput } from "@/types"

import { UserService } from "../services/user"

export const mutationSignupKey = ["signup"]

export const useSignup = (onSuccessCallback?: () => void) => {
  return useMutation<unknown, Error, CreateUserInput>({
    mutationKey: mutationSignupKey,
    mutationFn: async (variables: CreateUserInput) => {
      const response = await UserService.signup(variables)
      return response
    },
    onSuccess: () => {
      showSuccess("Usuário criado com sucesso!")
      if (onSuccessCallback) onSuccessCallback()
    },
    onError: (error: any) => {
      console.error("Erro ao criar usuário:", error)
      if (error.response?.status === 409) {
        showError("Este e-mail já está em uso.")
      } else {
        showError("Falha ao criar usuário.")
      }
    },
  })
}
