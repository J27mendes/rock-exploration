import { PostgresFindUserByIdRepository } from "@/repositories"

export class GetUserUseCase {
  private findUserByIdRepository: PostgresFindUserByIdRepository

  constructor() {
    this.findUserByIdRepository = new PostgresFindUserByIdRepository()
  }

  async execute(userId: string) {
    const user = await this.findUserByIdRepository.execute(userId)

    if (!user) {
      return null
    }

    return {
      id: user.id,
      banda: user.banda,
      email: user.email,
    }
  }
}
