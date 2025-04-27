import { CreateBandFormDTO } from "@/useCases"

export function calculateTotalMusicTime(setList: CreateBandFormDTO["setList"]) {
  return setList.reduce((acc, curr) => acc + curr.tempoMusica, 0)
}
