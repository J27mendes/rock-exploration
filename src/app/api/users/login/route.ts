import { NextRequest } from "next/server"
import { LoginUserController } from "@/controller/user/loginUserController"
import { handleZodError, ok, serverError } from "@/helpers/httpResponse"
import { loginUserSchema } from "@/schemas/user/loginSchema"
import { ZodError } from "zod"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validationResult = await loginUserSchema.parseAsync(body)
    const controller = new LoginUserController()
    const result = await controller.execute(validationResult)

    return ok(result)
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError(error)
    }

    return serverError(error)
  }
}
