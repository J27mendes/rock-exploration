import { NextResponse } from "next/server"
import { z, ZodError } from "zod"

import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
  UserNotFoundError,
} from "@/errors"
import { badRequest, serverError } from "@/helpers"
import { createBandFormSchema } from "@/schemas"
import { CreateBandFormUseCase } from "@/useCases"

export type CreateBandFormDTO = z.infer<typeof createBandFormSchema>

export class CreateBandFormController {
  private useCase = new CreateBandFormUseCase()

  async execute(
    body: CreateBandFormDTO,
    idBanda: string,
  ): Promise<Response | object> {
    try {
      const validatedData = createBandFormSchema.parse(body)

      const form = await this.useCase.execute(validatedData, idBanda)

      if (form instanceof NextResponse) {
        return form
      }

      return {
        message: "Formulário da banda criado com sucesso.",
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
        return new NextResponse(JSON.stringify({ message: error.message }), {
          status: error.statusCode,
        })
      }

      console.error(error)
      return serverError(error)
    }
  }
}
