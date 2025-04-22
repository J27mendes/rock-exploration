import { NextRequest, NextResponse } from "next/server"
import { LoginUserController } from "@/controller/user/loginUserController"
import { validateLoginFields } from "@/utils/validateLoginFields"
import { badRequest, serverError } from "@/helpers/httpResponse"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    validateLoginFields(body)

    const controller = new LoginUserController()
    const result = await controller.execute(body)

    return NextResponse.json(result, { status: 200 })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return badRequest(error.message)
    }

    return serverError(error)
  }
}
