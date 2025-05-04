import { UserNotFoundError } from "@/errors"
import { DeleteBandFormRepository } from "@/repositories"

export class DeleteBandFormUseCase {
  async execute(idBandForm: string) {
    const repository = new DeleteBandFormRepository()

    try {
      const deletedForm = await repository.execute(idBandForm)

      return {
        message: "Formulário deletado com sucesso",
        id: deletedForm.id,
        banda: deletedForm.banda,
      }
    } catch (error) {
      console.error(error)
      throw new UserNotFoundError(
        "Formulário da banda não encontrado ou já deletado",
      )
    }
  }
}
