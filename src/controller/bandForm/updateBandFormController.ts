import { NextResponse } from "next/server"
import { ZodError } from "zod"

import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
  UserNotFoundError,
} from "@/errors"
import { badRequest, serverError } from "@/helpers"
import { updateBandFormSchema } from "@/schemas"
import { UpdateBandFormDTO } from "@/types"
import { UpdateBandFormUseCase } from "@/useCases"

export class UpdateBandFormController {
  private useCase = new UpdateBandFormUseCase()

  async execute(
    body: UpdateBandFormDTO,
    id: string,
  ): Promise<Response | object> {
    try {
      const validatedData = updateBandFormSchema.parse(body)

      const form = await this.useCase.execute(validatedData, id)

      return {
        message: "Formulário da banda atualizado com sucesso.",
        form,
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(error.errors)
      }

      if (
        error instanceof BadRequestError ||
        error instanceof ConflictError ||
        error instanceof UserNotFoundError ||
        error instanceof UnauthorizedError
      ) {
        console.log("Erro capturado no controller:", error.message)
        return new NextResponse(JSON.stringify({ message: error.message }), {
          status: error.statusCode,
        })
      }
      return serverError(error)
    }
  }
}
