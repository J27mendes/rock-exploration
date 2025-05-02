import deepEqual from "fast-deep-equal"
import { UpdateBandFormDTO } from "@/types"
import { validateAndCalculateSetList } from "./validateSetList"
import { validateBandForm } from "./validateBandForm"

export function handleSetListAndValidateBandForm(
  updates: Partial<UpdateBandFormDTO> & { tempoApresentacao?: number },
  validated: UpdateBandFormDTO,
  existing: UpdateBandFormDTO
) {
  // Atualiza setList e tempoApresentacao
  const setListChanged =
    validated.setList !== undefined &&
    !deepEqual(validated.setList, existing.setList)

  if (setListChanged) {
    updates.setList = validated.setList
    updates.tempoApresentacao = validateAndCalculateSetList(validated.setList!)
  }
  // Validação lógica entre campos relacionados
  const integrantesLength =
    validated.integrantes?.length ??
    (Array.isArray(existing.integrantes) ? existing.integrantes.length : 0)

  const quantidadeIntegrantes =
    validated.quantidadeIntegrantes ?? existing.quantidadeIntegrantes ?? 0

  const setListLength =
    validated.setList?.length ??
    (Array.isArray(existing.setList) ? existing.setList.length : 0)

  const quantidadeMusicas =
    validated.quantidadeMusicas ?? existing.quantidadeMusicas ?? 0

  validateBandForm(
    quantidadeIntegrantes,
    integrantesLength,
    quantidadeMusicas,
    setListLength
  )
}
