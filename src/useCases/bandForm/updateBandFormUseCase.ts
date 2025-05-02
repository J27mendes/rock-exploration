import deepEqual from "fast-deep-equal"
import { updateBandFormSchema } from "@/schemas"
import { BadRequestError, UserNotFoundError } from "@/errors"
import {
  mergeJsonObject,
  formattedBandName,
  validateBandForm,
  membersName,
  convertToMinutes,
  deleteFileGCS,
  validateAndCalculateSetList,
  cleanUndefined,
} from "@/utils"
import { UpdateBandFormRepository } from "@/repositories"
import { Imagem, UpdateBandFormDTO } from "@/types"
import { handleSimpleFieldUpdates } from "@/utils/handleSimpleFieldUpdates"

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

    handleSimpleFieldUpdates(
      updates,
      "banda",
      validatedData.banda,
      existingForm.banda
    )
    handleSimpleFieldUpdates(
      updates,
      "estilo",
      validatedData.estilo,
      existingForm.estilo
    )
    handleSimpleFieldUpdates(
      updates,
      "release",
      validatedData.release,
      existingForm.release
    )
    handleSimpleFieldUpdates(
      updates,
      "quantidadeIntegrantes",
      validatedData.quantidadeIntegrantes,
      existingForm.quantidadeIntegrantes
    )
    handleSimpleFieldUpdates(
      updates,
      "quantidadeMusicas",
      validatedData.quantidadeMusicas,
      existingForm.quantidadeMusicas
    )

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

    const oldImage: Imagem = (existingForm.imagem ?? {}) as Imagem
    const newImage: Imagem = (validatedData.imagem ?? {}) as Imagem

    if (validatedData.imagem) {
      const endImage: Imagem = { ...oldImage }

      const imageFields: (keyof Imagem)[] = [
        "urlImagemBanda",
        "urlImagemLogo",
        "urlMapaPalco",
      ]

      for (const field of imageFields) {
        const newUrl = newImage?.[field]
        const oldUrl = oldImage?.[field]

        if (newUrl && newUrl !== oldUrl) {
          if (oldUrl) {
            await deleteFileGCS(oldUrl)
          }
          endImage[field] = newUrl
        }
      }
      if (!deepEqual(cleanUndefined(endImage), cleanUndefined(oldImage))) {
        updates.imagem = endImage
      }
    }
    const contatoMerge = mergeJsonObject(
      existingForm.contato,
      validatedData.contato
    )

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
