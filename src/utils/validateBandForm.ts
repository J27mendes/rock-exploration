import { BadRequestError } from "@/errors"

export function validateBandForm(
  quantidadeIntegrantes: number,
  integrantesLength: number,
  quantidadeMusicas: number,
  setListLength: number
) {
  if (quantidadeIntegrantes !== integrantesLength) {
    throw new BadRequestError(
      `A quantidade de integrantes (${quantidadeIntegrantes}) não corresponde ao número de integrantes enviados (${integrantesLength}).`
    )
  }

  if (quantidadeMusicas !== setListLength) {
    throw new BadRequestError(
      `A quantidade de músicas (${quantidadeMusicas}) não corresponde ao número de músicas enviados no setlist (${setListLength}).`
    )
  }
}
