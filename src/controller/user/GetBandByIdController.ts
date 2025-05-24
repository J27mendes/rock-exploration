import { NextResponse } from "next/server"

import { serverError } from "@/helpers"
import { GetBandByIdUseCase } from "@/useCases"

export class GetBandByIdController {
  private useCase: GetBandByIdUseCase

  constructor() {
    this.useCase = new GetBandByIdUseCase()
  }

  async execute(id: string) {
    try {
      const band = await this.useCase.execute(id)
      if (!band) {
        return NextResponse.json(
          { message: "Banda não encontrada" },
          { status: 404 },
        )
      }
      return NextResponse.json(band, { status: 200 })
    } catch (error) {
      return serverError(error)
    }
  }
}
