import { BadRequestError } from "@/errors"
import { UpdateBandFormDTO } from "@/types"

export async function updateContactField(
  validatedData: UpdateBandFormDTO,
  existingForm: UpdateBandFormDTO,
  updates: Partial<UpdateBandFormDTO>,
) {
  const contatoAtual = existingForm.contato ?? {}
  const contatoNovo = validatedData.contato ?? {}

  const contatoFinal = {
    ...contatoAtual,
    ...contatoNovo,
  }

  const requiredFields = [
    "email",
    "nomePrimeiroNumero",
    "primeiroNumero",
    "nomeSegundoNumero",
    "segundoNumero",
  ]

  // Valida se todos os campos obrigatórios estão preenchidos com valores não vazios
  const missingFields = requiredFields.filter((key) => {
    const valor = contatoFinal[key as keyof typeof contatoFinal]
    return typeof valor !== "string" || valor.trim() === ""
  })

  if (missingFields.length > 0) {
    throw new BadRequestError(
      `Campos obrigatórios ausentes ou vazios em 'contato': ${missingFields.join(", ")}`,
    )
  }

  const algumCampoMudou = requiredFields.some((key) => {
    const novo = contatoNovo[key as keyof typeof contatoNovo]?.toString().trim()
    const atual = contatoAtual[key as keyof typeof contatoAtual]
      ?.toString()
      .trim()
    return novo !== undefined && novo !== atual
  })

  if (algumCampoMudou) {
    updates.contato = contatoFinal
  }
}
