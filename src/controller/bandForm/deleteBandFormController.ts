import { UserNotFoundError } from "@/errors"
import { notFound, serverError } from "@/helpers"
import { DeleteBandFormUseCase } from "@/useCases"

export class DeleteBandFormController {
  async execute(idBandForm: string) {
    const useCase = new DeleteBandFormUseCase()

    try {
      return await useCase.execute(idBandForm)
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return notFound(error.message)
      }

      return serverError(error)
    }
  }
}
