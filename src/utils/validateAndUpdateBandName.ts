import { UpdateBandFormRepository } from "@/repositories"
import { UpdateBandFormDTO } from "@/types"
import { formattedBandName } from "./formatBandName"
import { BadRequestError } from "@/errors"
import { FormWithId } from "@/interfaces"

export async function validateAndUpdateBandName(
  validatedData: UpdateBandFormDTO,
  existingForm: UpdateBandFormDTO,
  repository: UpdateBandFormRepository,
  updates: Partial<UpdateBandFormDTO>
) {
  if (validatedData.banda) {
    const formWithId = existingForm as FormWithId
    const bandName = formattedBandName(validatedData.banda)
    if (bandName !== existingForm.banda) {
      const bandForm = await repository.findByBandName(bandName)
      if (bandForm && bandForm.id !== formWithId.id) {
        throw new BadRequestError("Já existe uma banda com esse nome.")
      }
      updates.banda = bandName
    }
  }
}
