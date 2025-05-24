import { PostgresFindBandByIdRepository } from "@/repositories"

export class GetBandByIdUseCase {
  private findBandByIdRepository: PostgresFindBandByIdRepository

  constructor() {
    this.findBandByIdRepository = new PostgresFindBandByIdRepository()
  }

  async execute(id: string) {
    const band = await this.findBandByIdRepository.execute(id)
    return band
  }
}
