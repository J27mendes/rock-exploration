import { CreateBandFormRepository } from "@/repositories"
import { badRequest, serverError } from "@/helpers/httpResponse"

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
  tempoApresentacao: number
}

export class CreateBandFormUseCase {
  private repository = new CreateBandFormRepository()

  async execute(data: CreateBandFormDTO, idBanda: string) {
    try {
      const existingForm = await this.repository.findByUserId(idBanda)

      if (existingForm) {
        return badRequest("Usuário já possui um formulário cadastrado.")
      }

      const existingFormByBandName = await this.repository.findByBandName(
        data.banda
      )
      if (existingFormByBandName) {
        return badRequest("Já existe uma banda com esse nome cadastrada.")
      }

      const createdForm = await this.repository.create(data, idBanda)

      const integrantes = Array.isArray(createdForm.integrantes)
        ? (
            createdForm.integrantes as { nome: string; instrumento: string }[]
          ).map((integrante) => integrante.nome)
        : []

      return {
        banda: createdForm.banda,
        integrantes,
      }
    } catch (error) {
      console.error("Erro no CreateBandFormUseCase:", error)
      return serverError(error)
    }
  }
}
