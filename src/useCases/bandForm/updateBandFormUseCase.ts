import { updateBandFormSchema } from "@/schemas"
import { BadRequestError, UserNotFoundError } from "@/errors"
import {
  membersName,
  convertToMinutes,
  handleSetListAndValidateBandForm,
  processImageUpdate,
  updateContactField,
  updateBandForm,
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

    const simpleFieldUpdates = updateBandForm(validatedData, existingFormParsed)
    Object.assign(updates, simpleFieldUpdates)

    handleSetListAndValidateBandForm(updates, validatedData, existingFormParsed)

    await processImageUpdate(validatedData, existingFormParsed, updates)

    await updateContactField(validatedData, existingFormParsed, updates)

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
