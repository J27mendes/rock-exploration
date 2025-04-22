import { NextRequest } from "next/server"
import { PostUserController } from "@/controller/user/userController"
import { badRequest, created, serverError } from "@/helpers/httpResponse"
import { validateSignupFields } from "@/utils/validateSignupFields"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    validateSignupFields(body)

    const controller = new PostUserController()
    const result = await controller.execute(body)

    const response = created(result)
    return response
  } catch (error: unknown) {
    if (error instanceof Error) {
      return badRequest(error.message)
    }

    return serverError(error)
  }
}
