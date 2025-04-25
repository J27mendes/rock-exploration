import { DeleteUserRepository } from "@/repositories/user/deleteRepository"

export class DeleteUserUseCase {
  private deleteUserRepository = new DeleteUserRepository()

  async execute(userId: string) {
    const deletedUser = await this.deleteUserRepository.delete(userId)
    return deletedUser
  }
}
