import { NextRequest } from "next/server"
import { ZodError } from "zod"

import { PostUserController } from "@/controller"
import { created, handleZodError, serverError } from "@/helpers"
import { createUserSchema } from "@/schemas"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validatedData = await createUserSchema.parseAsync(body)
    const controller = new PostUserController()
    const response = await controller.execute(validatedData)

    if (response instanceof Response) {
      return response
    }

    return created(response)
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError(error)
    }

    return serverError(error)
  }
}
