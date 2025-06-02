"use client"

import { useMutation } from "@tanstack/react-query"

import { showError, showSuccess } from "@/lib/toast"

import { BandService } from "../services/bandService"

export const useCreateBand = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: BandService.create,
    onSuccess: () => {
      showSuccess("Cadastro de formulário da banda realizado com sucesso!")
      onSuccess?.()
    },
    onError: (error: any) => {
      console.error("Erro ao cadastrar banda:", error)
      showError("Erro ao cadastrar da banda. Tente novamente.")
    },
  })
}
