import { PostgresFindAllBandsRepository } from "@/repositories"

export class GetAllBandsUseCase {
  private findAllBandsRepository: PostgresFindAllBandsRepository

  constructor() {
    this.findAllBandsRepository = new PostgresFindAllBandsRepository()
  }

  async execute() {
    const bands = await this.findAllBandsRepository.execute()
    return bands
  }
}
