import { omit } from "lodash"
import { UserNotFoundError } from "@/errors"
import { GetBandFormRepository } from "@/repositories"

export class GetBandFormUseCase {
  private repository = new GetBandFormRepository()

  async execute(userId: string) {
    try {
      const bandForm = await this.repository.findByUserId(userId)

      if (!bandForm) {
        throw new UserNotFoundError("Formulário da banda não encontrado.")
      }

      const filteredData = omit(bandForm, [
        "id",
        "idBanda",
        "userId",
        "createdAt",
        "updatedAt",
      ])

      return filteredData
    } catch (error) {
      console.error("Erro no GetBandFormUseCase:", error)
      throw error
    }
  }
}
