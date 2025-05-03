import deepEqual from "fast-deep-equal"
import { updateBandFormSchema } from "@/schemas"
import { BadRequestError, UserNotFoundError } from "@/errors"
import {
  mergeJsonObject,
  membersName,
  convertToMinutes,
  handleSimpleFieldUpdates,
  handleSetListAndValidateBandForm,
  processImageUpdate,
} from "@/utils"
import { UpdateBandFormRepository } from "@/repositories"
import { UpdateBandFormDTO } from "@/types"
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

    const existingFormParsed: UpdateBandFormDTO = {
      ...existingForm,
      imagem: existingForm.imagem as UpdateBandFormDTO["imagem"],
      integrantes: existingForm.integrantes as UpdateBandFormDTO["integrantes"],
      setList: existingForm.setList as UpdateBandFormDTO["setList"],
      contato: existingForm.contato as UpdateBandFormDTO["contato"],
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

    handleSetListAndValidateBandForm(updates, validatedData, existingFormParsed)

    await processImageUpdate(validatedData, existingFormParsed, updates)

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
