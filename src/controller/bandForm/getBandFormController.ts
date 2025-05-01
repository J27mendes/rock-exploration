import { UserNotFoundError } from "@/errors"
import { serverError } from "@/helpers"
import { GetBandFormUseCase } from "@/useCases"
import { NextResponse } from "next/server"

export class GetBandFormController {
  private useCase = new GetBandFormUseCase()

  async execute(userId: string): Promise<Response | object> {
    try {
      const bandForm = await this.useCase.execute(userId)

      return {
        message: "Formulário da banda encontrado com sucesso.",
        bandForm,
      }
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return new NextResponse(JSON.stringify({ message: error.message }), {
          status: error.statusCode,
        })
      }

      console.error("Erro no GetBandFormController:", error)
      return serverError(error)
    }
  }
}
