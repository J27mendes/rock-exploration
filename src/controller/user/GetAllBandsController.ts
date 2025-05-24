import { NextResponse } from "next/server"

import { serverError } from "@/helpers"
import { GetAllBandsUseCase } from "@/useCases"

export class GetAllBandsController {
  private useCase: GetAllBandsUseCase

  constructor() {
    this.useCase = new GetAllBandsUseCase()
  }

  async execute() {
    try {
      const bands = await this.useCase.execute()
      return NextResponse.json(bands, { status: 200 })
    } catch (error) {
      return serverError(error)
    }
  }
}
