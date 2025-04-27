import {
  CreateBandFormRepository,
  CreateBandFormWithPresentationTimeDTO,
} from "@/repositories"
import { BadRequestError } from "@/errors"
import {
  formatStyle,
  formattedBandName,
  calculateTotalMusicTime,
  validateBandForm,
  membersName,
} from "@/utils"
export interface CreateBandFormDTO {
  banda: string
  quantidadeIntegrantes: number
  integrantes: {
    nome: string
    instrumento: string
  }[]
  estilo: string
  release: string
  imagem: {
    urlImagemBanda: string
    urlImagemLogo: string
    urlMapaPalco: string
  }
  quantidadeMusicas: number
  setList: {
    nomeMusica: string
    tempoMusica: number
    letraMusica: string
  }[]
  contato: {
    email: string
    nomePrimeiroNumero: string
    primeiroNumero: string
    nomeSegundoNumero: string
    segundoNumero: string
  }
}

export class CreateBandFormUseCase {
  private repository = new CreateBandFormRepository()

  async execute(data: CreateBandFormDTO, idBanda: string) {
    try {
      const bandName = formattedBandName(data.banda)

      const existingForm = await this.repository.findByUserId(idBanda)

      const style = formatStyle(data.estilo)

      const totalTempoMusicas = calculateTotalMusicTime(data.setList)

      if (totalTempoMusicas < 2400 || totalTempoMusicas > 3600) {
        throw new BadRequestError(
          `O total do tempo das músicas (${totalTempoMusicas} segundos) deve estar entre 2400 segundos (40 minutos) e 3600 segundos (1 hora).`
        )
      }

      if (existingForm) {
        throw new BadRequestError("Usuário já possui um formulário cadastrado.")
      }

      const existingFormByBandName =
        await this.repository.findByBandName(bandName)

      if (existingFormByBandName) {
        throw new BadRequestError(
          "Já existe uma banda com esse nome cadastrada."
        )
      }

      validateBandForm(
        data.quantidadeIntegrantes,
        data.integrantes.length,
        data.quantidadeMusicas,
        data.setList.length
      )

      const payload: CreateBandFormWithPresentationTimeDTO = {
        ...data,
        banda: bandName,
        estilo: style,
        tempoApresentacao: totalTempoMusicas,
      }

      const createdForm = await this.repository.create(payload, idBanda)

      const integrantes = membersName(
        createdForm.integrantes as { nome: string; instrumento: string }[]
      )

      return {
        banda: createdForm.banda,
        integrantes,
        tempoApresentacaoMinutos: Math.round(
          createdForm.tempoApresentacao / 60
        ),
      }
    } catch (error) {
      console.error("Erro no CreateBandFormUseCase:", error)
      throw error
    }
  }
}
