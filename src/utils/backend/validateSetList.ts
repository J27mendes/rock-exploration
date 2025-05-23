import { BadRequestError } from "@/errors"
import { Music } from "@/types"

import { calculateTotalMusicTime } from "./calculateTotalMusicTime"

export function validateAndCalculateSetList(setList: Music[]): number {
  const totalTime = calculateTotalMusicTime(setList)
  if (totalTime < 2400 || totalTime > 3600) {
    throw new BadRequestError(
      "O total do tempo das músicas deve estar entre 2400 e 3600 segundos.",
    )
  }
  return totalTime
}
