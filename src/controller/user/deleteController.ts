import { unauthorized } from "@/helpers"
import { DeleteUserUseCase } from "@/useCases"
export class DeleteUserController {
  private useCase = new DeleteUserUseCase()

  async execute(userId: string, confirmMessage: string) {
    if (confirmMessage !== "CONFIRMO A EXCLUSÃO DA CONTA") {
      return unauthorized(
        "Confirmação inválida. Digite exatamente: CONFIRMO A EXCLUSÃO DA CONTA",
      )
    }

    const deletedUser = await this.useCase.execute(userId)

    return {
      message: "Usuário deletado com sucesso",
      deleted: deletedUser,
    }
  }
}
