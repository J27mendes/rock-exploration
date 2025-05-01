import deepEqual from "fast-deep-equal"
import { updateBandFormSchema } from "@/schemas"
import { addIfChanged, mergeJsonObject } from "@/utils/objectUtils"
import { BadRequestError, UserNotFoundError } from "@/errors"
import {
  formatStyle,
  formattedBandName,
  validateBandForm,
  membersName,
  convertToMinutes,
} from "@/utils"
import { UpdateBandFormRepository } from "@/repositories"
import { UpdateBandFormDTO } from "@/types"
import { validateAndCalculateSetList } from "@/utils/validateSetList"

export class UpdateBandFormUseCase {
  private repository = new UpdateBandFormRepository()

  async execute(data: unknown, id: string) {
    const validatedData: UpdateBandFormDTO = updateBandFormSchema.parse(data)
    const existingForm = await this.repository.findById(id)

    if (!existingForm) {
      throw new UserNotFoundError("Formulário não encontrado.")
    }

    const updates: Partial<UpdateBandFormDTO> & { tempoApresentacao?: number } =
      {}

    // validação nome da Banda
    if (validatedData.banda) {
      const bandName = formattedBandName(validatedData.banda)
      if (bandName !== existingForm.banda) {
        const bandForm = await this.repository.findByBandName(bandName)
        if (bandForm && bandForm.id !== existingForm.id) {
          throw new BadRequestError("Já existe uma banda com esse nome.")
        }
        updates.banda = bandName
      }
    }

    if (validatedData.estilo)
      addIfChanged(
        updates,
        "estilo",
        formatStyle(validatedData.estilo),
        existingForm.estilo
      )

    if (validatedData.release)
      addIfChanged(
        updates,
        "release",
        validatedData.release,
        existingForm.release
      )

    if (validatedData.quantidadeIntegrantes !== undefined)
      addIfChanged(
        updates,
        "quantidadeIntegrantes",
        validatedData.quantidadeIntegrantes,
        existingForm.quantidadeIntegrantes
      )

    if (validatedData.quantidadeMusicas !== undefined)
      addIfChanged(
        updates,
        "quantidadeMusicas",
        validatedData.quantidadeMusicas,
        existingForm.quantidadeMusicas
      )

    if (validatedData.integrantes) {
      const integrantes = Array.isArray(validatedData.integrantes)
        ? validatedData.integrantes
        : []
      addIfChanged(
        updates,
        "integrantes",
        integrantes,
        existingForm.integrantes as { nome: string; instrumento: string }[]
      )
    }

    // SetList com validação
    if (validatedData.setList) {
      const totalTime = validateAndCalculateSetList(validatedData.setList)
      if (!deepEqual(validatedData.setList, existingForm.setList)) {
        updates.setList = validatedData.setList
        updates.tempoApresentacao = totalTime
      }
    }

    // Validação lógica entre campos
    const integrantesLength =
      validatedData.integrantes?.length ??
      (Array.isArray(existingForm.integrantes)
        ? existingForm.integrantes.length
        : 0)

    const setListLength =
      validatedData.setList?.length ??
      (Array.isArray(existingForm.setList) ? existingForm.setList.length : 0)
    const quantidadeIntegrantes =
      validatedData.quantidadeIntegrantes ?? existingForm.quantidadeIntegrantes
    const quantidadeMusicas =
      validatedData.quantidadeMusicas ?? existingForm.quantidadeMusicas

    validateBandForm(
      quantidadeIntegrantes,
      integrantesLength,
      quantidadeMusicas,
      setListLength
    )

    // Campos compostos (JSON)
    const imagemMerge = mergeJsonObject(
      existingForm.imagem,
      validatedData.imagem
    )
    const contatoMerge = mergeJsonObject(
      existingForm.contato,
      validatedData.contato
    )

    if (!deepEqual(imagemMerge, existingForm.imagem))
      updates.imagem = imagemMerge
    if (!deepEqual(contatoMerge, existingForm.contato))
      updates.contato = contatoMerge

    // Se nada mudou
    if (Object.keys(updates).length === 0) {
      throw new BadRequestError(
        "Os dados enviados são idênticos aos já salvos."
      )
    }

    const updatedForm = await this.repository.update(existingForm.id, updates)

    return {
      banda: updatedForm.banda,
      integrantes: membersName({
        integrantes: updatedForm.integrantes as {
          nome: string
          instrumento: string
        }[],
      }),
      tempoApresentacao: convertToMinutes(updatedForm.tempoApresentacao),
    }
  }
}
