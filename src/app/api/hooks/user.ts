import { useMutation } from "@tanstack/react-query"

import { CreateUserInput } from "@/types"

import { UserService } from "../services/user"

export const mutationSignupKey = ["signup"]

export const useSignup = () => {
  return useMutation({
    mutationKey: mutationSignupKey,
    mutationFn: async (variables: CreateUserInput) => {
      const response = UserService.signup(variables)
      return response
    },
  })
}
