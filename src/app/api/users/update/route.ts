import { UpdateUserController } from "@/controller/user/updateController"
import {
  handleZodError,
  ok,
  responses,
  serverError,
} from "@/helpers/httpResponse"
import { authorization } from "@/middleware/authMiddleware"
import { updateUserSchema } from "@/schemas/user/updateSchema"
import { ZodError } from "zod"

export async function PATCH(req: Request) {
  try {
    const userId = authorization(req)
    if (userId instanceof Response) return userId

    const body = await req.json()

    const validationResult = await updateUserSchema.parseAsync(body)

    const controller = new UpdateUserController()
    const result = await controller.execute(validationResult, userId)

    if (result instanceof Response) {
      return responses(result)
    }

    return ok(result)
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError(error)
    }

    return serverError(error)
  }
}
