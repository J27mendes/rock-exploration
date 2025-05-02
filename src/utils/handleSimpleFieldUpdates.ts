import { UpdateBandFormDTO } from "@/types"
import { formattedBandName } from "./formatBandName"
import { formatStyle } from "./formatStyle"

export function handleSimpleFieldUpdates<T extends keyof UpdateBandFormDTO>(
  updates: Partial<UpdateBandFormDTO>,
  field: T,
  newValue: UpdateBandFormDTO[T],
  oldValue: UpdateBandFormDTO[T]
) {
  if (newValue !== undefined && newValue !== oldValue) {
    updates[field] = newValue
  }
}

export function updateBandForm(
  validatedData: UpdateBandFormDTO,
  existingForm: UpdateBandFormDTO
) {
  const updates: Partial<UpdateBandFormDTO> = {}

  if (validatedData.banda) {
    const bandName = formattedBandName(validatedData.banda)
    if (bandName !== existingForm.banda) {
      updates.banda = bandName
    }
  }

  if (validatedData.estilo) {
    handleSimpleFieldUpdates(
      updates,
      "estilo",
      formatStyle(validatedData.estilo),
      existingForm.estilo
    )
  }

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

  return updates
}
