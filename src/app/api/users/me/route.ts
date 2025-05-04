import { ZodError } from "zod"

import { DeleteUserController } from "@/controller"
import { UpdateUserController } from "@/controller"
import { handleZodError, ok, responses, serverError } from "@/helpers"
import { authorization } from "@/middleware"
import { updateUserSchema } from "@/schemas"

export async function PATCH(req: Request) {
  try {
    const userId = authorization(req)
    if (userId instanceof Response) return userId

    const body = await req.json()

    const validationResult = await updateUserSchema.parseAsync(body)

    const controller = new UpdateUserController()
    const response = await controller.execute(validationResult, userId)

    if (response instanceof Response) {
      return responses(response)
    }

    return ok(response)
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError(error)
    }

    return serverError(error)
  }
}

export async function DELETE(req: Request) {
  try {
    const userId = authorization(req)
    if (userId instanceof Response) return userId

    const { confirmMessage } = await req.json()

    const controller = new DeleteUserController()
    const response = await controller.execute(userId, confirmMessage)

    if (response instanceof Response) {
      return response
    }

    return ok(response)
  } catch (error) {
    return serverError(error)
  }
}
