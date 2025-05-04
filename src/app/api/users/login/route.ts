import { NextRequest } from "next/server"
import { ZodError } from "zod"

import { LoginUserController } from "@/controller"
import { handleZodError, ok, serverError } from "@/helpers"
import { loginUserSchema } from "@/schemas"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validationResult = await loginUserSchema.parseAsync(body)
    const controller = new LoginUserController()
    const response = await controller.execute(validationResult)

    if (response instanceof Response) {
      return response
    }

    return ok(response)
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError(error)
    }

    return serverError(error)
  }
}
