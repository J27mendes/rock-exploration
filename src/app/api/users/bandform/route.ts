import { createBandFormSchema } from "@/schemas/bandForm/createBandFormSchema"
import { CreateBandFormController } from "@/controller/bandForm/bandFormController"
import { authorization } from "@/middleware/authMiddleware"
import { ok, serverError, handleZodError } from "@/helpers/httpResponse"
import { NextRequest } from "next/server"
import { ZodError } from "zod"

export async function POST(req: NextRequest) {
  try {
    const tokenValidate = authorization(req)

    if (tokenValidate instanceof Response) {
      return tokenValidate
    }

    const idBandForm = tokenValidate
    const body = await req.json()
    const validatedBody = await createBandFormSchema.parseAsync(body)
    const controller = new CreateBandFormController()
    const response = await controller.execute(validatedBody, idBandForm)
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
